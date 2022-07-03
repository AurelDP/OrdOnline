const homeRepository = require('../repository/homeRepository');

async function getAll(req, res) {
    const result = await homeRepository.getAll();
    res.send({result: result});
}

module.exports = {
    getAll
}