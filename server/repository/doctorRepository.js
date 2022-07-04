async function save(pool, lastName, firstName, domain, rppsNumber, addressId, accountId) {
    const insertUserQuery = `INSERT INTO Médecin (nomMedecin, prenomMedecin, domaineMedecin, numeroRPPSmedecin, IDadresse, IDcompte)
                             VALUES ('${lastName}', '${firstName}', '${domain}', '${rppsNumber}', ${addressId}, ${accountId})`;
    return await pool.promise().query(insertUserQuery);
}

async function find(pool, id) {
    const query = `SELECT * FROM Médecin WHERE ('${id}' = IDcompte);`;
    return await pool.promise().query(query);
}

module.exports = {
    save,
    find
}