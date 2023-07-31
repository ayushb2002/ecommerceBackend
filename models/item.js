const {Schema, model} = require("../db/connection") // import Schema & model

const ItemSchema = new Schema({
    _id: {type: String, required: true, unique: true},
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    tax: {type: Number, required: true},
    category: { type: String, required: true },
});

const Item = model("Item", ItemSchema)

module.exports = Item