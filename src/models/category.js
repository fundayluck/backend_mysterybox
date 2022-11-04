const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    category: {
        type: String,
    },
})

mongoose.model("category", categorySchema)