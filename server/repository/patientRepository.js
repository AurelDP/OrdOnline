const utility = require("../utility");
const doctorRepository = require("./doctorRepository");
const {secureApostrophes} = require("../methods/globalMethods");
const linkDoctorPatientRepository = require("./linkDoctorPatientRepository");

async function save(pool, lastName, firstName, addressId, accountId) {
    const insertUserQuery = `INSERT INTO Patient (nomPatient, prenomPatient, IDadresse, IDcompte)
                             VALUES ('${lastName}', '${firstName}', ${addressId}, ${accountId})`;
    return await pool.promise().query(insertUserQuery);
}

async function find(pool, id) {
    const query = `SELECT * FROM Patient WHERE ('${id}' = IDcompte);`;
    return await pool.promise().query(query);
}

const getRecord = async (patientID, role, userID) => {
    const pool = utility.pool;
    const query = `SELECT nomPatient, prenomPatient, dateDeNaissance, numeroSecu, poids, numeroAdresse, rueAdresse, communeAdresse, codePostal, mailCompte, telCompte 
                    FROM Patient
                    JOIN Adresse ON Adresse.IDadresse = Patient.IDadresse
                    JOIN Compte ON Compte.IDcompte = Patient.IDcompte
                    WHERE Patient.IDpatient = '${patientID}';`;

    try {
        if (role === "doctor" || role === "healthService") {

            if (role === "doctor") {
                const doctorID = await doctorRepository.getDoctorID(pool, userID);
                const isValid = await linkDoctorPatientRepository.isPatientOfDoctor(pool, doctorID, patientID);

                if (!isValid)
                    return "error";
            }

            const [res] = await pool.promise().query(query);
            if (res[0].dateDeNaissance !== null)
                res[0].dateDeNaissance = res[0].dateDeNaissance.toLocaleDateString();
            return res[0];
        } else
            return "error";
    } catch (err) {
        console.log(err);
        return "error";
    }
}

