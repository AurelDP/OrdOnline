const userRepository = require('../repository/userRepository');

async function login(req, res) {
    const user = req.body;
    const result = await userRepository.login(user);
    res.send({result: result});
}

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

async function saveInfo(req, res) {
    const userID = req.authUser.userID;
    const userRole = req.authUser.userRole;
    const user = req.body;
    //const result = await userRepository.saveInfo(user, userID, userRole);
    //res.send({result: result});
}

async function getInfo(req, res) {
    const userID = req.authUser.userID;
    const userRole = req.authUser.userRole;
    const result = await userRepository.getInfo(userID, userRole);
    res.send({result: result});
}

module.exports = {
    saveUser,
    login,
    saveInfo,
    getInfo
}
