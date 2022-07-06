const utility = require("../utility/index");
const { secureApostrophes } = require("../methods/globalMethods");
const patientRepository = require("./patientRepository");
const prescriptionRepository = require("./prescriptionRepository");

async function save(pool, name, rppsNumber, addressId, accountId) {
    const insertUserQuery = `INSERT INTO Pharmacie (nomPharmacie, numeroRPPSpharmacien, IDadresse, IDcompte)
                             VALUES ('${name}', '${rppsNumber}', ${addressId}, ${accountId})`;
    return await pool.promise().query(insertUserQuery);
}

async function find(pool, id) {
    const query = `SELECT * FROM Pharmacie WHERE ('${id}' = IDcompte);`;
    return await pool.promise().query(query);
}

async function getAddressID(pool, id) {
    const query = `SELECT IDadresse FROM Pharmacie WHERE IDcompte = '${id}'`;
    return await pool.promise().query(query);
}

async function update(pool, id, rppsNumber) {
    const query = `UPDATE Pharmacie SET numeroRPPSpharmacien = '${rppsNumber}' WHERE IDcompte = '${id}'`;
    return await pool.promise().query(query);
}

async function getPharmaID(pool, id) {
    const query = `SELECT IDpharmacien FROM Pharmacie WHERE IDcompte = '${id}'`;
    const [res] = await pool.promise().query(query);
    if (res.length !== 0)
        return res[0].IDpharmacien;
    else
        return "error";
}

async function getAllByParam(userRole, search) {
    const pool = utility.pool;

    search = secureApostrophes(search.toLowerCase());
    if (userRole !== "patient")
        return "error";

    const query = `SELECT
                        IDpharmacien,
                        nomPharmacie,
                        numeroAdresse,
                        rueAdresse,
                        communeAdresse,
                        codePostal
                    FROM Pharmacie
                    NATURAL JOIN Adresse
                    WHERE nomPharmacie LIKE '%${search}%'
                    OR rueAdresse LIKE '%${search}%'
                    OR communeAdresse LIKE '%${search}%'
                    OR codePostal LIKE '%${search}%'`;

    try {
        const [rows] = await pool.promise().query(query);
        if (rows.length === 0)
            return "noPharmaFound";
        else {
            let res = [];
            for (const row in rows) {
                res.push({
                    "nomPharmacie": rows[row].nomPharmacie,
                    "adressePharma": rows[row].numeroAdresse + " " + rows[row].rueAdresse + ", " + rows[row].communeAdresse + ", " + rows[row].codePostal,
                    "IDpharmacien": rows[row].IDpharmacien,
                });
            }
            return res;
        }
    } catch (err) {
        console.log(err);
        return "error";
    }
}

const addPharmaToPrescription = async (userRole, userID, prescriptionID, pharmaID) => {
    const pool = utility.pool;

    if (userRole !== "patient")
        return "error";

    try {
        const patientID = await patientRepository.getPatientID(pool, userID);
        const isPatientLinkedToOrdo = await prescriptionRepository.checkPatientOrdo(pool, patientID, prescriptionID);

        if (isPatientLinkedToOrdo) {
            const query = `INSERT INTO AccesOrdo (IDpharmacien, IDordonnance)
                    VALUES (${pharmaID}, ${prescriptionID})`;
            await pool.promise().query(query);
        } else
            return "error";
        return "success";
    } catch (err) {
        console.log(err);
        return "error";
    }
}

const findPharmaIDByPrescriptionId = async (pool, prescriptionID) => {
    const sqlQuery = `SELECT IDpharmacien FROM AccesOrdo WHERE IDordonnance = ${prescriptionID};`;
    const [rows] = await pool.promise().query(sqlQuery);
    return rows[0].IDpharmacien;
}

const getPrescriptions = async (userRole, userID) => {
    const pool = utility.pool;

    if (userRole !== "pharma")
        return "error";

    try {
        const pharmaID = await getPharmaID(pool, userID);
        const sqlQuery = `SELECT
                                ao.IDordonnance,
                                o.dateOrdonnance,
                                p.nomPatient,
                                p.prenomPatient,
                                s.nouveauStatut
                            FROM AccesOrdo AS ao
                            NATURAL JOIN Ordonnance AS o
                            JOIN Patient AS p ON p.IDpatient = o.IDpatient
                            JOIN HistoriqueStatuts AS s ON s.IDordonnance = o.IDordonnance
                            WHERE ao.IDpharmacien = ${pharmaID}
                            AND s.IDstatut = (
                                SELECT
                                    MAX(s2.IDstatut)
                                FROM HistoriqueStatuts AS s2
                                WHERE s2.IDordonnance = o.IDordonnance
                            )
                            ORDER BY o.IDordonnance DESC;`;

        const [rows] = await pool.promise().query(sqlQuery);

        for (const row in rows) {
            rows[row].dateOrdonnance = rows[row].dateOrdonnance.toLocaleDateString();
        }

        const res = [];
        for (const row in rows) {
            res.push({
                "dateOrdonnance": rows[row].dateOrdonnance,
                "nomPatient": rows[row].nomPatient + " " + rows[row].prenomPatient,
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

exports.save = save;
exports.find = find;
exports.getAddressID = getAddressID;
exports.update = update;
exports.getPharmaID = getPharmaID;
exports.getAllByParam = getAllByParam;
exports.addPharmaToPrescription = addPharmaToPrescription;
exports.findPharmaIDByPrescriptionId = findPharmaIDByPrescriptionId;
exports.getPrescriptions = getPrescriptions;
