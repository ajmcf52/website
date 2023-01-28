var express = require("express");
var connection = require("../config/connection");
const { database } = require("../config/dbConfig");

var router = express.Router();

router.post("/addToCart", async (req, res) => {
    const { refreshToken, sku, quantity } = req.body;
    // assuming that refresh token is valid here...

    // TODO validate refresh token before adding to cart?
    var sql = `SELECT cart_id FROM SHOPPING_CART WHERE refresh_token=?`;
    const [result] = await (await connection).execute(sql, [refreshToken]);
    if (result.length === 0) {
        res.status(422).send({
            errText: "Supplied refresh token does not correspond to a cart!",
        });
    }
    var cartId = result[0]["cart_id"];
    sql = `INSERT INTO CART_DETAILS(cart_details_id, cart_id, sku, quantity) VALUES (?, ?, ?, ?)`;
    await (await connection).execute(sql, [null, cartId, sku, quantity]);
    res.status(200).send("Added to cart.");
});
