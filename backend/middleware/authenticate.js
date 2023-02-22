const JWT = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            res.status(401).send({ error: "Authorization error" });
        }

        const data = JWT.verify(token, process.env.JWT_STRING);
        req.user = data.user;

        next();
    } catch (error) {
        res.status(401).send({ error: "Authorization error" });
    }
};

module.exports = authenticate;
