var express = require("express");
var authConfig = require("../config/authConfig");
var connection = require("../config/connection");

var router = express.Router();

router.delete("/logout", async (req, res) => {
    const { email } = req.body;
    const emailCookie = req.cookies.showDawgUserEmail;
    const tokenCookie = req.cookies.shoeDawgRefreshToken;

    if (email === emailCookie && tokenCookie !== undefined) {
        var sql = `DELETE FROM TOKENS WHERE email=? AND refresh_token=?`;
        await (await connection).execute(sql, [email, tokenCookie]);
        /**
        here, we are "deleting" our cookies by overwriting them with blank strings,
        using an intentionally short lifetime of 5s to make them essentially disappear.
        */
        res.cookie("shoeDawgRefreshToken", "", {
            maxAge: 5,
            httpOnly: true,
            sameSite: "lax",
        });
        res.cookie("shoeDawgUserEmail", email, {
            maxAge: 5,
            httpOnly: true,
            sameSite: "lax",
        });
    }
});
