const utility = require("../utility");
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

const findByPrescriptionId = async (prescriptionId) => {
    const pool = utility.pool;

    try {
        const sqlQuery = `SELECT * FROM Traitement WHERE Traitement.IDordonnance = ${prescriptionId};`;
        const [rows] = await pool.promise().query(sqlQuery);
        const treatments = [];

        for (const row in rows) {
            treatments.push({"name": rows[row].nomMedicament, "description": rows[row].descriptionTraitement, "substitutable": rows[row].substituable, "reimbursable": rows[row].remboursable, "renew": rows[row].modaliteRenouvellement, "isDelivery": rows[row].estDelivre});
        }

        return treatments;
    } catch (err) {
        console.log(err);
        throw new err;
    }
}

module.exports = {
    add,
    findByPrescriptionId
}