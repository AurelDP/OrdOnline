const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const mySQLClient = mysql.createConnection({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    ssl: true
});

console.log(mySQLClient);

const tryToConnect = () => {
    mySQLClient.connect(function(err) {
        if (err) throw err;
    });

    return mySQLClient;
};

module.exports = {
    tryToConnect
}