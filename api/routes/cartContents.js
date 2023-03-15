var express = require("express");
var jwt = require("jsonwebtoken");
var authConfig = require("../config/authConfig");
var connection = require("../config/connection");
var cartInitUtil = require("./initCart");
const confirmRefreshToken = require("../util/confirmRefreshToken");

var router = express.Router();

router.get("/cartContents", async (req, res) => {
    var email = req.cookies.shoeDawgUserEmail;
    var accessToken = req.query.at;
    var refreshToken = req.cookies.shoeDawgRefreshToken;
    if (accessToken === undefined) {
        res.status(449).send({
            errText: "Access Token is missing; please log in.",
        });
        return;
    }
    try {
        jwt.verify(accessToken, authConfig.secret);
    } catch (error) {
        res.status(449).send({
            errText: `Error while verifying access token: ${error}`,
        });
        return;
    }

    if (refreshToken === undefined || email === undefined) {
        res.status(403).send({
            errText: "Email and/or RT is undefined; please log in.",
        });
        return;
    }
    const [results] = await confirmRefreshToken(email, refreshToken);
    if (results.length === 0) {
        res.status(403).send({
            errText: "Matching RT not found; please log in.",
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
        res.status(200).send({
            message: "Cart that previously DNE has now been initialized.",
            cartContents: [],
        });
        return;
    }

    // at this point, cart is active. Must get contents.

    const getCartContents = async () => {
        //var sql = `SELECT sku, quantity FROM CART_DETAILS NATURAL JOIN ON CART WHERE refresh_token=?`;
        var sql = `SELECT CD.sku, CD.quantity, name, price FROM CART_DETAILS CD NATURAL JOIN CART JOIN STOCK S1 WHERE CD.sku=S1.sku AND refresh_token=?`;
        const [results] = await (await connection).execute(sql, [matchingToken]);
        let resultArray = [];
        for (var i = 0; i < results.length; i++) {
            let resObj = {};
            resObj.sku = results[i]["sku"];
            resObj.quantity = results[i]["quantity"];
            resObj.name = results[i]["name"];
            resObj.price = results[i]["price"];
            resultArray.push(resObj);
        }
        return resultArray;
    };
    const cartContents = await getCartContents();
    res.status(200).send({
        message: "Cart validated.",
        cartContents,
    });
});

module.exports = router;
