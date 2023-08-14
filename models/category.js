const {Schema, model} = require("../db/connection") 
const { Item } = require('../models/item')

const CategorySchema = new Schema({
    _id: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true},
    keywords: {type: String, default: ""}
});

const Category = model("Category", CategorySchema);

module.exports = Category