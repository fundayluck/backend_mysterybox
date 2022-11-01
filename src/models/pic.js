const mongoose = require("mongoose");

const picSchema = new mongoose.Schema({
    id_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
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