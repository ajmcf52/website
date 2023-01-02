var express = require("express");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var authConfig = require("../config/authConfig");
var connection = require("../config/connection");
var { v4: uuidv4 } = require("uuid");

var router = express.Router();

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    var salt = "";

    const retrieveSalt = async (email) => {
        var sql = `SELECT salt FROM USER AS u WHERE u.email=?`;
        const [results] = await (await connection).execute(sql, [email]);
        return results;
    };
    var data = await retrieveSalt(email);
    salt = await data[0]["salt"];

    const hashPw = async (pw) => {
        return bcrypt.hash(pw, salt);
    };
    const verifyPw = async () => {
        var hash = await hashPw(password);
        sql = `SELECT name FROM USER AS u WHERE u.email=? AND u.pword=?`;
        var [results] = await (await connection).execute(sql, [email, hash]);
        return results;
    };
    const name = (await verifyPw())[0]["name"];
    if (name !== undefined) {
        const fname = name.split(" ")[0];
        const payload = { email: email, fname: fname };

        const accessToken = jwt.sign(payload, authConfig.secret, {
            expiresIn: authConfig.jwtExpiration,
        });
        const refreshToken = jwt.sign(payload, uuidv4(), {
            expiresIn: authConfig.jwtExpiration,
        });

        res.cookie("accessToken", accessToken, {
            maxAge: authConfig.jwtExpiration * 1000,
        });
        res.cookie("refreshToken", refreshToken, {
            maxAge: authConfig.jwtRefreshExpiration * 1000,
        });
        res.status(200).send({
            fname: fname,
            accessToken: accessToken,
            refreshToken: refreshToken,
        });
    } else {
        res.status(422).send({
            errText: "Invalid login credentials.",
        });
    }
});

module.exports = router;
