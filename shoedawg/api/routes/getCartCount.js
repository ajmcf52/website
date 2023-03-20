var express = require("express");
var connection = require("../config/connection");
var confirmRefreshToken = require("../util/confirmRefreshToken");

var router = express.Router();

router.get("/getCartCount", async (req, res) => {
    var email = req.cookies.shoeDawgUserEmail || req.body;
    var refreshToken = req.cookies.shoeDawgRefreshToken;

    if (refreshToken === undefined || email === undefined) {
        res.status(403).send({ errText: "RT is undefined; please log in." });
        return;
    }

    const [results] = await confirmRefreshToken(email, refreshToken);
    if (results.length === 0) {
        res.status(403).send({
            errText: "No RT stored in the database; please log in.",
        });
    }

    var sql = `SELECT SUM(quantity) FROM CART_DETAILS 
    NATURAL JOIN CART WHERE refresh_token=?`;
    const [result] = await (await connection).execute(sql, [refreshToken]);
    let returnValue = result.length === 0 ? 0 : result[0]["quantity"];
    res.status(200).send({ cartCount: returnValue });
});

module.exports = router;
