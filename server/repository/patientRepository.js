async function save(pool, lastName, firstName, addressId, accountId) {
    const insertUserQuery = `INSERT INTO Patient (nomPatient, prenomPatient, IDadresse, IDcompte)
                             VALUES ('${lastName}', '${firstName}', ${addressId}, ${accountId})`;
    return await pool.promise().query(insertUserQuery);
}

async function find(pool, id) {
    const query = `SELECT * FROM Patient WHERE ('${id}' = IDcompte);`;
    return await pool.promise().query(query);
}

async function update(pool, id, weight, securityNumber, birthDate) {
    if (birthDate !== null)
        birthDate = "'" + birthDate + "'";
    const query = `UPDATE Patient SET poids = ${weight}, numeroSecu = '${securityNumber}', dateDeNaissance = ${birthDate} WHERE IDcompte = '${id}'`;
    return await pool.promise().query(query);
}

async function getAddressID(pool, id) {
    const query = `SELECT IDadresse FROM Patient WHERE IDcompte = '${id}'`;
    return await pool.promise().query(query);
}

module.exports = {
    save,
    find,
    update,
    getAddressID
}