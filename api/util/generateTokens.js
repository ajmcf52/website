const jwtConfig = require("../config/authConfig");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const generateTokens = async (userInfo) => {
    const payload = { email: userInfo.email, fname: userInfo.fname };
    const accessToken = jwt.sign(payload, jwtConfig.secret, {
        expiresIn: "15m",
    });
    const refreshToken = jwt.sign(payload, uuidv4(), { expiresIn: "60d" });

    return Promise.resolve({ accessToken, refreshToken });
};

export default generateTokens;
