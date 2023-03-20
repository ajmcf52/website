var express = require("express");
var jwt = require("jsonwebtoken");
var authConfig = require("../config/authConfig");
var connection = require("../config/connection");

const verifyAccessToken = async (token) => {
    if (token === undefined)
        return {
            success: false,
            errCode: 449,
            errText: "Access Token is missing; please log in.",
        };
    try {
        jwt.verify(token, authConfig.secret);
    } catch (error) {
        return { success: false, errCode: 449, errText: `Error while verifying access token: ${error}` };
    }
    return { success: true, errCode: 0 };
};

module.exports = verifyAccessToken;
