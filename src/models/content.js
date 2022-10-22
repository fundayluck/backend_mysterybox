const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
    id_category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
    },
    image: {
        type: String,
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