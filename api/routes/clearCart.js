var express = require("express");
var connection = require("../config/connection");
var confirmRefreshToken = require("../util/confirmRefreshToken");
var getCartId = require("../util/getCartId");
var router = express.Router();

router.post("/clearCart", async (req, res) => {
    var email = req.cookies.shoeDawgUserEmail || req.body.email;
    var refreshToken = req.cookies.shoeDawgRefreshToken;

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

    var sql = `DELETE FROM CART_DETAILS WHERE cart_id=?`;
    await (await connection).execute(sql, [cartId]);

    res.status(200).send("Cart has been cleared.");
});
