var express = require("express");
var bcrypt = require("bcrypt");
var connection = require("../config/connection");

var router = express.Router();

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
            //TODO add error handling here
            throw err;
        }
        console.log(results, fields);
    });
    // getting here means the provided email was valid.
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
                // TODO add error handling here
                return false;
            }
            console.log(results, fields);
            return true;
        });
    };
    const isGoodLogin = await verifyPw();
    // TODO do something based on whether or not we had a good login.
});

module.exports = router;
