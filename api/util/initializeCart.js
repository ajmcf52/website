var connection = require("../config/connection");

const initializeCart = async (refreshToken) => {
    var sql = `INSERT INTO CART(cart_id, refresh_token) VALUES(?,?)`;
    await (await connection).query(sql, [null, refreshToken]);
};

module.exports = initializeCart;
