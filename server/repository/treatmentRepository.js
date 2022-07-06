const utility = require("../utility");
const { secureApostrophes } = require("../methods/globalMethods");

const add = async (pool, treatments, prescriptionId) => {
    for (let i = 0; i < treatments.length; i++) {
        if (treatments[i].name !== "" && treatments[i].name !== null)
            treatments[i].name = secureApostrophes(treatments[i].name);
        if (treatments[i].description !== "" && treatments[i].description !== null)
            treatments[i].description = secureApostrophes(treatments[i].description);
        if (treatments[i].renewal !== "" && treatments[i].renewal !== null)
            treatments[i].renewal = secureApostrophes(treatments[i].renewal);

        const sqlQuery = `INSERT INTO Traitement (nomMedicament, descriptionTraitement, substituable, remboursable, modalitesRenouvellement, estDelivre, IDordonnance)
                       VALUES('${treatments[i].name}', '${treatments[i].description}', ${treatments[i].isSubstitutable}, ${treatments[i].isReimbursable} , '${treatments[i].renewal}', ${treatments[i].isDelivered}, ${prescriptionId});`;
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
            treatments.push({"id": rows[row].IDtraitement,"name": rows[row].nomMedicament, "description": rows[row].descriptionTraitement, "substitutable": rows[row].substituable, "reimbursable": rows[row].remboursable, "renew": rows[row].modaliteRenouvellement, "isDelivery": rows[row].estDelivre === 1});
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