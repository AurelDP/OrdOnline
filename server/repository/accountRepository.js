async function save(pool, email, phoneNumber, passwordHash) {
    const insertAccountQuery = `INSERT INTO Compte (mailCompte, telCompte, motDePasseCompte) VALUES ('${email}', '${phoneNumber}', '${passwordHash}')`;
    return await pool.promise().query(insertAccountQuery);
}

async function updatePhoneNumber(pool, id, phoneNumber) {
    const checkPhoneNumberQuery = `SELECT * FROM Compte WHERE telCompte = '${phoneNumber}'`;
    const result = await pool.promise().query(checkPhoneNumberQuery);
    if (result[0].length > 0 && result[0][0].IDcompte !== id)
        return "phoneNumberAlreadyExists";

    if (result[0].length === 0) {
        const updatePhoneNumberQuery = `UPDATE Compte SET telCompte = '${phoneNumber}' WHERE idCompte = '${id}'`;
        return await pool.promise().query(updatePhoneNumberQuery);
    }
}

async function updatePassword(pool, id, passwordHash) {
    const updatePasswordQuery = `UPDATE Compte SET motDePasseCompte = '${passwordHash}' WHERE idCompte = '${id}'`;
    return await pool.promise().query(updatePasswordQuery);
}

module.exports = {
    save,
    updatePhoneNumber,
    updatePassword
}
