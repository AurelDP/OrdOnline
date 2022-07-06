const utility = require("../utility/index");
const dotenv = require('dotenv');
dotenv.config();

const DATABASE_NAME = process.env.DATABASE;
const TABLE_NAME = "AccesOrdo";

const TABLE_PATH = DATABASE_NAME + "." + TABLE_NAME;

const getAll = async () => {
    const client = utility.mySQLClient;
    const sqlQuery = `SELECT * FROM ${TABLE_PATH}`;

    try {
        const [results] = await client.promise().query(sqlQuery);
        return results;
    } catch(err) {
        console.log(err.stack);
        return null;
    }
}

module.exports = {
    getAll
}