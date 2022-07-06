const utility = require("../utility/index");
const treatmentRepository = require("./treatmentRepository");
const patientRepository = require("./patientRepository");
const doctorRepository = require("./doctorRepository");
const statusRepository = require("./statusRepository");
const { secureApostrophes, convertFromMySQLDate } = require("../methods/globalMethods");

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

        const patientID = await patientRepository.getPatientID(pool, prescription.idPatientAccount);
        const doctorID = await doctorRepository.getDoctorID(pool, userID);
        const [savePrescriptionResult] = await add(pool, prescription.medicalAdvices, doctorID, patientID);
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

const findById = async (prescriptionId) => {
    const pool = utility.pool;
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
}

const closeById = async (prescriptionId, role) => {
    const pool = utility.pool;

    try {
        if (role === 'doctor') {
            const getCurrentStatusQuery = `SELECT nouveauStatut FROM HistoriqueStatuts WHERE IDordonnance = ${prescriptionId} ORDER BY dateStatut, IDstatut DESC LIMIT 1;`;
            const [rows] = await pool.promise().query(getCurrentStatusQuery);
            const currentStatus = rows[0].nouveauStatut;

            if (currentStatus !== "Fermée") {
                const insertNewStatus = `INSERT INTO HistoriqueStatuts (dateStatut, nouveauStatut, IDordonnance) VALUES (NOW(), 'Fermée', ${prescriptionId});`;
                await pool.promise().query(insertNewStatus);
            }
            return "success";
        }
    } catch (err) {
        console.log(err);
        throw new err;
    }
}

const actualiseById = async (prescriptionId, treatmentsToActualiseIds, role, treatments) => {
    const pool = utility.pool;

    if (role === 'pharma') {
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
            const getCurrentStatusQuery = `SELECT nouveauStatut FROM HistoriqueStatuts WHERE IDordonnance = ${prescriptionId} ORDER BY dateStatut, IDstatut DESC LIMIT 1;`;
            const [rows] = await pool.promise().query(getCurrentStatusQuery);
            const currentStatus = rows[0].nouveauStatut;

            let newStatus = "Fermée";

            for (let i in treatments) {
                if (!treatmentsToActualiseIds.includes(treatments[i].id) && !treatments[i].isDelivery) {
                    newStatus = "En cours";
                    break;
                }
            }

            if (currentStatus !== newStatus) {
                const insertNewStatus = `INSERT INTO HistoriqueStatuts (dateStatut, nouveauStatut, IDordonnance) VALUES (NOW(), '${newStatus}', ${prescriptionId});`;
                await pool.promise().query(insertNewStatus);
            }

        } catch (err) {
            console.log(err);
            throw new err;
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

module.exports = {
    addPrescription,
    findById,
    closeById,
    actualiseById,
    checkPatientOrdo
}