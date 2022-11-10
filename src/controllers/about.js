const mongoose = require("mongoose")
const Aboutus = mongoose.model('aboutus')
const User = mongoose.model('user')

module.exports = {
    edit: async (req, res, next) => {
        const { about, vision, mission } = req.body
        try {
            await Aboutus.updateOne(
                { _id: req.params.AboutusId },
                {
                    about,
                    vision,
                    mission,
                    updateAt: new Date()
                }
            )
            res.send({
                status: 200,
                message: 'berhasil diubah'
            })
        } catch (error) {
            res.status(422).send(error.message)
        }
    },
    create: async (req, res, next) => {
        const { about, vision, mission } = req.body
        const findUser = await User.findById(req.body.id_user)

        try {
            const aboutus = new Aboutus({
                id_user: findUser,
                about,
                vision,
                mission
            })
            await aboutus.save()
            res.status(201).json(aboutus)
        } catch (error) {
            res.status(422).send(error.message)
        }
    },
    get: async (req, res, next) => {
        try {
            const aboutus = await Aboutus.find({}).populate('id_user')
            res.send({
                status: 'success',
                data: aboutus
            })
        } catch (error) {
            res.send({
                status: 'failed',
                error: error.message
            })
        }
    }
}