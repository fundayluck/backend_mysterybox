const mongoose = require("mongoose");

const picSchema = new mongoose.Schema({
    nama: {
        type: String,
    },
    brand: {
        type: String,
    },
    category: {
        type: String
    },
    email: {
        type: String,
    },
    no_telp: {
        type: String,
    },
    address: {
        type: String
    },
    file: {
        type: String
    },
    description: {
        type: String
    }

}, { timestamps: true })

mongoose.model("pic", picSchema)