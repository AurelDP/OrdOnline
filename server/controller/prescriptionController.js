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
    const userID = req.authUser.userID;
    const role = req.authUser.userRole;
    if (prescriptionId !== null) {
        let result;

        try {
            result = await prescriptionRepository.findById(prescriptionId, userID, role);
        } catch (error) {
            result = "error";
        }
        res.send(result);
    }
}

async function findStatusesById(req, res) {
    const prescriptionId = req.params.prescriptionId;
    const userID = req.authUser.userID;
    const role = req.authUser.userRole;
    if (prescriptionId) {
        let statuses;
        try {
            statuses = await statusesRepository.findByPrescriptionId(prescriptionId, userID, role);
        } catch (error) {
            statuses = "error";
        }
        res.send({statuses});
    }
}

async function closeById(req, res) {
    const prescriptionId = req.params.prescriptionId;
    const userID = req.authUser.userID;
    const role = req.authUser.userRole;
    if (prescriptionId) {
        let isSuccess;
        try {
            isSuccess = await prescriptionRepository.closeById(prescriptionId, role, userID);
        } catch (error) {
            isSuccess = "error";
        }
        res.send({result: isSuccess});
    }
}

async function actualiseTreatmentsDeliveryById(req, res) {
    const prescriptionId = req.params.prescriptionId;
    const role = req.authUser.userRole;
    const treatmentsToActualiseIds = req.body.treatmentsToActualiseIds;
    const treatments = req.body.treatments;
    const userID = req.authUser.userID;

    if (prescriptionId) {
        let isSuccess;
        try {
            isSuccess = await prescriptionRepository.actualiseById(prescriptionId, treatmentsToActualiseIds, role, treatments, userID);
        } catch (error) {
            isSuccess = "error";
        }
        res.send({result: isSuccess});
    }
}

module.exports = {
    add,
    findById,
    findStatusesById,
    closeById,
    actualiseTreatmentsDeliveryById
}