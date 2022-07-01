const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const mySQLClient = mysql.createPool({
    user: process.env.USERNAME,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
    ssl: true
});

module.exports = {
    mySQLClient
}