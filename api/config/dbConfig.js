var dbConfig = {
    host: "localhost",
    user: "root",
    password: "Raylewis#52",
    database: "shoester",
    multipleStatements: true,
    pool: {
        max: 5,
        min: 3,
        acquire: 30000,
        idle: 10000,
    },
};

module.exports = dbConfig;
