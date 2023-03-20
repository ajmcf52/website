var express = require("express");
var bcrypt = require("bcrypt");
var connection = require("../config/connection");
var generateTokens = require("../util/generateTokens");
var authConfig = require("../config/authConfig");
var dformat = require("date-fns/format");
var dateAdd = require("date-fns/add");

var router = express.Router();

const TIMESTAMP_FORMAT = "yyyy-MM-dd HH:mm:ss";

/**
this route fires when a user presses "submit" in SignupForm.js.
*/
router.post("/signup", async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const pword = req.body.pword;
    const accountType = "user";
    const fname = name.split(" ")[0];

    // TODO generate token expiration timestamp
    var expiration = dformat(
        dateAdd(new Date(), { seconds: authConfig.jwtRefreshExpiration }),
        TIMESTAMP_FORMAT
    );

    const { refreshToken, accessToken, rtSecret } = await generateTokens({
        email,
        fname,
    });
    // console.log("RT ---> ", refreshToken);

    var salt = "";
    var hash = "";
    const hashPword = async (password, saltRounds = 10) => {
        salt = await bcrypt.genSalt(saltRounds);
        return await bcrypt.hash(password, salt);
    };

    const insertToDb = async () => {
        hash = await hashPword(pword);
        var sql = `INSERT INTO USER(email, name, pword, salt, account_type) VALUES(?, ?, ?, ?, ?);
            INSERT INTO CUSTOMER (email, address, phone_no) VALUES(?, ?, ?);
            INSERT INTO TOKENS(email, refresh_token, expiration, rt_secret) VALUES(?, ?, ?, ?)`;
        await (
            await connection
        )
            .query(sql, [
                email,
                name,
                hash,
                salt,
                accountType,
                email,
                null,
                null,
                email,
                refreshToken,
                expiration,
                rtSecret,
            ])
            .then(() => {
                res.cookie("shoeDawgRefreshToken", refreshToken, {
                    maxAge: authConfig.jwtRefreshExpiration * 1000,
                    httpOnly: true,
                    sameSite: "lax",
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
