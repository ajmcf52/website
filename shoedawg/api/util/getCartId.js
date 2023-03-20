var connection = require("../config/connection");

const getCartId = async (refreshToken) => {
    var sql = `SELECT cart_id FROM CART WHERE refresh_token=?`;
    const [result] = await (await connection).execute(sql, [refreshToken]);
    if (result.length === 0) return null;
    return result[0]["cart_id"];
};

module.exports = getCartId;
