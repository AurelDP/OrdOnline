const prescriptionRepository = require('../repository/prescriptionRepository');
const statusesRepository = require('../repository/statusRepository');

async function add(req, res) {
    const prescription = req.body
    let isSuccess;
    try {
        isSuccess = await prescriptionRepository.addPrescription(prescription);
    } catch (error) {
        isSuccess = "error";
    }
    res.send({result: isSuccess});
}

async function findById(req, res) {
    const prescriptionId = req.params.prescriptionId;
    let prescription;
    try {
        prescription = await prescriptionRepository.findById(prescriptionId);
    } catch (error) {
        prescription = "error";
    }
    res.send({result: prescription});
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

module.exports = {
    add,
    findById,
    findStatusesById
}