const utility = require("../utility/index");
const accountRepository = require("../repository/accountRepository");
const addressRepository = require("../repository/addressRepository");
const patientRepository = require("../repository/patientRepository");
const doctorRepository = require("../repository/doctorRepository");
const pharmaRepository = require("../repository/pharmaRepository");
const healthServiceRepository = require("../repository/healthServiceRepository");
const globalMethods = require("../methods/globalMethods");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

async function findRole(id) {
    const pool = utility.pool;

    try {
        const isPatient = await patientRepository.find(pool, id);
        const isDoctor = await doctorRepository.find(pool, id);
        const isPharma = await pharmaRepository.find(pool, id);
        const isHealthService = await healthServiceRepository.find(pool, id);

        if (isPatient[0].length !== 0)
            return "patient";
        if (isDoctor[0].length !== 0)
            return "doctor";
        if (isPharma[0].length !== 0)
            return "pharma";
        if (isHealthService[0].length !== 0)
            return "healthService";

    } catch (error) {
        console.log(error);
        return "error";
    }
}

const register = async user => {
    const pool = utility.pool;
    const passwordHash = await bcrypt.hash(user.password, 10);

    user.streetName = globalMethods.upperFirstLetterOfWords(user.streetName.replace("'", "\\'"));
    user.city = globalMethods.upperFirstLetterOfWords(user.city.replace("'", "\\'"));
    user.domain = globalMethods.upperFirstLetterOfWords(user.domain.replace("'", "\\'"));
    user.namePharma = globalMethods.upperFirstLetterOfWords(user.namePharma.replace("'", "\\'"));
    user.email = user.email.toLowerCase();

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
        const loginQuery = `SELECT * FROM Compte WHERE mailCompte = '${user.email.toLowerCase()}'`;
        const promise = pool.promise();
        const [rows] = await promise.query(loginQuery);

        if (rows.length === 0) {
            return 'Invalid email or password';
        } else {
            const valid = await bcrypt.compare(user.password, rows[0].motDePasseCompte);

            const userInfo = {};
            userInfo.Role = await findRole(rows[0].IDcompte);
            userInfo.WebToken = jwt.sign(
                {
                    userID: rows[0].IDcompte,
                    userRole: userInfo.Role
                },
                process.env.TOKEN_KEY,
                {expiresIn: '2h'}
            );

            if (valid)
                return userInfo;
            else
                return 'Invalid email or password';
        }
    } catch (error) {
        console.log(error);
        return "error";
    }
}

const getInfo = async (id, role) => {
    const pool = utility.pool;

    try {
        const phone = await getPhoneNumber(pool, id);
        let user = {};
        let temp;
        let address;
        switch (role) {
            case "patient":
                temp = await patientRepository.find(pool, id);
                address = await addressRepository.getInfo(pool, id, role);
                user.phoneNumber = phone.telCompte;
                user.streetNumber = address[0][0].numeroAdresse;
                user.streetName = address[0][0].rueAdresse;
                user.postalCode = address[0][0].codePostal;
                user.city = address[0][0].communeAdresse;
                user.weight = temp[0][0].poids;
                user.securityNumber = temp[0][0].numeroSecu;
                user.birthDate = globalMethods.convertFromMySQLDate(temp[0][0].dateDeNaissance);
                user.name = temp[0][0].nomPatient + " " + temp[0][0].prenomPatient;
                return user;
            case "doctor":
                temp = await doctorRepository.find(pool, id);
                address = await addressRepository.getInfo(pool, id, role);
                user.phoneNumber = phone.telCompte;
                user.streetNumber = address[0][0].numeroAdresse;
                user.streetName = address[0][0].rueAdresse;
                user.postalCode = address[0][0].codePostal;
                user.city = address[0][0].communeAdresse;
                user.rppsNumber = temp[0][0].numeroRPPSmedecin;
                user.domain = temp[0][0].domaineMedecin;
                user.name = temp[0][0].nomMedecin + " " + temp[0][0].prenomMedecin;
                return user;
            case "pharma":
                temp = await pharmaRepository.find(pool, id);
                address = await addressRepository.getInfo(pool, id, role);
                user.phoneNumber = phone.telCompte;
                user.streetNumber = address[0][0].numeroAdresse;
                user.streetName = address[0][0].rueAdresse;
                user.postalCode = address[0][0].codePostal;
                user.city = address[0][0].communeAdresse;
                user.rppsNumber = temp[0][0].numeroRPPSpharmacien;
                user.name = temp[0][0].nomPharmacie;
                return user;
            case "healthService":
                temp = await healthServiceRepository.find(pool, id);
                user.rppsNumber = temp[0][0].numeroRPPSsante;
                user.phoneNumber = phone.telCompte;
                user.name = temp[0][0].nomSante + " " + temp[0][0].prenomSante;
                return user;
        }
    } catch (error) {
        console.log(error);
        return "error";
    }
}

