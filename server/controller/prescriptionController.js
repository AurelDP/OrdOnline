const prescriptionRepository = require('../repository/prescriptionRepository');

async function add(req, res) {
    const conseilsMedicaux = req.body.medicalAdvices;
    const IDmedecin = req.body.IDmedecin;
    const IDpatient = req.body.IDpatient;
    const traitements = req.body.treatmentList;
    const result = await prescriptionRepository.add(conseilsMedicaux, IDmedecin, IDpatient, traitements);
    res.send(result);
}

module.exports = {
    add
}