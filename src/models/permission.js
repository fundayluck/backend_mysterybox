const mongoose = require('mongoose')

const permissionSchema = new mongoose.Schema({
    nama: {
        type: String
    }
})

mongoose.model("permission", permissionSchema)