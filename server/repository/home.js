const utility = require("../utility/index");
const dotenv = require('dotenv');
dotenv.config();

const DATABASE_NAME = process.env.DATABASE;
const TABLE_NAME = "AccesOrdo";

const TABLE_PATH = DATABASE_NAME + "." + TABLE_NAME;

const getTitle = async email => {
    const client = utility.tryToConnect();
    const sqlQuery = "SELECT Title FROM " + TABLE_PATH + " WHERE email = " + email;

    try {
        const sqlResp = await client.query(sqlQuery);
        client.end();
        return sqlResp.rows;
    } catch(err) {
        console.log(err.stack);
        client.end();
        return null;
    }
}

const getAll = async () => {
    const client = utility.tryToConnect();
    const sqlQuery = "SELECT * FROM " + TABLE_PATH;

    try {
        client.query(sqlQuery, (err, res) => {
            if (err) throw err;
            console.log(res.rows);
            client.end();
            return res.rows;
        });
    } catch(err) {
        console.log(err.stack);
        client.end();
        return null;
    }
}

module.exports = {
    getTitle,
    getAll
}