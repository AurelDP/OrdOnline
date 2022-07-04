const add = async (pool, treatments, prescriptionId) => {
    for (let i = 0; i < treatments.length; i++) {
        const sqlQuery = `INSERT INTO Traitement (nomMedicament, descriptionTraitement, nonSubstituable, nonRemboursable, modalitesRenouvellement, estDelivre, IDordonnance)
                       VALUES('${treatments[i].name}', '${treatments[i].description}', ${treatments[i].isSubstitutable}, ${treatments[i].isReimbursable} , ${treatments[i].renewal}, ${treatments[i].isDelivered}, ${prescriptionId});`;
        try {
            return await pool.promise().query(sqlQuery);
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = {
    add
}