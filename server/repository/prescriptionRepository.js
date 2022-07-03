const utility = require("../utility/index");
const dotenv = require('dotenv');
dotenv.config();

const DATABASE_NAME = process.env.DATABASE;
const TABLE_NAME = "Ordonnance";

const TABLE_PATH = DATABASE_NAME + "." + TABLE_NAME;

const add = async (conseilsMedicaux, IDmedecin, IDpatient, traitements) => {
    const client = utility.mySQLClient;
    const dateOrdonnance = new Date().toJSON().slice(0, 10);
    const sqlQuery = `INSERT INTO ${TABLE_PATH} (conseilsMedicaux, dateOrdonnance, IDmedecin, IDpatient) VALUES('${conseilsMedicaux}', '${dateOrdonnance}', ${IDmedecin}, ${IDpatient});`;

    try {
        const results = await client.promise().query(sqlQuery);
        console.log(results);
        return results;
    } catch (err) {
        console.log(err.stack);
        return null;
    }
}

module.exports = {
    add
}