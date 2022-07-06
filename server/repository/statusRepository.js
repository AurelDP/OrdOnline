const utility = require("../utility");

const findByPrescriptionId= async (prescriptionId) => {
    const pool = utility.pool;

    try {
        const sqlQuery2 = `SELECT * FROM HistoriqueStatuts WHERE HistoriqueStatuts.IDordonnance = ${prescriptionId} ORDER BY HistoriqueStatuts.IDstatut DESC;`;
        const [rows2] = await pool.promise().query(sqlQuery2);
        const statuses = [];

        for (const row in rows2) {
            statuses.push({"date": rows2[row].dateStatut, "status": rows2[row].nouveauStatut, "pharma": rows2[row].IDpharmacien === null ? "Aucune" : rows2[row].IDpharmacien});
        }

        return statuses;
    } catch (err) {
        console.log(err);
        throw new err;
    }
}

module.exports = {
    findByPrescriptionId
}
