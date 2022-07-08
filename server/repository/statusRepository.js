const utility = require("../utility");
const pharmaRepository = require("./pharmaRepository");
const doctorRepository = require("./doctorRepository");
const patientRepository = require("./patientRepository");

async function checkAbilityToViewPrescription(pool, userID, role, prescriptionId) {
    let canView = false;
    if (role === "pharma") {
        const pharmaID = await pharmaRepository.getPharmaID(pool, userID);
        if (pharmaID === await pharmaRepository.findPharmaIDByPrescriptionId(pool, prescriptionId)) {
            canView = true;
        }
    } else if (role === "doctor") {
        const doctorID = await doctorRepository.getDoctorID(pool, userID);
        if (doctorID === await doctorRepository.findDoctorIdByPrescriptionId(pool, prescriptionId)) {
            canView = true;
        }
    } else if (role === "patient") {
        const patientID = await patientRepository.getPatientID(pool, userID);
        if (patientID === await patientRepository.findPatientIdByPrescriptionId(pool, prescriptionId)) {
            canView = true;
        }
    } else if (role === "healthcare") {
        canView = true;
    }
    return canView;
}

const findByPrescriptionId = async (prescriptionId, userID, role) => {
    const pool = utility.pool;
    const canView = await checkAbilityToViewPrescription(pool, userID, role, prescriptionId);
    if (canView) {
        try {
            const sqlQuery2 = `SELECT * FROM HistoriqueStatuts WHERE HistoriqueStatuts.IDordonnance = ${prescriptionId} ORDER BY HistoriqueStatuts.IDstatut DESC;`;
            const [rows2] = await pool.promise().query(sqlQuery2);
            const statuses = [];

            const getDoctorNameQuery = `SELECT nomMedecin FROM Médecin JOIN Ordonnance ON Ordonnance.IDmedecin = Médecin.IDmedecin WHERE IDordonnance = ${prescriptionId};`;
            const [doctorName] = await pool.promise().query(getDoctorNameQuery);

            for (const row in rows2) {
                let namePharma;
                if (rows2[row].IDpharmacien !== null) {
                    const getNamePharmaQuery = `SELECT nomPharmacie FROM Pharmacie WHERE Pharmacie.IDpharmacien = ${rows2[row].IDpharmacien};`;
                    [namePharma] = await pool.promise().query(getNamePharmaQuery);
                }
                statuses.push({"date": rows2[row].dateStatut ? rows2[row].dateStatut.toLocaleDateString() : "", "status": rows2[row].nouveauStatut, "pharma": rows2[row].IDpharmacien === null ? "Docteur " + doctorName[0].nomMedecin  : namePharma[0].nomPharmacie});
            }

            return statuses;
        } catch (err) {
            console.log(err);
            throw new err;
        }
    } else {
        return "error";
    }
}

const add = async (prescriptionId, status, pharma) => {
    const pool = utility.pool;

    try {
        const sqlQuery = `INSERT INTO HistoriqueStatuts (dateStatut, nouveauStatut, IDordonnance, IDpharmacien) VALUES (NOW(), '${status}', ${prescriptionId}, ${pharma});`;
        await pool.promise().query(sqlQuery);
    } catch (err) {
        console.log(err);
        throw new err;
    }
}

exports.findByPrescriptionId = findByPrescriptionId;
exports.add = add;
exports.checkAbilityToViewPrescription = checkAbilityToViewPrescription;

