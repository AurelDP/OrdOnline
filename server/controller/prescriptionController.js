const prescriptionRepository = require('../repository/prescriptionRepository');

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

module.exports = {
    add
}