const home = require('../repository/home');

async function getTitle(req, res) {
    const email = req.body;

    const title = await home.getTitle(email);
    res.send({result: title});
}

module.exports = {
    getTitle
}