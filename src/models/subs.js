const mongoose = require('mongoose')

const subsSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    }

})

mongoose.model("subs", subsSchema)