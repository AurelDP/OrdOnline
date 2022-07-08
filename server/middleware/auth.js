const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(401).send({
            message: "No token provided"
        });
    }
    try {
        req.authUser = jwt.verify(token, process.env.TOKEN_KEY);
    } catch (err) {
        return res.status(401).send({
            message: "Invalid token"
        });
    }
    next();
};