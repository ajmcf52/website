var mysql = require("mysql2/promise");
var dbConfig = require("./dbConfig");

var connection = mysql.createConnection(dbConfig);

module.exports = connection;
