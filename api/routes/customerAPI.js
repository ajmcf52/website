var express = require("express");
var bcrypt = require("bcrypt");
var connection = require("../config/connection");
var dFormat = require("dateformat");

var router = express.Router();

/* 
The following article was tremendously helpful in setting
up salt and hashing with bcrypt:
    https://heynode.com/blog/2020-04/salt-and-hash-passwords-bcrypt/

The following article helped tremendously in rendering the code in my
'/signup' route asynchronous:
    https://attacomsian.com/blog/nodejs-password-hashing-with-bcrypt


*/

router.post("/signup", async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const pword = req.body.password;
    var salt = "";
    var hash = "";
    const hashPword = async (password, saltRounds = 10) => {
        salt = await bcrypt.genSalt(saltRounds);
        console.log("salt length -> ", salt.length);
        return await bcrypt.hash(password, salt);
    };

    const insertToDb = async () => {
        hash = await hashPword(pword);
        console.log("hash length -> ", hash.length);
        //var connection = mysql.createConnection(dbConfig);
        var sql = `INSERT INTO USER(email, name, pword, salt) VALUES(?, ?, ?, ?);
               INSERT INTO CUSTOMER (email, address, phone_no) VALUES (?, ?, ?)`;
        connection.query(
            sql,
            [email, name, hash, salt, email, undefined, undefined],
            (err) => {
                if (err) {
                    throw err;
                }
                res.send("user table updated!");
            }
        );
    };
    await insertToDb();
});

/* 
This question on SO illustrates an ideal sense of flow in the 
z   */
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

router.get("/addContext", async (req, res) => {
    var sql = `INSERT INTO CONTEXT(session_id, geolocation, ip_addr, connection_type, token_expiry)
    VALUES(?, ?, ?, ?, ?)`;

    var now = new Date();
    var cookieValue = dFormat(now, "hhmmssYYYYMMDD");
    var expiry = new Date(now);
    Date.prototype.addHours = function (numHours) {
        this.setTime(this.getTime() + numHours * 3600 * 1000);
        return this;
    };
    expiry.addHours(1);
    connection.query(
        sql,
        [cookieValue, null, null, "guest", expiry],
        (err, results, fields) => {
            if (err) {
                // TODO do something to resolve the error.
            }
            console.log(results, fields);
        }
    );
    res.body["SessionValue"] = cookieValue;
    res.body["SessionExpiry"] = dFormat(expiry, "YYYY-MM-DD hh:mm:ss");
});

module.exports = router;
