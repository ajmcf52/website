var jwt = require("jsonwebtoken");
var authConfig = require("../config/authConfig");
var connection = require("../config/connection");

const validateCookies = async (email, refreshToken, httpRes) => {
    if (refreshToken === undefined || email === undefined) {
        throw new Error("Email and/or Refresh Token is undefined; please log in.");
    }
};

module.exports = validateCookies;
