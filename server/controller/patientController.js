const patientRepository = require('../repository/patientRepository');

async function getRecord(req, res) {
    const id = req.body.idPatientAccount;
    const role = req.authUser.userRole;
    let result
    try {
        result = await patientRepository.getRecord(id, role);
    } catch (error) {
        result = "error"
    }
    res.send({result: result});
}

async function getPrescriptions(req, res) {
    const patientAccountID = req.body.idPatientAccount;
    const userRole = req.authUser.userRole;
    const userID = req.authUser.userID;
    let result
    try {
        result = await patientRepository.getPrescriptions(patientAccountID, userRole, userID);
    } catch (error) {
        result = "error"
    }
    res.send({result: result});
}

async function getPharmas(req, res) {
    const userRole = req.authUser.userRole;
    const userID = req.authUser.userID;
    let result
    try {
        result = await patientRepository.getPharmas(userRole, userID);
    } catch (error) {
        result = "error"
    }
    res.send({result: result});
}

module.exports = {
    getRecord,
    getPrescriptions,
    getPharmas
}