const getPrescriptions = async (patientID, userRole, userID) => {
    const pool = utility.pool;

    try {
        let rows;

        if (userRole === "doctor") {
            const doctorID = await doctorRepository.getDoctorID(pool, userID);

            const isValid = await linkDoctorPatientRepository.isPatientOfDoctor(pool, doctorID, patientID);
            if (!isValid)
                return "error";

            const doctorQuery = `SELECT
                                o.IDordonnance,
                                o.dateOrdonnance,
                                m.nomMedecin,
                                s.nouveauStatut
                            FROM Ordonnance AS o
                            JOIN HistoriqueStatuts AS s ON s.IDordonnance = o.IDordonnance
                            JOIN Médecin AS m ON m.IDmedecin = o.IDmedecin
                            WHERE o.IDpatient = ${patientID}
                            AND o.IDmedecin = ${doctorID}
                            AND s.IDstatut = (
                                SELECT
                                    MAX(s2.IDstatut)
                                FROM HistoriqueStatuts AS s2
                                WHERE s2.IDordonnance = o.IDordonnance
                            )
                            ORDER BY o.IDordonnance DESC;`;
            [rows] = await pool.promise().query(doctorQuery);
        } else if (userRole === "healthService") {
            const healthServiceQuery = `SELECT
                                        o.IDordonnance,
                                        o.dateOrdonnance,
                                        m.nomMedecin,
                                        s.nouveauStatut
                                    FROM Ordonnance AS o
                                    JOIN Médecin AS m ON m.IDmedecin = o.IDmedecin
                                    JOIN HistoriqueStatuts AS s ON s.IDordonnance = o.IDordonnance
                                    WHERE o.IDpatient = ${patientID}
                                    AND s.IDstatut = (
                                        SELECT
                                            MAX(s2.IDstatut)
                                        FROM HistoriqueStatuts AS s2
                                        WHERE s2.IDordonnance = o.IDordonnance
                                    )
                                    ORDER BY o.IDordonnance DESC;`;
            [rows] = await pool.promise().query(healthServiceQuery);
        } else if (userRole === "patient") {
            const patientQuery = `SELECT
                                        o.IDordonnance,
                                        o.dateOrdonnance,
                                        m.nomMedecin,
                                        s.nouveauStatut
                                    FROM Ordonnance AS o
                                    JOIN Médecin AS m ON m.IDmedecin = o.IDmedecin
                                    JOIN HistoriqueStatuts AS s ON s.IDordonnance = o.IDordonnance
                                    WHERE o.IDpatient = ${patientID}
                                    AND s.IDstatut = (
                                        SELECT
                                            MAX(s2.IDstatut)
                                        FROM HistoriqueStatuts AS s2
                                        WHERE s2.IDordonnance = o.IDordonnance
                                    )
                                    ORDER BY o.IDordonnance DESC;`;
            [rows] = await pool.promise().query(patientQuery);
        } else {
            return "error";
        }

        for (const row in rows) {
            rows[row].dateOrdonnance = rows[row].dateOrdonnance.toLocaleDateString();
            rows[row].nomMedecin = "Docteur " + rows[row].nomMedecin;
        }

        const res = [];
        for (const row in rows) {
            res.push({
                "dateOrdonnance": rows[row].dateOrdonnance,
                "nomMedecin": rows[row].nomMedecin,
                "nouveauStatut": rows[row].nouveauStatut,
                "IDordonnance": rows[row].IDordonnance
            });
        }

        if (res.length === 0)
            return "no prescriptions";
        else
            return res;
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

async function getPatientID(pool, id) {
    const query = `SELECT IDpatient FROM Patient WHERE IDcompte = '${id}'`;
    const [res] = await pool.promise().query(query);
    if (res.length !== 0)
        return res[0].IDpatient;
    else
        return "error";
}

async function getPharmas(userRole, userID) {
    const pool = utility.pool;

    if (userRole !== "patient")
        return "error";

    try {
        const patientID = await getPatientID(pool, userID);

        const query = `SELECT
                            ph.nomPharmacie,
                            ad.numeroAdresse,
                            ad.rueAdresse,
                            ad.communeAdresse,
                            ad.codePostal
                        FROM Pharmacie AS ph
                        NATURAL JOIN AccesOrdo AS a
                        JOIN Adresse AS ad ON ad.IDadresse = ph.IDadresse
                        JOIN Ordonnance AS o ON a.IDordonnance = o.IDordonnance
                        JOIN Patient AS pa ON pa.IDpatient = o.IDpatient
                        WHERE pa.IDpatient = ${patientID};`;

        const [res] = await pool.promise().query(query);
        let rows;

        if (res.length === 0)
            return "noPharmacies";
        else {
            rows = [];
            for (const row in res) {
                rows.push({
                    "nomPharma": res[row].nomPharmacie,
                    "adressePharma": res[row].numeroAdresse + " " + res[row].rueAdresse + ", " + res[row].communeAdresse + ", " + res[row].codePostal,
                });
            }
            return rows;
        }
    } catch (err) {
        console.log(err);
        return "error";
    }
}

async function getAllByParam(userRole, search) {
    const pool = utility.pool;

    search = secureApostrophes(search.toLowerCase());
    if (userRole !== "doctor")
        return "error";

    const query = `SELECT
                        IDpatient,
                        nomPatient,
                        prenomPatient,
                        numeroAdresse,
                        rueAdresse,
                        communeAdresse,
                        codePostal
                    FROM Patient
                    NATURAL JOIN Adresse
                    WHERE nomPatient LIKE '%${search}%'
                    OR prenomPatient LIKE '%${search}%'
                    OR rueAdresse LIKE '%${search}%'
                    OR communeAdresse LIKE '%${search}%'
                    OR codePostal LIKE '%${search}%'`;

    try {
        const [rows] = await pool.promise().query(query);
        if (rows.length === 0)
            return "noPatientFound";
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
    } catch (err) {
        console.log(err);
        return "error";
    }
}

async function addPatientToDoctor (patientID, userID, userRole) {
    const pool = utility.pool;

    if (userRole !== "doctor")
        return "error";

    try {
        const doctorID = await doctorRepository.getDoctorID(pool, userID);

        const query = `INSERT INTO LiaisonMedecinPatient (IDmedecin, IDpatient)
                        VALUES (${doctorID}, ${patientID});`;
        await pool.promise().query(query);
        return "success";
    } catch (err) {
        console.log(err);
        return "error";
    }
}

const findPatientIdByPrescriptionId = async (pool, prescriptionID) => {
    const sqlQuery = `SELECT IDpatient FROM Ordonnance WHERE IDordonnance = ${prescriptionID};`;
    const [rows] = await pool.promise().query(sqlQuery);
    return rows[0].IDpatient;
}

module.exports = {
    save,
    find,
    getRecord,
    getPrescriptions,
    update,
    getAddressID,
    getPatientID,
    getPharmas,
    getAllByParam,
    addPatientToDoctor,
    findPatientIdByPrescriptionId
}