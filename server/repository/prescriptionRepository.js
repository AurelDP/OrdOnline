const utility = require("../utility/index");
const treatmentRepository = require("./treatmentRepository");
const linkDoctorPatientRepository = require("./linkDoctorPatientRepository");
const doctorRepository = require("./doctorRepository");
const statusRepository = require("./statusRepository");
const pharmaRepository = require("./pharmaRepository");
const {secureApostrophes, convertFromMySQLDate} = require("../methods/globalMethods");

const add = async (pool, medicalAdvices, IDmedecin, IDpatient) => {
    if (medicalAdvices !== "" && medicalAdvices !== null)
        medicalAdvices = secureApostrophes(medicalAdvices);
    const sqlQuery = `INSERT INTO Ordonnance (conseilsMedicaux, dateOrdonnance, IDmedecin, IDpatient)
                        VALUES('${medicalAdvices}', NOW(), ${IDmedecin}, ${IDpatient});`;
    return await pool.promise().query(sqlQuery);
}

const addPrescription = async (userID, userRole, prescription) => {
    const pool = utility.pool;

    try {
        if (userRole !== "doctor") {
            return "error";
        }

        let treatmentsEmpty = true;
        for (const row in prescription.treatments) {
            if (prescription.treatments[row].name !== "" || prescription.treatments[row].description !== "") {
                treatmentsEmpty = false;
                break;
            }
        }

        if (treatmentsEmpty && prescription.medicalAdvices === "") {
            return "noDataReceived";
        }

        const doctorID = await doctorRepository.getDoctorID(pool, userID);

        const isValid = await linkDoctorPatientRepository.isPatientOfDoctor(pool, doctorID, prescription.patientID);
        if (!isValid)
            return "error";

        const [savePrescriptionResult] = await add(pool, prescription.medicalAdvices, doctorID, prescription.patientID);
        const prescriptionId = savePrescriptionResult.insertId;
        if (!treatmentsEmpty)
            await treatmentRepository.add(pool, prescription.treatments, prescriptionId);
        let status;
        if (treatmentsEmpty)
            status = "Fermée";
        else
            status = "En attente";
        await statusRepository.add(prescriptionId, status, null);

        return prescriptionId;
    } catch (err) {
        console.log(err);
        throw new err;
    }
}

const findById = async (prescriptionId, userID, role) => {
    const pool = utility.pool;

    const canView = await statusRepository.checkAbilityToViewPrescription(pool, userID, role, prescriptionId);

    if (canView) {
        try {
            const sqlQuery = `SELECT * FROM Ordonnance 
                JOIN Patient ON Patient.IDpatient = Ordonnance.IDpatient 
                JOIN Médecin ON Médecin.IDmedecin = Ordonnance.IDmedecin
                JOIN Adresse ON Médecin.IDadresse = Adresse.IDadresse
                WHERE Ordonnance.IDordonnance = ${prescriptionId};`;
            const [rows] = await pool.promise().query(sqlQuery);

            const prescription = {
                "patient": {
                    "lastName": rows[0].nomPatient,
                    "firstName": rows[0].prenomPatient,
                    "birthDate": convertFromMySQLDate(rows[0].dateDeNaissance),
                    "weight": rows[0].poids
                },
                "doctor": {
                    "lastName": rows[0].nomMedecin,
                    "firstName": rows[0].prenomMedecin,
                    "address": rows[0].numeroAdresse.toString() + " " + rows[0].rueAdresse + ", " + rows[0].communeAdresse + ", " + rows[0].codePostal
                },
                "medicalAdvices": rows[0].conseilsMedicaux,
                "date": convertFromMySQLDate(rows[0].dateOrdonnance),
                "treatments": []
            };
            prescription["treatments"] = await treatmentRepository.findByPrescriptionId(prescriptionId);
            if (rows[0].dateDeNaissance !== null) {
                prescription["patient"].age = new Date().getFullYear() - (rows[0].dateDeNaissance).getFullYear();
            }

            return {"prescription": prescription};
        } catch (err) {
            console.log(err);
            throw new err;
        }
    } else {
        return "error";
    }
}

const closeById = async (prescriptionId, role, userID) => {
    const pool = utility.pool;

    try {
        if (role === 'doctor') {
            const doctorID = await doctorRepository.getDoctorID(pool, userID);
            if (doctorID === await doctorRepository.findDoctorIdByPrescriptionId(pool, prescriptionId)) {
                const getCurrentStatusQuery = `SELECT nouveauStatut FROM HistoriqueStatuts WHERE IDordonnance = ${prescriptionId} ORDER BY dateStatut, IDstatut DESC LIMIT 1;`;
                const [rows] = await pool.promise().query(getCurrentStatusQuery);
                const currentStatus = rows[0].nouveauStatut;

                if (currentStatus !== "Fermée") {
                    const insertNewStatus = `INSERT INTO HistoriqueStatuts (dateStatut, nouveauStatut, IDordonnance) VALUES (NOW(), 'Fermée', ${prescriptionId});`;
                    await pool.promise().query(insertNewStatus);
                }
                return "success";
            } else {
                return "error";
            }
        } else {
            return "error";
        }
    } catch (err) {
        console.log(err);
        throw new err;
    }
}

const actualiseById = async (prescriptionId, treatmentsToActualiseIds, role, treatments, userID) => {
    const pool = utility.pool;

    if (role === 'pharma') {
        const pharmaID = await pharmaRepository.getPharmaID(pool, userID);
        if (pharmaID === await pharmaRepository.findPharmaIDByPrescriptionId(pool, prescriptionId)) {
            try {
                for (let treatmentId of treatmentsToActualiseIds) {
                    const sqlQuery = `UPDATE Traitement SET estDelivre = TRUE WHERE IDtraitement = ${treatmentId};`;
                    await pool.promise().query(sqlQuery);
                }
            } catch (err) {
                console.log(err);
                throw new err;
            }

            try {
                let newStatus = "Fermée";

                for (let i in treatments) {
                    if (!treatmentsToActualiseIds.includes(treatments[i].id) && !treatments[i].isDelivery) {
                        newStatus = "En cours";
                        break;
                    }
                }

                const insertNewStatus = `INSERT INTO HistoriqueStatuts (dateStatut, nouveauStatut, IDpharmacien, IDordonnance) VALUES (NOW(), '${newStatus}', ${pharmaID}, ${prescriptionId});`;
                await pool.promise().query(insertNewStatus);

            } catch (err) {
                console.log(err);
                throw new err;
            }
        } else {
            return "error";
        }
    } else {
        return "error";
    }
}

const checkPatientOrdo = async (pool, patientID, prescriptionID) => {
    const sqlQuery = `SELECT * FROM Ordonnance WHERE IDpatient = ${patientID} AND IDordonnance = ${prescriptionID};`;
    const [rows] = await pool.promise().query(sqlQuery);
    return rows.length !== 0;
}

exports.checkPatientOrdo = checkPatientOrdo;
exports.addPrescription = addPrescription;
exports.findById = findById;
exports.closeById = closeById;
exports.actualiseById = actualiseById;