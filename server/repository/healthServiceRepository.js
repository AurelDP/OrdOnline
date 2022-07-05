async function save(pool, lastName, firstName, rppsNumber, accountId) {
    const insertUserQuery = `INSERT INTO ServiceDeSante (nomSante, prenomSante, numeroRPPSsante, IDcompte)
                             VALUES ('${lastName}', '${firstName}', '${rppsNumber}', ${accountId})`;
    return await pool.promise().query(insertUserQuery);
}

async function find(pool, id) {
    const query = `SELECT * FROM ServiceDeSante WHERE ('${id}' = IDcompte);`;
    return await pool.promise().query(query);
}

async function update(pool, id, rppsNumber) {
    const query = `UPDATE ServiceDeSante SET numeroRPPSsante = '${rppsNumber}' WHERE IDcompte = '${id}'`;
    return await pool.promise().query(query);
}

module.exports = {
    save,
    find,
    update
}