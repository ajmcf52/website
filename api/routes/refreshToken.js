var express = require("express");
var jwt = require("jsonwebtoken");
var { v4: uuidv4 } = require("uuid");
var dformat = require("date-fns/format");
var dateAdd = require("date-fns/add");
var authConfig = require("../config/authConfig");
var connection = require("../config/connection");
var generateTokens = require("../util/generateTokens");

var router = express.Router();

const TIMESTAMP_FORMAT = "yyyy-MM-dd HH:mm:ss";

/**
In order for this route to work as intended, the user
email must either be accessible via req.body or req.cookies;
we expect a refresh token in req.cookies, but if there isn't
one there, we can use the user's email to search the DB for
an existing RT. If no existing RT can be sourced, we send back a 403.
*/
router.get("/refreshToken", async (req, res) => {
    //console.log(JSON.stringify(req.cookies));

    var email = req.cookies.shoeDawgUserEmail || req.body.email;
    var refreshToken = req.cookies.shoeDawgRefreshToken;
    if (email === undefined || refreshToken === undefined) {
        res.status(403).send({ errText: "Unauthorized; please log in." });
        return;
    }

    const getRefreshTokenInfo = async (userEmail, userRefreshToken) => {
        var sql = `SELECT refresh_token FROM TOKENS as t WHERE t.email=? AND t.refresh_token=?`;
        const [results] = await (
            await connection
        ).execute(sql, [userEmail, userRefreshToken]);
        return Promise.resolve(results);
    };

    const [results] = await getRefreshTokenInfo(email, refreshToken);
    if (refreshTokenInfo.length === 0) {
        res.status(403).send({ errText: "Unauthorized; please log in." });
        return;
    }

    const matchingToken = results[0]["refresh_token"];
    try {
        var decoded = jwt.verify(matchingToken, authConfig.secret);
    } catch (error) {
        // if this pops, it's likely TokenExpiredError or JsonWebTokenError
        res.status(403).send({ errText: "Unauthorized; please log in." });
        return;
    }

    const getUserName = async (userEmail) => {
        var sql = `SELECT name FROM USER AS u WHERE u.email=?`;
        let [results] = await (await connection).execute(sql, [email]);
        return Promise.resolve(results);
    };

    var nameResult = await getUserName(email);
    var fname = nameResult[0]["name"].split(" ")[0];

    // making it here means the token has been found and verified.
    const { renewedRefreshToken, renewedAccessToken } = await generateTokens({
        email,
        fname,
    });
    var expiration = dformat(
        dateAdd(new Date(), { seconds: authConfig.jwtRefreshExpiration }),
        TIMESTAMP_FORMAT
    );
    const updateRefreshToken = async (email, newToken, oldToken, expiry) => {
        var sql = `UPDATE TOKENS SET refresh_token=?, expiration=? WHERE email=? AND refresh_token=?`;
        await (
            await connection
        ).execute(sql, [newToken, expiry, email, oldToken]);
    };

    await updateRefreshToken(
        email,
        renewedRefreshToken,
        matchingToken,
        expiration
    );

    res.cookie("shoeDawgRefreshToken", renewedRefreshToken, {
        maxAge: authConfig.jwtRefreshExpiration * 1000,
        httpOnly: true,
        sameSite: "lax",
    });
    res.status(200).send({
        message: "Token refreshed.",
        renewedAccessToken,
    });
});

module.exports = router;
