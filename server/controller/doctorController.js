const doctorRepository = require('../repository/doctorRepository');

async function getPatients(req, res) {
    const userRole = req.authUser.userRole;
    const userID = req.authUser.userID;
    let result
    try {
        result = await doctorRepository.getPatients(userRole, userID);
    } catch (error) {
        result = "error"
    }
    res.send({result: result});
}

module.exports = {
    getPatients,
}
