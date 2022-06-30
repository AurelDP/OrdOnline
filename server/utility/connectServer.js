const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const mySQLClient = mysql.createConnection({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
});

module.exports =  mySQLClient