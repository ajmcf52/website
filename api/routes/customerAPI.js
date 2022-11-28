var express = require("express");
var bcrypt = require("bcrypt");
// var mysql = require("mysql2");
// var dbConfig = require("../config/dbConfig");
var connection = require("../config/connection");

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

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
});

module.exports = router;
