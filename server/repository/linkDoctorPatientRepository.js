async function isPatientOfDoctor(pool, doctorId, patientId) {
    let query = `SELECT * FROM LiaisonMedecinPatient WHERE IDmedecin = ${doctorId} AND IDpatient = ${patientId};`;
    let [result] = await pool.promise().query(query);
    return result.length > 0;
}

exports.isPatientOfDoctor = isPatientOfDoctor;