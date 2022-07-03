const utility = require("../utility/index");
const accountRepository = require("../repository/accountRepository");
const addressRepository = require("../repository/addressRepository");
const bcrypt = require("bcrypt");

async function save(pool, lastName, firstName, addressId, accountId) {
    const insertUserQuery = `INSERT INTO Patient (nomPatient, prenomPatient, IDadresse, IDcompte)
                             VALUES ('${lastName}', '${firstName}', '${addressId}', '${accountId}')`;
    return await pool.promise().query(insertUserQuery);
}

async function findByEmail(pool, email) {
    const findUserQuery = `SELECT * FROM Compte WHERE mailCompte = '${email}'`;
    const promisePool = pool.promise();
    const result = await promisePool.query(findUserQuery);
    return result[0];
}

async function findByPhoneNumber(pool, phoneNumber) {
    const findUserQuery = `SELECT * FROM Compte WHERE telCompte = '${phoneNumber}'`;
    const promisePool = pool.promise();
    const result = await promisePool.query(findUserQuery);
    return result[0];
}

const register = async user => {
    const pool = utility.pool;
    const passwordHash = await bcrypt.hash(user.password, 10);

    try {
        const accountsWithSameEmail = await findByEmail(pool, user.email);
        const accountsWithSamePhoneNumber = await findByPhoneNumber(pool, user.phoneNumber);
        if (accountsWithSameEmail.length > 0 || accountsWithSamePhoneNumber.length > 0) {
            return "error";
        }

        const saveAccountResult = await accountRepository.save(pool, user.email, user.phoneNumber, passwordHash);
        const accountId = saveAccountResult[0].insertId;
        const saveAddressResult = await addressRepository.save(pool, user.streetNumber, user.streetName, user.postalCode, user.city);
        const addressId = saveAddressResult[0].insertId;
        await save(pool, user.lastName, user.firstName, addressId, accountId);
        return "success";
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    register
}
