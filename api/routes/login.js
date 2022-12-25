var express = require("express");
var bcrypt = require("bcrypt");
var connection = require("../config/connection");

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
        console.log(results);
        return results;
    };
    const name = (await verifyPw())[0]["name"];
    if (name !== undefined) {
        const fname = name.split(" ")[0];
        res.status(200).send({
            loginResponse: "Good Login.",
            fname: fname,
        });
    } else {
        res.status(422).send({
            errText: "Invalid login credentials.",
        });
    }
});

module.exports = router;
