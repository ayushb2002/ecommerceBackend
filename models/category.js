const {Schema, model} = require("../db/connection") // import Schema & model

// User Schema
const CategorySchema = new Schema({
    _id: {type: String, required: true, unique: true},
    name: { type: String, required: true, unique: true},
    keywords: {type: String, default: ""}
});

// User model
const Category = model("Category", CategorySchema)

module.exports = Category