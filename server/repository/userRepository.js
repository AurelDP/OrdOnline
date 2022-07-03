const utility = require('../utility/index');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();


const login = async user => {
    const pool = utility.pool;
    const passwordHash = await bcrypt.hash(user.password, 10);

    try {
        const loginQuery = `SELECT * FROM Compte WHERE mailCompte = '${user.email}'`;
        const promise = pool.promise();
        const [rows] = await promise.query(loginQuery);

        if (rows.length === 0) {
            return 'Invalid email or password';
        } else {
            bcrypt.compare(passwordHash, rows[0].motDePasseCompte, (err, result) => {
                if (result) {
                    console.log('Login successful');
                    return "success";
                } else {
                    return 'Invalid email or password';
                }
            });
        }
    } catch (error) {
        throw error;
    }
}

module.exports = {
    login
}
