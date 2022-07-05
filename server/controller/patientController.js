const patientRepository = require('../repository/patientRepository');

async function getRecord(req, res) {
    const id = req.body.id;
    const role = req.authUser.userRole;
    let result
    try {
        result = await patientRepository.getRecord(id, role);
    } catch (error) {
        result = "error"
    }
    res.send({result: result});
}

module.exports = {
    getRecord
}
