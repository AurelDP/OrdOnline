async function save(pool, name, rppsNumber, addressId, accountId) {
    const insertUserQuery = `INSERT INTO Pharmacie (nomPharmacie, numeroRPPSpharmacien, IDadresse, IDcompte)
                             VALUES ('${name}', '${rppsNumber}', ${addressId}, ${accountId})`;
    return await pool.promise().query(insertUserQuery);
}

module.exports = {
    save
}