var express = require("express");
var bcrypt = require("bcrypt");
var connection = require("../config/connection");

var router = express.Router();

/*
TODO

investigate what gets returned when login credentials 
are supplied for an account that doesn't exist.

(Would an error be raised? 
Or would it just return an empty set?)
*/

/**
this route should fire when a user submits their credentials
at LoginForm.js
*/
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    // query the DB for user info that correlates with the provided email.
    var sql = `SELECT * FROM USER AS u WHERE u.email=?`;
    connection.query(sql, [email], (err, results, fields) => {
        if (err) {
            console.log("Error! --> ", err);
            // res.status(409).send({
            //     errText: "The provided email does not link to an account.",
            // });
        } else {
            console.log("Provided login email exists.");
        }
    });
    // getting here means the provided email exists in the DB.
    // now... our next step is verifying a password match.
    var salt = "";
    const hashPw = async (pw) => {
        return await bcrypt.hash(pw, salt);
    };
    const verifyPw = async () => {
        var hash = await hashPw(password);
        sql = `SELECT * FROM USER AS u WHERE u.email=? AND u.pword=?`;
        connection.query(sql, [email, hash], (err, results, fields) => {
            if (err) {
                console.log("Error! --> ", err);
                return false;
            } else {
                console.log("Good login!");
                return true;
            }
        });
    };
    const isGoodLogin = await verifyPw();
    // TODO do something based on whether or not we had a good login.
    if (isGoodLogin) {
        res.status(200).send({
            loginResponse: "Good Login.",
        });
    } else {
        res.status(422).send({
            loginResponse: "Invalid login credentials.",
        });
    }
});

module.exports = router;
