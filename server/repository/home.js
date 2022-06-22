const utility = require("../utility/index");
const dotenv = require('dotenv');
dotenv.config();

const DATABASE_NAME = process.env.DATABASE;
const TABLE_NAME = "home";

const TABLE_PATH = `"${DATABASE_NAME}"."${TABLE_NAME}"`;

const getTitle = async email => {
    const client = utility.tryToConnect();
    const sqlQuery = `SELECT Title FROM ${TABLE_PATH} WHERE email = '${email.email}'`;

    try {
        const pgResp = await client.query(sqlQuery);
        client.end();
        return pgResp.rows;
    } catch(err) {
        console.log(err.stack);
        client.end();
        return null;
    }
}

module.exports = {
    getTitle
}