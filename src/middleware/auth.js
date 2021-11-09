const jwt = require("jsonwebtoken");
const key = process.env.JWT_KEY;
const secured = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        jwt.verify(authorization, key, (err, decoded) => {
            if (err) {
                return res.json({ ok: false, mensaje: "Token inválido" });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } catch (e) {
        console.error(e);
        res.status(401).json({ ok: false, message: "Unauthorized" });
    }
};
module.exports = { secured };
