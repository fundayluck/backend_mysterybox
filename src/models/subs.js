const mongoose = require('mongoose')

const subsSchema = new mongoose.Schema({
    email: {
        type: String
    }

})

mongoose.model("subs", subsSchema)