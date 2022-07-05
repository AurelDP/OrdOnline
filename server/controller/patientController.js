const patientRepository = require('../repository/patientRepository');

async function getRecord(req, res) {
    const idUser = req.authUser.userID;
    const result = await patientRepository.getRecord(idUser);
    res.send({result: result});
}

module.exports = {
    getRecord
}
