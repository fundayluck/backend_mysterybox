const mongoose = require('mongoose')

const roleHasPermissionSchema = new mongoose.Schema({
    id_role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "role",
    },
    id_permissiom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "permission",
    },
})

mongoose.model("role_Has_Permission", roleHasPermissionSchema)