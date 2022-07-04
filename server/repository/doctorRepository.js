async function save(pool, lastName, firstName, domain, rppsNumber, addressId, accountId) {
    const insertUserQuery = `INSERT INTO Médecin (nomMedecin, prenomMedecin, domaineMedecin, numeroRPPSmedecin, IDadresse, IDcompte)
                             VALUES ('${lastName}', '${firstName}', '${domain}', '${rppsNumber}', ${addressId}, ${accountId})`;
    return await pool.promise().query(insertUserQuery);
}

module.exports = {
    save
}