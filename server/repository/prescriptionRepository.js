const utility = require("../utility/index");
const treatmentRepository = require("./treatmentRepository");

const add = async (pool, medicalAdvices, IDmedecin, IDpatient) => {
    const dateOrdonnance = new Date().toJSON().slice(0, 10);
    const sqlQuery = `INSERT INTO Ordonnance (conseilsMedicaux, dateOrdonnance, IDmedecin, IDpatient)
                        VALUES('${medicalAdvices}', '${dateOrdonnance}', ${IDmedecin}, ${IDpatient});`;
    return await pool.promise().query(sqlQuery);
}

const addPrescription = async (prescription) => {
    const pool = utility.pool;
    console.log("Ok ?");
   /* try {
        const savePrescriptionResult = await add(pool, prescription.medicalAdvices, prescription.IDmedecin, prescription.IDpatient);
        const prescriptionId = savePrescriptionResult[0].insertId;
        await treatmentRepository.add(pool, prescription.treatments, prescriptionId);
        return "success";
    } catch (err) {
        console.log(err);
        throw new err;
    }*/
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

        const prescription = {"patient": {"lastName": rows[0].nomPatient, "firstName": rows[0].prenomPatient, "age": null, "weight": rows[0].poids}, "doctor": {"lastName": rows[0].nomMedecin, "firstName": rows[0].prenomMedecin, "address": rows[0].numeroAdresse.toString() + " " + rows[0].rueAdresse + ", " + rows[0].communeAdresse + ", " + rows[0].codePostal}, "medicalAdvices": rows[0].conseilsMedicaux, "date": rows[0].dateOrdonnance, "treatments": []};
        prescription["treatments"] = await treatmentRepository.findByPrescriptionId(prescriptionId);

        if (rows[0].dateDeNaissance !== null) {
            prescription["patient"].age = new Date().getFullYear() - (rows[0].dateDeNaissance).getFullYear();
        }

        return prescription;
    } catch (err) {
        console.log(err);
        throw new err;
    }
}

module.exports = {
    addPrescription,
    findById
}