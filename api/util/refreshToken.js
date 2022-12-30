const jwtConfig = require("../config/authConfig");
const { v4: uuidv4 } = require("uuid");

exports.createToken = async (userInfo) => {
    const { email, fname } = userInfo;
};
