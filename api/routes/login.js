var express = require("express");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
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
        if (
            emailCookie !== undefined &&
            tokenCookie !== undefined &&
            emailCookie === email
        ) {
            const expiration = generateRTExpiry(
                authConfig.jwtRefreshExpiration
            );
            const sql = `UPDATE TOKENS SET expiration=? WHERE email=? AND refresh_token=?`;
            await (
                await connection
            ).execute(sql, [expiration, emailCookie, tokenCookie]);
        } else if (emailCookie !== undefined && tokenCookie !== undefined) {
            const sql = `DELETE FROM TOKENS WHERE email=? AND refresh_token=?`;
            await (await connection).execute(sql, [emailCookie, tokenCookie]);
        }

        const fname = name.split(" ")[0];
        const payload = { email: email, fname: fname };

        const { accessToken, refreshToken } = await generateTokens(payload);

        // TODO insert refreshToken into DB with user's email and an expiration.

        res.cookie("shoeDawgRefreshToken", refreshToken, {
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
