const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
    id_category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required: true
    },
    id_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    gambar: {
        type: String,
    },
    desc: {
        type: String,
    },
    nama: {
        type: String,
    },
    namaBarang: {
        type: String,
    },
    lokasi: {
        type: String,
    },
})

mongoose.model("content", contentSchema)