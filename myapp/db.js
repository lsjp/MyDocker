var sqlite3 = require('sqlite3').verbose(),
    db = new sqlite3.Database('test.db');

var search_table = "SELECT name FROM sqlite_master WHERE type='table'";
var table_create_user = "CREATE TABLE user ( openid INTEGER PRIMARY KEY , nickname VARCHAR(255),sex Blob,language VARCHAR(255),city VARCHAR(255),province VARCHAR(255),country VARCHAR(255),headimgurl Text,subscribe_time Integer,invalid_flag Integer,email Text,usertype VARCHAR(255),university  VARCHAR(255),major VARCHAR(255),year Integer)";

var databaseInit = function (tableName) {
    db.get(getSearchTable(tableName), function (err, rows) {
        if (err !== null) {
            console.log(err);
        } else if (rows === undefined) {
            db.run(eval("table_create_" + tableName), function (err) {
                if (err !== null) {
                    console.log(err);
                } else {
                    console.log("SQL Table " + tableName + " initialized.");
                }
            });
        } else {
            console.log("SQL Table " + tableName + " already initialized.");
        }
    })
};

var getSearchTable = function (name) {
    var tableName = " AND name='" + name + "'";
    return search_table + tableName;
};

// Database initialization
databaseInit("user");

module.exports = db;

//db.close();