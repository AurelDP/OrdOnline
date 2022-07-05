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

const getPrescriptions = async (patientAccountID, userRole, userID) => {
    const pool = utility.pool;
    const healthServiceQuery = `SELECT
                                    o.IDordonnance,
                                    o.dateOrdonnance,
                                    m.nomMedecin,
                                    s.nouveauStatut
                                FROM Ordonnance AS o
                                JOIN Médecin AS m ON m.IDmedecin = o.IDmedecin
                                JOIN HistoriqueStatuts AS s ON s.IDordonnance = o.IDordonnance
                                JOIN Patient AS p ON p.IDpatient = o.IDpatient
                                WHERE p.IDcompte = ${patientAccountID}
                                AND s.dateStatut = (
                                    SELECT
                                        MAX(s2.dateStatut)
                                    FROM HistoriqueStatuts AS s2
                                    WHERE s2.IDordonnance = o.IDordonnance
                                );`;
    const doctorQuery = `SELECT
                            o.IDordonnance,
                            o.dateOrdonnance,
                            m.nomMedecin,
                            s.nouveauStatut
                        FROM Ordonnance AS o
                        JOIN Médecin AS m ON m.IDmedecin = o.IDmedecin
                        JOIN HistoriqueStatuts AS s ON s.IDordonnance = o.IDordonnance
                        JOIN Patient AS p ON p.IDpatient = o.IDpatient
                        WHERE p.IDcompte = ${patientAccountID}
                        AND m.IDcompte = ${userID}
                        AND s.dateStatut = (
                            SELECT
                                MAX(s2.dateStatut)
                            FROM HistoriqueStatuts AS s2
                            WHERE s2.IDordonnance = o.IDordonnance
                        );`;

    try {
        let res;

        if (userRole === "doctor")
            res = await pool.promise().query(doctorQuery);
        else if (userRole === 'healthService')
            res = await pool.promise().query(healthServiceQuery);

        for (let i = 0; i < res[0].length; i++) {
            res[0][i].dateOrdonnance = res[0][i].dateOrdonnance.toLocaleDateString();
            res[0][i].nomMedecin = "Docteur " + res[0][i].nomMedecin;
        }
        return res[0];
    } catch (err) {
        console.log(err);
        return "error";
    }
}

async function update(pool, id, weight, securityNumber, birthDate) {
    if (birthDate !== null)
        birthDate = "'" + birthDate + "'";
    const query = `UPDATE Patient SET poids = ${weight}, numeroSecu = '${securityNumber}', dateDeNaissance = ${birthDate} WHERE IDcompte = '${id}'`;
    return await pool.promise().query(query);
}

async function getAddressID(pool, id) {
    const query = `SELECT IDadresse FROM Patient WHERE IDcompte = '${id}'`;
    return await pool.promise().query(query);
}

module.exports = {
    save,
    find,
    getRecord,
    getPrescriptions
    update,
    getAddressID
}