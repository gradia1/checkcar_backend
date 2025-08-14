// db.js
const mysql = require('mysql2');
const external = require("./constant")
require('dotenv').config();

process.env.DB_PASS

var pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_LOGIN,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    port: 3306
});

// var pool = mysql.createPool({
//     host: external.GET_MYSQL_DETAIL.HOST,
//     user: external.GET_MYSQL_DETAIL.LOGIN,
//     password: external.GET_MYSQL_DETAIL.PASSWORD,
//     database: external.GET_MYSQL_DETAIL.DATABASE,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0,
//     port: 3306

// });

// Exporting a promise-based pool
const promisePool = pool.promise();

module.exports = promisePool;
