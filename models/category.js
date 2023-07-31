const {Schema, model} = require("../db/connection") 
const { Item } = require('../models/item')

const CategorySchema = new Schema({
    _id: { type: String, required: true, unique: true },
    type: {type: String, required: true, enum: ["product", "service"]},
    name: { type: String, required: true, unique: true},
    keywords: {type: String, default: ""}
});

const Category = model("Category", CategorySchema);

module.exports = Category