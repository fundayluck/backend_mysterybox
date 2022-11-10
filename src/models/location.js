const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
    id_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    nama: {
        type: String
    },
    gambar: {
        type: String,
    },
    detail: {
        type: String,
    },
    link: {
        type: String,
    },
    lat: {
        type: String
    },
    long: {
        type: String
    }
}, { timestamps: true })

mongoose.model("location", locationSchema)