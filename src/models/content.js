const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
    id_category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
    },
    hadiah: {
        type: String,
    },
    lokasi: {
        type: String,
    },
})

mongoose.model("content", contentSchema)