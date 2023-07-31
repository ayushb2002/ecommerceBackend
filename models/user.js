const {Schema, model} = require("../db/connection") // import Schema & model

const UserSchema = new Schema({
    name: {type: String, required: true},
    username: {type: String, unique: true, required: true},
    password: { type: String, required: true },
    isAdmin: {type: Boolean, required: true, default: false}
})

const User = model("User", UserSchema)

module.exports = User