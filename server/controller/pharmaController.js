const pharmaRepository = require('../repository/pharmaRepository');

async function getAllByParam(req, res) {
    const userRole = req.authUser.userRole;
    const search = req.body.search;
    const result = await pharmaRepository.getAllByParam(userRole, search);
    res.send({result: result});
}

async function addPharmaToPrescription(req, res) {
    const userRole = req.authUser.userRole;
    const userID = req.authUser.userID;
    const prescriptionID = req.body.prescriptionID;
    const pharmaID = req.body.pharmaID;
    const result = await pharmaRepository.addPharmaToPrescription(userRole, userID, prescriptionID, pharmaID);
    res.send({result: result});
}

module.exports = {
    getAllByParam,
    addPharmaToPrescription,
}
