const {Schema, model} = require("../db/connection") // import Schema & model

// User Schema
const CategorySchema = new Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true }
});

// User model
const Category = model("Category", CategorySchema)

module.exports = Category