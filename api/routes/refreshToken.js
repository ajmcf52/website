var express = require("express");
var jwt = require("jsonwebtoken");
var dformat = require("date-fns/format");
var dateAdd = require("date-fns/add");
var differenceInDays = require("date-fns/differenceInDays");
var authConfig = require("../config/authConfig");
var connection = require("../config/connection");
var generateRTExpiry = require("../util/generateRTExpiry");
var generateAT = require("../util/generateAT");
var generateTokens = require("../util/generateTokens");
var confirmRefreshToken = require("../util/confirmRefreshToken");

var router = express.Router();

/**
In order for this route to work as intended, the user
email must either be accessible via req.body or req.cookies;
we expect a refresh token in req.cookies, but if there isn't
one there, we can use the user's email to search the DB for
an existing RT. If no existing RT can be sourced, we send back a 403.
*/
router.get("/refreshToken", async (req, res) => {
    const { accessToken } = req.body;
    try {
        jwt.verify(accessToken, authConfig.secret);
        res.status(200).send("No need to refresh; access token is good.");
        return;
    } catch (error) {}

    var email = req.cookies.shoeDawgUserEmail || req.body.email;
    var refreshToken = req.cookies.shoeDawgRefreshToken;
    if (email === undefined || refreshToken === undefined) {
        res.status(403).send({
            errText: "Email and/or RT is undefined; please log in.",
        });
        return;
    }
    console.log("\n\nCOOKIES --> ", refreshToken, email, refreshToken.length);

    const [results] = await confirmRefreshToken(email, refreshToken);
    if (results.length === 0) {
        res.status(403).send({
            errText: "No RT stored in the database; please log in.",
        });
        return;
    }

    const matchingToken = results[0]["refresh_token"];
    const tokenSecret = results[0]["rt_secret"];
    const rtExpiration = results[0]["expiration"];

    try {
        var decoded = jwt.verify(matchingToken, tokenSecret);
    } catch (error) {
        // if this pops, it's likely TokenExpiredError or JsonWebTokenError
        res.status(403).send({
            errText: `${error.name}: ${error.message}. Please log in.`,
        });
        return;
    }

    const getUserName = async (userEmail) => {
        var sql = `SELECT name FROM USER AS u WHERE u.email=?`;
        let [results] = await (await connection).execute(sql, [userEmail]);
        return Promise.resolve(results);
    };

    var nameResult = await getUserName(email);
    var fname = nameResult[0]["name"].split(" ")[0];

    let renewedAccessToken = undefined;
    let renewedRefreshToken = undefined;
    let rtSecret = undefined;

    if (differenceInDays(rtExpiration, new Date()) > 6) {
        // if we have more than a week left on the RT, keep it
        renewedAccessToken = await generateAT({ email, fname });
        var expiration = await generateRTExpiry(authConfig.jwtRefreshExpiration);
        var sql = `UPDATE TOKENS SET expiration=? WHERE email=? AND refresh_token=?`;
        await (await connection).execute(sql, [expiration, email, matchingToken]);
        
        res.cookie('shoeDawgRefreshToken', matchingToken, {
            maxAge: authConfig.jwtRefreshExpiration * 1000,
            httpOnly: true,
            sameSite: 'lax'
        })
        res.cookie('shoeDawgUserEmail', email, {
            maxAge: authConfig.jwtRefreshExpiration * 1000,
            httpOnly: true,
            sameSite: 'lax'
        })
        res.status(200).send({
            message: "AT refreshed.",
            email,
            fname,
            renewedAccessToken
        });
    }
    else {
    // if we enter here, RT has less than a week left, so we renew.
        ({ renewedAccessToken, renewedRefreshToken, rtSecret }) = await generateTokens({
        email,
        fname,
        });
        var expiration = await generateRTExpiry(authConfig.jwtRefreshExpiration);
        const updateRefreshToken = async (email, newToken, oldToken, expiry) => {
            console.log(
                "UPDATE ARGS -->> ",
                `\n\nEMAIL: ${email}`,
                `\n\nNEW TOKEN: ${newToken}`,
                `\n\nOLD TOKEN: ${oldToken}`,
                `\n\nEXPIRY: ${expiry}`,
                `\n\nRT SECRET: ${rtSecret}`
            );
            var sql = `UPDATE TOKENS SET refresh_token=?, expiration=?, rt_secret=? WHERE email=? AND refresh_token=?`;
            await (await connection).execute(sql, [newToken, expiry, rtSecret, email, oldToken]);
        };

        await updateRefreshToken(email, renewedRefreshToken, matchingToken, expiration);

        res.cookie("shoeDawgRefreshToken", renewedRefreshToken, {
            maxAge: authConfig.jwtRefreshExpiration * 1000,
            httpOnly: true,
            sameSite: "lax",
        });
        res.cookie("shoeDawgUserEmail", email, {
            maxAge: authConfig.jwtRefreshExpiration * 1000,
            httpOnly: true,
            sameSite: "lax",
        });
        res.status(200).send({
            message: "Token refreshed.",
            email,
            fname,
            renewedAccessToken,
        });
    }
});

module.exports = router;
