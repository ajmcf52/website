var express = require("express");
var bcrypt = require("bcrypt");
var connection = require("../config/connection");
var generateTokens = require("../util/generateTokens");
var authConfig = require("../config/authConfig");

var router = express.Router();

/**
this route fires when a user presses "submit" in SignupForm.js.
*/
router.post("/signup", async (req, res) => {
    console.log("req body --> ", req.body);
    const name = req.body.name;
    const email = req.body.email;
    const pword = req.body.pword;

    const accountType = "user";
    const fname = name.split(" ")[0];
    const { refreshToken, accessToken } = generateTokens({ email, fname });

    var salt = "";
    var hash = "";
    const hashPword = async (password, saltRounds = 10) => {
        salt = await bcrypt.genSalt(saltRounds);
        return await bcrypt.hash(password, salt);
    };

    const insertToDb = async () => {
        hash = await hashPword(pword);
        var sql = `INSERT INTO USER(email, name, pword, salt, refresh_token, account_type) VALUES(?, ?, ?, ?, ?, ?);
            INSERT INTO CUSTOMER (email, address, phone_no) VALUES (?, ?, ?)`;
        await (
            await connection
        )
            .query(sql, [
                email,
                name,
                hash,
                salt,
                refreshToken,
                accountType,
                email,
                null,
                null,
            ])
            .then(() => {
                res.cookie("refreshToken", refreshToken, {
                    maxAge: authConfig.jwtRefreshExpiration * 1000,
                    httpOnly: true,
                });
                res.status(200).send({
                    message: "User table updated.",
                    accessToken,
                });
            })
            .catch((err) => {
                if (err.errno === 1062) {
                    res.status(409).send({
                        errText: "Email already in use.",
                    });
                } else {
                    console.error(err);
                    res.status(400).send({
                        errText:
                            "Something strange has occurred, please try again.",
                    });
                }
            });
    };
    await insertToDb();
});

module.exports = router;
