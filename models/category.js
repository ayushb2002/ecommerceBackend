const {Schema, model} = require("../db/connection") // import Schema & model
const {Item} = require('./item')
// User Schema
const CategorySchema = new Schema({
    _id: {type: String, required: true, unique: true},
    name: { type: String, required: true, unique: true},
    keywords: {type: String, default: ""}
});

CategorySchema.pre('remove', (next) => {
    Item.remove({ category: this._id }).exec();
    next();
});

// User model
const Category = model("Category", CategorySchema)

module.exports = Category