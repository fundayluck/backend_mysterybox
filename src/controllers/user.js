const mongoose = require("mongoose")
const Admin = mongoose.model("user")
const Role = mongoose.model("role")
const jwt = require("jsonwebtoken")

module.exports = {
    user: async (req, res) => {
        const { username, password, last_login } = req.body;

        if (!username || !password) {
            return res
                .status(421)
                .send({ error: "username and password are required" });
        }

        const admin = await Admin.findOne({ username })

        if (!admin) {
            return res.status(422).send({ error: "invali password or email" });
        }
        try {
            await Admin.findOneAndUpdate({ username }, { last_login })
            await admin.comparePassword(password);
            const token = jwt.sign({ adminId: admin._id }, "MY_SECRET_KEY");
            res.send({ token, admin });
        } catch (err) {
            return res.status(422).send({ error: "invalid password or email" });
        }
    },
    createUser: async (req, res) => {
        const { username, password } = req.body
        const findRole = await Role.findById(req.body.id_role)
        try {
            const admin = new Admin({
                id_role: findRole,
                username,
                password,
                last_login: '',
            })
            await admin.save()

            // const token = jwt.sign({ adminId: admin._id }, 'MY_SECRET_KEY')
            res.status(200).send('user dibuat')
        } catch (err) {
            res.status(422).send(err.message)
        }
    },
    deleteUser: async (req, res) => {
        try {
            const admin = await Admin.deleteOne({ _id: req.params.adminId })
            res.json(admin)
        } catch {
            res.json({ message: 'Error' })
        }
    },
    getAllUser: async (req, res, next) => {
        try {
            const user = await Admin.find({}).populate('id_role')
            res.send({
                status: 'success',
                data: user
            })
        } catch (err) {
            res.send({
                status: 'failed',
                error: err.message
            })
        }
    },
    getAllById: async (req, res, next) => {
        try {
            // const content = await Category.findOne({ _id: req.params.categoryId })
            const user = await Admin.findOne({ _id: req.params.userId }).populate('id_role')
            res.send({
                status: 'success',
                data: user
            })
        } catch (err) {
            res.send({
                status: 'failed',
                error: err.message
            })
        }
    },
}