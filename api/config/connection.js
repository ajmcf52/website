var mysql = require("mysql2");
var dbConfig = require("./dbConfig");

var connection = mysql.createConnection(dbConfig);

module.exports = connection;
