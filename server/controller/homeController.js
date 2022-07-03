const home = require('../repository/home');

async function getTitle(req, res) {
    const email = req.body;

    const title = await home.getTitle(email);
    res.send({result: title});
}

async function getAll(req, res) {
    const result = await home.getAll();
    res.send({result: result});
}

module.exports = {
    getTitle,
    getAll
}