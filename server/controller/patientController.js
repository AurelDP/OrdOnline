const patientRepository = require('../repository/patientRepository');

async function getRecord(req, res) {
    const id = req.body.id;
    let result
    try {
        result = await patientRepository.getRecord(id);
    } catch (error) {
        result = "error"
    }
    res.send({result: result});
}

module.exports = {
    getRecord
}
