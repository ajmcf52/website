var express = require("express");
var jwt = require("jsonwebtoken");
var authConfig = require("../config/authConfig");
var connection = require("../config/connection");
var confirmRefreshToken = require("../util/confirmRefreshToken");

var router = express.Router();

router.get("/getAllShoes", async (req, res) => {
    var email = req.cookies.shoeDawgUserEmail || req.body.email;
    var { accessToken } = req.body;

    if (accessToken === undefined) {
        res.status(412).send({
            errText: `Precondition failed: Access Token missing.`,
        });
        return;
    }

    try {
        var decoded = jwt.verify(accessToken, authConfig.secret);
    } catch (error) {
        res.status(412).send({
            errText: `${error.name}: ${error.message}; please acquire new access token.`,
        });
        return;
    }

    var sql = `SELECT * FROM STOCK`;
    var [results] = await (await connection).execute(sql);
    console.log(results);
    res.status(200).send({ shoeInfo: results });
});

module.exports = router;
