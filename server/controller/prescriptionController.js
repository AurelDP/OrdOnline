const prescriptionRepository = require('../repository/prescriptionRepository');
const statusesRepository = require('../repository/statusRepository');

async function add(req, res) {
    const prescription = req.body;
    const userID = req.authUser.userID;
    const userRole = req.authUser.userRole;
    let isSuccess;
    try {
        isSuccess = await prescriptionRepository.addPrescription(userID, userRole, prescription);
    } catch (error) {
        isSuccess = "error";
    }
    res.send({result: isSuccess});
}

async function findById(req, res) {
    const prescriptionId = req.params.prescriptionId;
    let result;

    try {
        result = await prescriptionRepository.findById(prescriptionId, 5);
    } catch (error) {
        result = "error";
    }
    res.send(result);
}

async function findStatusesById(req, res) {
    const prescriptionId = req.params.prescriptionId;
    let statuses;
    try {
        statuses = await statusesRepository.findByPrescriptionId(prescriptionId);
    } catch (error) {
        statuses = "error";
    }
    res.send({statuses});
}

async function closeById(req, res) {
    const prescriptionId = req.params.prescriptionId;
    let isSuccess;
    try {
        isSuccess = await prescriptionRepository.closeById(prescriptionId);
    } catch (error) {
        isSuccess = "error";
    }
    res.send({result: isSuccess});
}

async function actualiseById(req, res) {
    const treatmentId = req.params.treatmentId;
    let isSuccess;
    try {
        isSuccess = await prescriptionRepository.actualiseById(treatmentId);
    } catch (error) {
        isSuccess = "error";
    }
    res.send({result: isSuccess});
}

module.exports = {
    add,
    findById,
    findStatusesById,
    closeById,
    actualiseById
}