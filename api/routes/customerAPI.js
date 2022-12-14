var express = require("express");
var connection = require("../config/connection");
var dformat = require("date-fns/format");

var router = express.Router();

router.get("/addContext", async (req, res) => {
    var sql = `INSERT INTO CONTEXT(session_id, geolocation, ip_addr, connection_type, token_expiry)
    VALUES(?, ?, ?, ?, ?)`;

    var now = dformat(new Date(), "HHmmssyyMMdd");
    var cookieValue = "g!(" + now + ")";
    var expiry = new Date();

    Date.prototype.addHours = function (numHours) {
        this.setTime(this.getTime() + numHours * 3600 * 1000);
        return this;
    };
    expiry.addHours(1);
    var expiryValue = dformat(expiry, "yyyy-MM-dd HH:mm:ss");
    connection.query(
        sql,
        [cookieValue, null, null, "guest", expiryValue],
        (err, results, fields) => {
            if (err && err.code === "ER_DUP_ENTRY") {
                /* BUG HERE :: See https://github.com/ajmcf52/shoedawg/issues/1 for more details. */

                console.log("Duplicate Entry in CONTEXT (known bug)");
            } else if (err) {
                console.log(err);
            } else {
                console.log("Context add successful!");
            }
        }
    );
    res.send({
        sessionValue: cookieValue,
        sessionExpiry: expiryValue,
    });
});

module.exports = router;
