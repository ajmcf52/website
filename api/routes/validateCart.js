var express = require("express");
var authConfig = require("../config/authConfig");
var connection = require("../config/connection");
var cartInitUtil = require("../routes/initCart");
const confirmRefreshToken = require("../util/confirmRefreshToken");

var router = express.Router();

router.get("/validateCart", async (req, res) => {
    var email = req.cookies.shoeDawgUserEmail;
    var refreshToken = req.cookies.shoeDawgRefreshToken;
    if (refreshToken === undefined || email === undefined) {
        res.status(403).send({
            errText: "Email and/or RT is undefined; please log in.",
        });
        return;
    }
    const [results] = await confirmRefreshToken(email, refreshToken);
    if (results.length === 0) {
        res.status(403).send({
            errText: "No RT stored in database; please log in.",
        });
        return;
    }
    const matchingToken = results[0]["refresh_token"];
    const tokenSecret = results[0]["rt_secret"];
    try {
        var decoded = jwt.verify(matchingToken, tokenSecret);
    } catch (error) {
        res.status(403).send({
            errText: `${error.name}: ${error.message}. Please log in.`,
        });
        return;
    }
    var isCartActive = req.cookies.isCartActive;
    if (isCartActive === undefined) {
        // cart requires initialization.

        await cartInitUtil.initializeCart();
        res.cookie("isCartActive", "true", {
            maxAge: authConfig.jwtRefreshExpiration * 1000,
            httpOnly: true,
            sameSite: "lax",
        });
        res.status(200).send("Cart that previously DNE has now been initialized.");
        return;
    }

    // at this point, cart is active. Must fetch contents.

    const fetchCartContents = async () => {
        var sql = `SELECT sku, quantity FROM CART_DETAILS NATURAL JOIN ON CART WHERE refresh_token=?`;
        const [results] = await (await connection).execute(sql, [matchingToken]);
        let resultArray = [];
        for (var i = 0; i < results.length; i++) {
            let resObj = {};
            resObj.sku = results[i]["sku"];
            resObj.quantity = results[i]["quantity"];
        }
        return resultArray;
    };
    const cartContents = await fetchCartContents();
    res.status(200).send({
        message: "Cart validated.",
        cartContents,
    });
});

module.exports = router;
