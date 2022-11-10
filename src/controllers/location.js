const mongoose = require("mongoose")
const Location = mongoose.model('location')
const User = mongoose.model('user')

module.exports = {
    createLocation: async (req, res, next) => {
        const {
            nama,
            link,
            detail,
            lat,
            long
        } = req.body
        const findUser = await User.findById(req.body.id_user)
        try {
            const location = new Location({
                id_user: findUser,
                gambar: req.file.path,
                nama,
                detail,
                link,
                lat,
                long
            })
            await location.save()
            res.status(201).json(location)
        } catch (error) {
            console.log(error.message);
        }
    },
    getLocation: async (req, res, next) => {
        try {
            const location = await Location.find({}).populate('id_user')
            res.send({
                status: 'success',
                data: location
            })
        } catch (error) {
            res.send({
                status: 'failed',
                error: error.message
            })
        }
    },
    deleteLocation: async (req, res, next) => {
        try {
            const location = await Location.deleteOne({ _id: req.params.LocationId })
            if (location.deletedCount === 1) {
                res.send({
                    status: 'true',
                    message: 'data berhasil dihapus'
                })
            } else {
                res.send({
                    status: 'false',
                    message: 'data tidak ada'
                })
            }
        } catch (error) {
            res.status(422).send({
                status: 'failed',
                message: 'error'
            })
        }
    }
}