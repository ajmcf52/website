var express = require("express");
var connection = require("../config/connection");
var dayjs = require("dayjs");

var router = express.Router();

router.get("/addContext", async (req, res) => {
    var sql = `INSERT INTO CONTEXT(session_id, geolocation, ip_addr, connection_type, token_expiry)
    VALUES(?, ?, ?, ?, ?)`;

    var now = new Date();
    var cookieValue = "g!(" + dayjs(now, "HHmmssYYMMDD") + ")";
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
        }
    );
    res.send({
        sessionValue: cookieValue,
        sessionExpiry: dayjs(expiry, "YYYY-MM-DD hh:mm:ss").toString(),
    });
});

module.exports = router;
