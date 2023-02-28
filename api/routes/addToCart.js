var express = require("express");
var connection = require("../config/connection");
var confirmRefreshToken = require("../util/confirmRefreshToken");
var getCartId = require("../util/getCartId");
var router = express.Router();

router.post("/addToCart", async (req, res) => {
    const { sku, quantity } = req.body;

    var email = req.cookies.shoeDawgUserEmail || req.body.email;
    var refreshToken = req.cookies.shoeDawgRefreshToken;

    if (email === undefined || refreshToken === undefined) {
        res.status(403).send({
            errText: "Email and/or RT is undefined; please log in.",
        });
        return;
    }

    const [results] = await confirmRefreshToken(email, refreshToken);
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
    sql = `INSERT INTO CART_DETAILS(cart_details_id, cart_id, sku, quantity) VALUES (?, ?, ?, ?)`;
    await (await connection).execute(sql, [null, cartId, sku, quantity]);
    res.status(200).send("Added to cart.");
});

module.exports = router;
