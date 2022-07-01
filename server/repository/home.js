const utility = require("../utility/index");
const dotenv = require('dotenv');
dotenv.config();

const DATABASE_NAME = process.env.DATABASE;
const TABLE_NAME = "Ordonnance";

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
    const client = utility.mySQLClient;
    const sqlQuery = "SELECT * FROM " + TABLE_PATH;

    try {
        client.getConnection(function (err, connection) {
            connection.query(sqlQuery, function(err, rows)
            {
                if (err) throw err;

                console.log(rows[0]);
                connection.release();
            });
        });
    } catch(err) {
        console.log(err.stack);
        return null;
    }
}

module.exports = {
    getTitle,
    getAll
}