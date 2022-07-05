async function save(pool, name, rppsNumber, addressId, accountId) {
    const insertUserQuery = `INSERT INTO Pharmacie (nomPharmacie, numeroRPPSpharmacien, IDadresse, IDcompte)
                             VALUES ('${name}', '${rppsNumber}', ${addressId}, ${accountId})`;
    return await pool.promise().query(insertUserQuery);
}

async function find(pool, id) {
    const query = `SELECT * FROM Pharmacie WHERE ('${id}' = IDcompte);`;
    return await pool.promise().query(query);
}

async function getAddressID(pool, id) {
    const query = `SELECT IDadresse FROM Pharmacie WHERE IDcompte = '${id}'`;
    return await pool.promise().query(query);
}

async function update(pool, id, rppsNumber) {
    const query = `UPDATE Pharmacie SET numeroRPPSpharmacien = '${rppsNumber}' WHERE IDcompte = '${id}'`;
    return await pool.promise().query(query);
}

module.exports = {
    save,
    find,
    getAddressID,
    update
}