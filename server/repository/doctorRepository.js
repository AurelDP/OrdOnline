async function save(pool, lastName, firstName, domain, rppsNumber, addressId, accountId) {
    const insertUserQuery = `INSERT INTO Médecin (nomMedecin, prenomMedecin, domaineMedecin, numeroRPPSmedecin, IDadresse, IDcompte)
                             VALUES ('${lastName}', '${firstName}', '${domain}', '${rppsNumber}', ${addressId}, ${accountId})`;
    return await pool.promise().query(insertUserQuery);
}

async function find(pool, id) {
    const query = `SELECT * FROM Médecin WHERE ('${id}' = IDcompte);`;
    return await pool.promise().query(query);
}

async function getAddressID(pool, id) {
    const query = `SELECT IDadresse FROM Médecin WHERE IDcompte = '${id}'`;
    return await pool.promise().query(query);
}

async function update(pool, id, rppsNumber, domain) {
    const query = `UPDATE Médecin SET numeroRPPSmedecin = '${rppsNumber}', domaineMedecin = '${domain}' WHERE IDcompte = '${id}'`;
    return await pool.promise().query(query);
}

module.exports = {
    save,
    find,
    getAddressID,
    update
}