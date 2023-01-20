var express = require("express");
var bcrypt = require("bcrypt");
var authConfig = require("../config/authConfig");
var connection = require("../config/connection");
var generateTokens = require("../util/generateTokens");
var generateRTExpiry = require("../util/generateRTExpiry");

var router = express.Router();

router.post("/login", async (req, res) => {
    const { email, pword } = req.body;
    var salt = "";

    const retrieveSalt = async (email) => {
        var sql = `SELECT salt FROM USER AS u WHERE u.email=?`;
        const [results] = await (await connection).execute(sql, [email]);
        return Promise.resolve(results);
    };

    var data = await retrieveSalt(email);
    if (data.length === 0) {
        res.status(422).send({
            errText: "Email does not correspond to an active account.",
        });
    }
    salt = await data[0]["salt"];

    const hashPw = async (pw) => {
        return await bcrypt.hash(pw, salt);
    };

    const verifyPw = async () => {
        var hash = await hashPw(pword);
        sql = `SELECT name FROM USER AS u WHERE u.email=? AND u.pword=?`;
        var [results] = await (await connection).execute(sql, [email, hash]);
        return Promise.resolve(results);
    };
    const pwMatchResults = await verifyPw();

    if (pwMatchResults.length === 0) {
        res.status(422).send({ errText: "Invalid Password." });
    }
    const name = pwMatchResults[0]["name"];
    if (name !== undefined) {
        /**
           getting here signifies a successful login
           (hashed & salted password was a match in the DB)
         */
        const emailCookie = req.cookies.shoeDawgUserEmail;
        const tokenCookie = req.cookies.shoeDawgRefreshToken;
        const expiration = await generateRTExpiry(
            authConfig.jwtRefreshExpiration
        );
        let tokenUpdated = false;
        /**
            entering here when client-side cookies match the user that has just logged in.
        */
        if (
            emailCookie !== undefined &&
            tokenCookie !== undefined &&
            emailCookie === email
        ) {
            console.log("COOKIES -->", emailCookie, tokenCookie);

            let sql = `SELECT * FROM TOKENS WHERE email=? AND refresh_token=?`;
            var [result] = await (
                await connection
            ).execute(sql, [email, tokenCookie]);

            /* 
            if the token already exists in the DB, update it. Otherwise, a later SQL statement
            will handle the insert by way of checking a flag.
            */
            if (result.length !== 0) {
                sql = `UPDATE TOKENS SET expiration=? WHERE email=? AND refresh_token=?`;
                await (
                    await connection
                ).execute(sql, [expiration, emailCookie, tokenCookie]);
                tokenUpdated = true;
                console.log("Updating existing RT!");
            }
        } else if (emailCookie !== undefined && tokenCookie !== undefined) {
            const sql = `DELETE FROM TOKENS WHERE email=? AND refresh_token=?`;
            await (await connection).execute(sql, [emailCookie, tokenCookie]);
            console.log("Deleting existing RT!");
        }

        const fname = name.split(" ")[0];
        const payload = { email: email, fname: fname };
        const {
            accessToken,
            refreshToken: newRefreshToken,
            rtSecret,
        } = await generateTokens(payload);

        if (!tokenUpdated) {
            var sql = `INSERT INTO TOKENS(email, refresh_token, expiration, rt_secret) VALUES(?, ?, ?, ?)`;
            await (
                await connection
            ).execute(sql, [email, newRefreshToken, expiration, rtSecret]);

            /**
            we stash the correct refresh token. If we are inserting a refresh
            token for this user for the first time, we must overwrite the previous
            cookie with the new value.
            */
            res.cookie("shoeDawgRefreshToken", newRefreshToken, {
                maxAge: authConfig.jwtRefreshExpiration * 1000,
                httpOnly: true,
                sameSite: "lax",
            });
            console.log("Inserting new RT!");
        } else {
            // here, we are overwriting a cookie, same value, with an renewed expiry.
            res.cookie("shoeDawgRefreshToken", tokenCookie, {
                maxAge: authConfig.jwtRefreshExpiration * 1000,
                httpOnly: true,
                sameSite: "lax",
            });
        }

        res.cookie("shoeDawgUserEmail", email, {
            maxAge: authConfig.jwtRefreshExpiration * 1000,
            httpOnly: true,
            sameSite: "lax",
        });
        res.status(200).send({
            email,
            fname,
            accessToken,
        });
    } else {
        res.status(422).send({
            errText: "Invalid login credentials.",
        });
    }
});

module.exports = router;
