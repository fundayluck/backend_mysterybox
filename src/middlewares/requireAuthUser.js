const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Admin = mongoose.model("user");

module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).send({ error: "you must be log in!" });
    }

    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, "MY_SECRET_KEY", async (err, payload) => {
        if (err) {
            return res.status(401).send({ error: "you must be log in!" });
        }

        const { adminId } = payload;

        const admin = await Admin.findById(adminId);
        req.admin = admin;
        next();
    });
};