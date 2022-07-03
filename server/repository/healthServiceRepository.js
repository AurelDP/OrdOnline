async function save(pool, lastName, firstName, rppsNumber, accountId) {
    const insertUserQuery = `INSERT INTO ServiceDeSante (nomSante, prenomSante, numeroRPPSsante, IDcompte)
                             VALUES ('${lastName}', '${firstName}', '${rppsNumber}', ${accountId})`;
    return await pool.promise().query(insertUserQuery);
}

module.exports = {
    save
}