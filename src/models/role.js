const mongoose = require('mongoose')

const roleSchema = new mongoose.Schema({
    nama: {
        type: String
    }

})

mongoose.model("role", roleSchema)