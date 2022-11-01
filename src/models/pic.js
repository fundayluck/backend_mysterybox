const mongoose = require("mongoose");

const picSchema = new mongoose.Schema({
    nama: {
        type: String,
    },
    brand: {
        type: String,
    },
    email: {
        type: String,
    },
    no_telp: {
        type: String,
    },
    address: {
        type: String
    }
})

mongoose.model("pic", picSchema)