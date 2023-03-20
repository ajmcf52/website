var express = require("express");
var connection = require("../config/connection");
var confirmRefreshToken = require("../util/confirmRefreshToken");
var getCartId = require("../util/getCartId");

var router = express.Router();

router.post("/removeFromCart", async (req, res) => {
    const { sku, quantity } = req.body;

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
    var sql = (`SELECT * FROM CART_DETAILS WHERE cart_id=? AND sku=?`[results] = await (await connection).execute(sql, [cartId, sku]));
    if (results.length === 0) {
        res.status(304).send("SKU not found in cart, nothing to modify.");
        return;
    }
    const currQuantity = results[0]["quantity"]; // may need to cast string to int
    const updatedQuantity = Math.max(currQuantity - quantity, 0);
    if (updatedQuantity === 0) {
        sql = `DELETE FROM CART_DETAILS WHERE cart_id=? AND sku=?`;
        await (await connection).execute(sql, [cartId, sku]);
    } else {
        sql = `UPDATE CART_DETAILS SET quantity=? WHERE cart_id=? AND sku=?`;
        await (await connection).execute(sql, [updatedQuantity, cartId, sku]);
    }
    res.status(200).send({
        message: `Cart has been updated. New order quantity of ${sku} is ${updatedQuantity}.`,
    });
});

module.exports = router;
