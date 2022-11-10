const mongoose = require("mongoose");

const aboutusSchema = new mongoose.Schema({
    id_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    about: {
        type: String
    },
    vision: {
        type: String
    },
    mission: {
        type: String
    }
}, { timestamps: true })

mongoose.model("aboutus", aboutusSchema)