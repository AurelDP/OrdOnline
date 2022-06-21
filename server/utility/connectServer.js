const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const config = {
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
    ssl: true,
}

const getPgClient = () => new Client(config);

module.exports = getPgClient;