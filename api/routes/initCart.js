var express = require("express");
var authConfig = require("../config/authConfig");
var initializeCart = require("../util/initializeCart");

var router = express.Router();

router.get("/initCart", async (req, res) => {
    var isCartActive = req.cookies.isCartActive;
    if (isCartActive) {
        res.status(204).send("Cart already active.");
        return;
    }
    var refreshToken = req.cookies.shoeDawgRefreshToken;
    if (refreshToken === undefined) {
        res.status(403).send({
            errText: "RT is undefined; please log in.",
        });
        return;
    }
    var initExecuted = await initializeCart(refreshToken);

    res.cookie("isCartActive", "true", {
        maxAge: authConfig.jwtRefreshExpiration * 1000,
        httpOnly: true,
        sameSite: "lax",
    });
    if (!initExecuted) {
        res.status(204).send("Cart already initialized.");
        return;
    }
    res.status(201).send("Cart initialized.");
});

module.exports = router;
