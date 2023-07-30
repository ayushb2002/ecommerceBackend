const {Schema, model} = require("../db/connection") // import Schema & model

// User Schema
const ItemSchema = new Schema({
    _id: {type: String, required: true, unique: true},
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
});

// User model
const Item = model("Item", ItemSchema)

module.exports = Item