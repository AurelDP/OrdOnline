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
    try {
        const savePrescriptionResult = await add(pool, prescription.medicalAdvices, prescription.IDmedecin, prescription.IDpatient);
        const prescriptionId = savePrescriptionResult[0].insertId;
        await treatmentRepository.add(pool, prescription.treatments, prescriptionId);
        return "success";
    } catch (err) {
        console.log(err);
        throw new err;
    }
}

module.exports = {
    addPrescription
}