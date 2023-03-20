// var dbConfig = {
//     host: "localhost",
//     user: "root",
//     password: "Raylewis#52",
//     database: "shoester",
//     multipleStatements: true,
//     pool: {
//         max: 5,
//         min: 3,
//         acquire: 30000,
//         idle: 10000,
//     },
// };

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

var dbConfig = {
    host: `/cloudsql/${process.env.DB_INSTANCE}`,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    socketPath: `/cloudsql/${process.env.DB_INSTANCE}`,
};

module.exports = dbConfig;
