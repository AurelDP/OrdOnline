const utility = require("../utility");

async function save(pool, lastName, firstName, domain, rppsNumber, addressId, accountId) {
    const insertUserQuery = `INSERT INTO Médecin (nomMedecin, prenomMedecin, domaineMedecin, numeroRPPSmedecin, IDadresse, IDcompte)
                             VALUES ('${lastName}', '${firstName}', '${domain}', '${rppsNumber}', ${addressId}, ${accountId})`;
    return await pool.promise().query(insertUserQuery);
}

async function find(pool, id) {
    const query = `SELECT * FROM Médecin WHERE ('${id}' = IDcompte);`;
    return await pool.promise().query(query);
}

async function getAddressID(pool, id) {
    const query = `SELECT IDadresse FROM Médecin WHERE IDcompte = '${id}'`;
    return await pool.promise().query(query);
}

async function update(pool, id, rppsNumber, domain) {
    const query = `UPDATE Médecin SET numeroRPPSmedecin = '${rppsNumber}', domaineMedecin = '${domain}' WHERE IDcompte = '${id}'`;
    return await pool.promise().query(query);
}

async function getDoctorID(pool, id) {
    const query = `SELECT IDmedecin FROM Médecin WHERE IDcompte = '${id}'`;
    const [res] = await pool.promise().query(query);
    if (res.length !== 0)
        return res[0].IDmedecin;
    else
        return "error";
}

async function getPatients(userRole, userID) {
    const pool = utility.pool;

    if (userRole !== "doctor")
        return "error";

    try {
        const doctorID = await getDoctorID(pool, userID);

        const patientQuery = `SELECT
                                p.IDpatient,
                                p.nomPatient,
                                p.prenomPatient,
                                a.numeroAdresse,
                                a.rueAdresse,
                                a.communeAdresse,
                                a.codePostal
                            FROM LiaisonMedecinPatient AS l
                            JOIN Patient AS p ON p.IDpatient = l.IDpatient
                            JOIN Adresse AS a ON a.IDadresse = p.IDadresse
                            WHERE l.IDmedecin = '${doctorID}';`;

        const [rows] = await pool.promise().query(patientQuery);

        if (rows.length === 0)
            return "noPatientsFound";
        else {
            let res = [];
            for (const row in rows) {
                res.push({
                    "nomPatient": rows[row].nomPatient + " " + rows[row].prenomPatient,
                    "adressePatient": rows[row].numeroAdresse + " " + rows[row].rueAdresse + ", " + rows[row].communeAdresse + ", " + rows[row].codePostal,
                    "IDpatient": rows[row].IDpatient,
                });
            }
            return res;
        }
    } catch (error) {
        return "error";
    }
}

const findDoctorIdByPrescriptionId = async (pool, prescriptionID) => {
    const sqlQuery = `SELECT IDmedecin FROM Ordonnance WHERE IDordonnance = ${prescriptionID};`;
    const [rows] = await pool.promise().query(sqlQuery);
    return rows[0].IDmedecin;
}

module.exports = {
    save,
    find,
    getAddressID,
    update,
    getDoctorID,
    getPatients
    findDoctorIdByPrescriptionId
}