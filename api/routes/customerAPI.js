var express = require("express");
var bcrypt = require("bcrypt");
var router = express.Router();
var mysql = require("mysql2");
var dbConfig = require("../config/dbConfig");

/* 
The following article was tremendously helpful in setting
up salt and hashing with bcrypt:
    https://heynode.com/blog/2020-04/salt-and-hash-passwords-bcrypt/

The following article helped tremendously in rendering the code in my
'/signup' route asynchronous:
    https://attacomsian.com/blog/nodejs-password-hashing-with-bcrypt


*/

router.post("/signup", async (req, res) => {
  console.log("wow!!!!!");
  console.log("REQ BODY IS ", req.body);
  const name = req.body.name;
  const email = req.body.email;
  const pword = req.body.password;

  const hashPword = async (password, saltRounds = 10) => {
    const salt = await bcrypt.genSalt(saltRounds);
    console.log("PWORD -> ", password, " SALT -> ", salt);
    return await bcrypt.hash(password, salt);
  };
  var hash = "";
  const insertToDb = async () => {
    hash = await hashPword(pword);
    console.log("hash length is: " + hash.length);
    //res.json({ hash: hashPword });
    var connection = mysql.createConnection(dbConfig);
    var sql = `INSERT INTO USER(email, name, pword) VALUES(?, ?, ?);
               INSERT INTO CUSTOMER (email, address, phone_no) VALUES (?, ?, ?)`;
    connection.query(
      sql,
      [email, name, hash, email, undefined, undefined],
      (err) => {
        if (err) {
          throw err;
        }
        res.send("user table updated!");
      }
    );
    connection.end();
  };
  await insertToDb();
});

module.exports = router;
