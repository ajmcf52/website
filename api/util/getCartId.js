var connection = require("../config/connection");

export default getCartId = async (refreshToken) => {
    var sql = `SELECT cart_id FROM SHOPPING_CART WHERE refresh_token=?`;
    const [result] = await (await connection).execute(sql, [refreshToken]);
    if (result.length === 0) return null;
    return result[0]["cart_id"];
};
