const mongoose = require("mongoose")
const User = mongoose.model('user')
const Category = mongoose.model('category')
const Content = mongoose.model("content")

module.exports = {
    editStatus: async (req, res, next) => {
        const { show } = req.body
        try {
            await Content.updateOne(
                { _id: req.params.contentId },
                {
                    show,
                },
            )
            res.send({
                status: 200,
                message: 'berhasil diubah'
            })
        } catch (err) {
            res.status(422).send(err.message)
        }
    },
    createContent: async (req, res, next) => {
        const { nama, namaBarang, lokasi, desc } = req.body
        const findUser = await User.findById(req.body.id_user)
        const findCategory = await Category.findById(req.body.id_category)
        try {

            const content = new Content({
                id_user: findUser,
                id_category: findCategory,
                gambar: req.file.path,
                desc,
                nama,
                namaBarang,
                lokasi,
                show: 'false',
            })
            await content.save()
            res.status(201).json(content)
        } catch (err) {
            res.status(422).send(err.message)
        }
    },
    deleteContent: async (req, res, next) => {
        try {
            const content = await Content.deleteOne({ _id: req.params.ContentId })
            if (content.deletedCount === 1) {
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
    },
    getContent: async (req, res, next) => {
        try {
            const content = await Content.find({}).populate('id_category').populate('id_user')
            res.send({
                status: 'success',
                data: content
            })
        } catch (err) {
            res.send({
                status: 'failed',
                error: err.message
            })
        }
    },
    getContentById: async (req, res, next) => {
        try {
            const content = await Content.findOne({ _id: req.params.contentId })
                .populate('id_category')
                .populate('id_user')
            res.json(content)
        } catch (err) {
            res.send(err.message)
        }
    },
    editContent: async (req, res, next) => {
        const { desc, id_user } = req.body
        try {
            await Content.findOneAndUpdate(
                { _id: req.params.contentId },
                {
                    id_user,
                    desc,
                    updateAt: new Date()
                })
            res.send({
                status: 200,
                message: 'berhasil diubah'
            })
        } catch (err) {
            res.status(422).send(err.message)
        }
    },
    createYoutube: async (req, res, next) => {
        const { desc } = req.body
        const findUser = await User.findById(req.body.id_user)
        const findCategory = await Category.findById(req.body.id_category)
        try {
            const content = new Content({
                id_user: findUser,
                id_category: findCategory,
                desc,
            })
            await content.save()
            res.status(201).json(content)
        } catch (error) {
            res.status(422).send(err.message)
        }
    }
}