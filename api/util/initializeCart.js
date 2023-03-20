var connection = require("../config/connection");

const initializeCart = async (refreshToken) => {
    var sql = `SELECT cart_id from CART WHERE refresh_token=?`;
    var [results] = await (await connection).query(sql, [refreshToken]);
    if (results.length !== 0) {
        return Promise.resolve(false);
    }
    sql = `INSERT INTO CART(cart_id, refresh_token) VALUES(?,?)`;
    await (await connection).query(sql, [null, refreshToken]);
    return Promise.resolve(true);
};

module.exports = initializeCart;
