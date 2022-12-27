var express = require("express");
var bcrypt = require("bcrypt");
var connection = require("../config/connection");

var router = express.Router();

const toUserToken = (guestToken, userInitials) => {
    return guestToken.replace("g!", userInitials);
};

const getInitials = (name) => {
    let args = name.split(" ");
    if (name.length === 0 || args.length < 2) {
        return "";
    }
    let initials = "";
    for (var i = 0; i < 2; i++) {
        initials += args[i][0];
    }
    return initials;
};

/**
this route fires when a user presses "submit" in SignupForm.js.
*/
router.post("/signup", async (req, res) => {
    console.log("req body --> ", req.body);
    const name = req.body.name;
    const email = req.body.email;
    const pword = req.body.password;
    var guestToken = req.body.tokenValue;

    var initials = getInitials(name);
    const userToken = toUserToken(guestToken, initials);
    const accountType = "user";

    var salt = "";
    var hash = "";
    const hashPword = async (password, saltRounds = 10) => {
        salt = await bcrypt.genSalt(saltRounds);
        return await bcrypt.hash(password, salt);
    };

    const insertToDb = async () => {
        hash = await hashPword(pword);
        var sql = `UPDATE CONTEXT SET session_id=? WHERE session_id=?;
            INSERT INTO USER(email, name, pword, salt, token, account_type) VALUES(?, ?, ?, ?, ?, ?);
            INSERT INTO CUSTOMER (email, address, phone_no) VALUES (?, ?, ?)`;
        var [error, results, fields] = (await connection).execute(sql, [
            userToken,
            guestToken,
            email,
            name,
            hash,
            salt,
            userToken,
            accountType,
            email,
            null,
            null,
        ]);
        if (error && error.errno === 1062) {
            // code for 'ER_DUP_ENTRY'
            res.status(409).send({
                errText: "Email already in use.",
                errcode: 1062,
            });
        } else if (error) {
            res.status(400).send({
                errText: "Something strange has occurred, please try again.",
                errcode: 1069,
            });
        } else {
            res.status(200).send("User table updated.");
        }
    };
    await insertToDb();
});

module.exports = router;
