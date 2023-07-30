const {Schema, model} = require("../db/connection") // import Schema & model

// User Schema
const CartSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {type: Schema.Types.ObjectId, ref: 'Item', required: true}
    ],
    count: { type: Number, required: true },
    amount: { type: Number, required: true }
})

// User model
const Cart = model("Cart", CartSchema);

module.exports = Cart