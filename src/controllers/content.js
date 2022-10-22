const mongoose = require("mongoose")
const Category = mongoose.model('category')
const Content = mongoose.model("content")
const { validationResult } = require('express-validator')

module.exports = {
    createContent: async (req, res, next) => {
        const { name, hadiah, lokasi } = req.body
        const findCategory = await Category.findById(req.body.id_category)

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            const err = new Error('invalid Value')
            err.errorStatus = 400
            err.data = errors.array()
            throw err;
        }

        const content = new Content({
            id_category: findCategory,
            image: req.file.path,
            name,
            hadiah,
            lokasi,
        })
        await content.save()
        res.status(201).json(content)
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
            const content = await Content.find({}).populate('id_category')
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
}