var express = require("express");
var authConfig = require("../config/authConfig");
var connection = require("../config/connection");

var router = express.Router();

router.get("/initCart", async (req, res) => {
    var isCartActive = req.cookies.isCartActive;
    if (isCartActive) {
        res.status(304).send("Cart already active.");
        return;
    }
    var refreshToken = req.cookies.shoeDawgRefreshToken;
    if (refreshToken === undefined) {
        res.status(403).send({
            errText: "RT is undefined; please log in.",
        });
        return;
    }
    const initializeCart = async () => {
        var sql = `INSERT INTO CART(cart_id, refresh_token) VALUES(?,?)`;
        await (await connection).query(sql, [null, refreshToken]);
    };
    res.cookie("isCartActive", "true", {
        maxAge: authConfig.jwtRefreshExpiration * 1000,
        httpOnly: true,
        sameSite: "lax",
    });
    res.status(200).send("Cart initialized.");
});

module.exports = router;
