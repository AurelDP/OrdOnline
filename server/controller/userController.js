const userRepository = require('../repository/userRepository');

async function login(req, res) {
    const user = req.body;
    const result = await userRepository.login(user);
    res.send({result: result});
}

module.exports = {
    login
}
