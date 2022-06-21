const getPgClient = require('./connectServer');

const tryToConnect = () => {
    const newClient = getPgClient();
    newClient.connect();

    return newClient;
};

module.exports = {
    tryToConnect
}