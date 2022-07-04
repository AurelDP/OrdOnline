const utility = require("../utility/index");
const accountRepository = require("../repository/accountRepository");
const addressRepository = require("../repository/addressRepository");
const patientRepository = require("../repository/patientRepository");
const doctorRepository = require("../repository/doctorRepository");
const pharmaRepository = require("../repository/pharmaRepository");
const healthServiceRepository = require("../repository/healthServiceRepository");
const bcrypt = require("bcrypt");

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
            return "emailOrPhoneNumberAlreadyExists";
        }

        const saveAccountResult = await accountRepository.save(pool, user.email, user.phoneNumber, passwordHash);
        const accountId = saveAccountResult[0].insertId;
        let addressId = '';
        if (user.type !== "healthService") {
            const saveAddressResult = await addressRepository.save(pool, user.streetNumber, user.streetName, user.postalCode, user.city);
            addressId = saveAddressResult[0].insertId;
        }
        switch (user.type) {
            case "patient":
                await patientRepository.save(pool, user.lastName, user.firstName, addressId, accountId);
                break;
            case "doctor":
                await doctorRepository.save(pool, user.lastName, user.firstName, user.domain, user.rppsNumber, addressId, accountId);
                break;
            case "pharma":
                await pharmaRepository.save(pool, user.namePharma, user.rppsNumber, addressId, accountId);
                break;
            case "healthService":
                await healthServiceRepository.save(pool, user.lastName, user.firstName, user.rppsNumber, accountId);
                break;
        }
        return "success";
    } catch (error) {
        console.log(error);
        return "error";
    }
}

const login = async user => {
    const pool = utility.pool;

    try {
        const loginQuery = `SELECT * FROM Compte WHERE mailCompte = '${user.email}'`;
        const promise = pool.promise();
        const [rows] = await promise.query(loginQuery);

        if (rows.length === 0) {
            return 'Invalid email or password';
        } else {
            const valid = await bcrypt.compare(user.password, rows[0].motDePasseCompte);
            if (valid) {
                return "success";
            } else {
                return 'Invalid email or password';
            }
        }
    } catch (error) {
        throw error;
    }
}

module.exports = {
    register,
    login
}