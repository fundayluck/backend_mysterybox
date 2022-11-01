const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    nama: {
        type: String,
    },
})

mongoose.model("category", categorySchema)