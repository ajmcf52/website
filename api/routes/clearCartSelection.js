var express = require("express");
var connection = require("../config/connection");
var confirmRefreshToken = require("../util/confirmRefreshToken");
var getCartId = require("../util/getCartId");
const verifyAccessToken = require("../util/verifyAccessToken");
var router = express.Router();

router.post("/clearCartSelection", async (req, res) => {
    var email = req.cookies.shoeDawgUserEmail || req.body.email;
    var refreshToken = req.cookies.shoeDawgRefreshToken;

    var accessToken = req.params.at;
    var sku = req.params.sku;
    var isGoodAT = await verifyAccessToken(accessToken);
    if (!isGoodAT) {
        res.status(449).send({
            errText: isGoodAT.errText,
        });
        return;
    }

    if (email === undefined || refreshToken === undefined) {
        res.status(403).send({
            errText: "Email and/or RT is undefined; please log in.",
        });
        return;
    }

    var [results] = await confirmRefreshToken(email, refreshToken);
    if (results.length === 0) {
        res.status(403).send({
            errText: "No RT stored in the database; please log in.",
        });
    }

    const cartId = await getCartId(refreshToken);
    if (cartId === null) {
        res.status(422).send({
            errText: "Supplied refresh token does not correspond to a cart!",
        });
        return;
    }

    var sql = `DELETE FROM CART_DETAILS WHERE cart_id=? AND sku=?`;
    await (await connection).execute(sql, [cartId, sku]);

    res.status(200).send("Cart selection has been cleared.");
});

module.exports = router;
