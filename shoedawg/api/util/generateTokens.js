const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const jwtConfig = require("../config/authConfig");
const generateAT = require("./generateAT");

const generateTokens = async (userInfo) => {
    const payload = { email: userInfo.email, fname: userInfo.fname };
    const accessToken = generateAT(userInfo);
    const rtSecret = uuidv4();
    const refreshToken = jwt.sign(payload, rtSecret, {
        expiresIn: jwtConfig.jwtRefreshExpiration,
    });
    try {
        return Promise.resolve({
            renewedAccessToken: accessToken,
            renewedRefreshToken: refreshToken,
            rtSecret,
        });
    } catch (error) {
        return Promise.reject(error);
    }
};

module.exports = generateTokens;
