const userRepository = require('../repository/userRepository');

async function saveUser(req, res) {
    const user = req.body;
    let isSuccess;
    try {
        isSuccess = await userRepository.register(user);
    } catch (error) {
        isSuccess = "error";
    }
    res.send({result: isSuccess});
}

module.exports = {
    saveUser
}
