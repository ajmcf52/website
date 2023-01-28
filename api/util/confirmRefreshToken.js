var connection = require("../config/connection");

const confirmRefreshToken = async (userEmail, userRefreshToken) => {
    var sql = `SELECT refresh_token, rt_secret FROM TOKENS AS t WHERE t.email=? AND t.refresh_token=?`;
    return Promise.resolve(
        await (await connection).execute(sql, [userEmail, userRefreshToken])
    );
};

module.exports = confirmRefreshToken;
