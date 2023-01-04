const jwtConfig = require("../config/authConfig");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const generateTokens = async (userInfo) => {
    const payload = { email: userInfo.email, fname: userInfo.fname };
    const accessToken = jwt.sign(payload, jwtConfig.secret, {
        expiresIn: jwtConfig.jwtExpiration,
    });
    const refreshToken = jwt.sign(payload, uuidv4(), {
        expiresIn: jwtConfig.jwtRefreshExpiration,
    });
    try {
        return Promise.resolve({ accessToken, refreshToken });
    } catch (error) {
        return Promise.reject(error);
    }
};

module.exports = generateTokens;
