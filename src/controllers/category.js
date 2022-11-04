const mongoose = require("mongoose")
const Category = mongoose.model('category')

module.exports = {
    createCategory : async (req, res) => {
        const { category } = req.body
        try{
            const categoryCreate = new Category({
                category,
            })
            await categoryCreate.save()
            res.status(201).json(categoryCreate)
        }catch(e){
            console.log(e);
        }
        
    },
    getCategory: async (req, res) => {
        try {
            const content = await Category.find()
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
    getCategoryById: async (req, res) => {
        try {
            const content = await Category.findOne({ _id: req.params.categoryId })
            res.json(content)
        } catch (err) {
            res.send(err.message)
        }
    },

}