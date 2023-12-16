const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
    },
    {timestamps: true}
)

module.exports = mongoose.model("User", UserSchema)

// {timestamps: true} => it's going to create, createdAt times and updatedAt times
