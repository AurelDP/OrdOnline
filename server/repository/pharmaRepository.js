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

async function getPharmaID(pool, id) {
    const query = `SELECT IDpharmacien FROM Pharmacie WHERE IDcompte = '${id}'`;
    const [res] = await pool.promise().query(query);
    if (res.length !== 0)
        return res[0].IDpharmacien;
    else
        return "error";
}

module.exports = {
    save,
    find,
    getAddressID,
    update,
    getPharmaID
}