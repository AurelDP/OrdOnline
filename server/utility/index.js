const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const mySQLClient = mysql.createPool({
    user: process.env.DBUSER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
});

module.exports = {
    mySQLClient
}