const mongoose = require("mongoose")
const Category = mongoose.model('category')
const Content = mongoose.model("content")

module.exports = {
    createContent: async (req, res) => {
        const { nameProd, name, hadiah, lokasi } = req.body
        const findCategory = await Category.findById(req.body.id_category)
        try {
            const content = new Content({
                id_category: findCategory,
                image: req.file.path,
                nameProd,
                name,
                hadiah,
                lokasi,
            })
            await content.save()
            res.send({
                status: 'success',
                message: 'data berhasil disimpan'
            })
        } catch (err) {
            res.status(422).send(err)
        }
    },
    deleteContent: async (req, res) => {
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
    getContent: async (req, res) => {
        try {
            const content = await Content.find({}).populate('id_category')
            res.send({
                status: 'true',
                data: content
            })
        } catch (err) {
            res.send({
                status: 'false',
                error: err.message
            })
        }
    },
}