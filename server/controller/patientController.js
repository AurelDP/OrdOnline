const patientRepository = require('../repository/patientRepository');

async function getRecord(req, res) {
    const id = req.body.patientID;
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
    const patientID = req.body.patientID;
    const userRole = req.authUser.userRole;
    const userID = req.authUser.userID;
    let result
    try {
        result = await patientRepository.getPrescriptions(patientID, userRole, userID);
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

async function getAllByParam(req, res) {
    const userRole = req.authUser.userRole;
    const search = req.body.search;
    const result = await patientRepository.getAllByParam(userRole, search);
    res.send({result: result});
}

async function addPatientToDoctor(req, res) {
    const patientID = req.body.patientID;
    const userID = req.authUser.userID;
    const userRole = req.authUser.userRole;
    const result = await patientRepository.addPatientToDoctor(patientID, userID, userRole);
    res.send({result: result});
}

module.exports = {
    getRecord,
    getPrescriptions,
    getPharmas,
    getAllByParam,
    addPatientToDoctor
}
