const jwtConfig = require("../config/authConfig");
const jwt = require("jsonwebtoken");

const generateAT = async (userInfo) => {
    const payload = { email: userInfo.email, fname: userInfo.fname };
    const accessToken = jwt.sign(payload, jwtConfig.secret, {
        expiresIn: jwtConfig.jwtExpiration,
    });
    try {
        return Promise.resolve(accessToken);
    } catch (error) {
        return Promise.reject(error);
    }
};

module.exports = generateAT;
