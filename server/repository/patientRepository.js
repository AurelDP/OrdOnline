const utility = require("../utility");

async function save(pool, lastName, firstName, addressId, accountId) {
    const insertUserQuery = `INSERT INTO Patient (nomPatient, prenomPatient, IDadresse, IDcompte)
                             VALUES ('${lastName}', '${firstName}', ${addressId}, ${accountId})`;
    return await pool.promise().query(insertUserQuery);
}

async function find(pool, id) {
    const query = `SELECT * FROM Patient WHERE ('${id}' = IDcompte);`;
    return await pool.promise().query(query);
}

const getRecord = async (id, role) => {
    const pool = utility.pool;
    const query = `SELECT nomPatient, prenomPatient, dateDeNaissance, numeroSecu, poids, numeroAdresse, rueAdresse, communeAdresse, codePostal, mailCompte, telCompte 
                    FROM Patient, Adresse, Compte
                    WHERE Patient.IDadresse = Adresse.IDadresse
                    AND Compte.IDcompte = Patient.IDcompte
                    AND Compte.IDcompte = '${id}';`;

    try {
        if (role === "doctor" || role === "healthService") {
            const res = await pool.promise().query(query);
            return res[0][0];
        } else
            return "error";
    } catch (err) {
        console.log(err);
        return "error";
    }
}

module.exports = {
    save,
    find,
    getRecord,
}