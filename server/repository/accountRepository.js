async function save(pool, email, phoneNumber, passwordHash) {
    const insertAccountQuery = `INSERT INTO Compte (mailCompte, telCompte, motDePasseCompte) VALUES ('${email}', '${phoneNumber}', '${passwordHash}')`;
    return await pool.promise().query(insertAccountQuery);
}

module.exports = {
    save
}
