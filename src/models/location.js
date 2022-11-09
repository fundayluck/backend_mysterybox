const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
    nama: {
        type: String
    },
    gambar: {
        type: String,
    },
    link: {
        type: String,
    },
    latitude: {
        type: String
    },
    longitude: {
        type: String
    }
})

mongoose.model("location", locationSchema)