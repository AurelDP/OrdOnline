const utility = require('../utility/index');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();


const login = async user => {
    const pool = utility.pool;

    try {
        const loginQuery = `SELECT * FROM Compte WHERE mailCompte = '${user.email}'`;
        const promise = pool.promise();
        const [rows] = await promise.query(loginQuery);

        if (rows.length === 0) {
            return 'Invalid email or password';
        } else {
            const valid = await bcrypt.compare(user.password, rows[0].motDePasseCompte);
            if (valid) {
                return "success";
            } else {
                return 'Invalid email or password';
            }
        }
    } catch (error) {
        throw error;
    }
}

module.exports = {
    login
}