const saveInfo = async (user, id, role) => {
    const pool = utility.pool;

    if (user.streetName !== undefined)
        user.streetName = globalMethods.upperFirstLetterOfWords(user.streetName.replace("'", "\\'"));
    if (user.city !== undefined)
        user.city = globalMethods.upperFirstLetterOfWords(user.city.replace("'", "\\'"));
    if (user.domain !== undefined)
        user.domain = globalMethods.upperFirstLetterOfWords(user.domain.replace("'", "\\'"));
    if (user.namePharma !== undefined)
        user.namePharma = globalMethods.upperFirstLetterOfWords(user.namePharma.replace("'", "\\'"));
    if (user.birthDate !== undefined)
        user.birthDate = globalMethods.convertToMySQLDate(user.birthDate);

    if (user.weight === undefined || user.weight === "")
        user.weight = null;
    if (user.birthDate === undefined || user.weight === "")
        user.birthDate = null;

    try {
        let passwordHash = '';
        if (user.password !== '')
            passwordHash = await bcrypt.hash(user.password, 10);

        const updatePhoneResult = await accountRepository.updatePhoneNumber(pool, id, user.phoneNumber);
        if (updatePhoneResult === "phoneNumberAlreadyExists")
            return "phoneNumberAlreadyExists";

        if (passwordHash !== '')
            await accountRepository.updatePassword(pool, id, passwordHash);

        let getAddressResult;

        switch (role) {
            case "patient":
                await patientRepository.update(pool, id, user.weight, user.securityNumber, user.birthDate);
                getAddressResult = await patientRepository.getAddressID(pool, id);
                await addressRepository.update(pool, getAddressResult[0][0].IDadresse, user.streetNumber, user.streetName, user.postalCode, user.city);
                break;
            case "doctor":
                await doctorRepository.update(pool, id, user.rppsNumber, user.domain);
                getAddressResult = await doctorRepository.getAddressID(pool, id);
                await addressRepository.update(pool, getAddressResult[0][0].IDadresse, user.streetNumber, user.streetName, user.postalCode, user.city);
                break;
            case "pharma":
                await pharmaRepository.update(pool, id, user.rppsNumber);
                getAddressResult = await pharmaRepository.getAddressID(pool, id);
                await addressRepository.update(pool, getAddressResult[0][0].IDadresse, user.streetNumber, user.streetName, user.postalCode, user.city);
                break;
            case "healthService":
                await healthServiceRepository.update(pool, id, user.rppsNumber);
                break;
        }
        return "success";
    } catch (error) {
        console.log(error);
        return "error";
    }
}

const getPhoneNumber = async (pool, id) => {
    const phoneNumberQuery = `SELECT telCompte FROM Compte WHERE IDcompte = ${id}`;
    const promise = pool.promise();
    const [rows] = await promise.query(phoneNumberQuery);
    return rows[0];
}

module.exports = {
    register,
    login,
    findRole,
    getInfo,
    saveInfo
}