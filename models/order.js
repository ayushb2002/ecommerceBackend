const {
    Schema,
    model
} = require("../db/connection") // import Schema & model

// User Schema
const OrderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        item: {
            type: Schema.Types.ObjectId,
            ref: 'Item'
        },
        count: {
            type: Number,
            required: true,
            default: 1
        },
        cost: {
            type: Number,
            required: true
        }
    },],
    count: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    placed: {
        type: Date,
        required: true
    },
    payment: {
        type: String,
        required: true
    }
});

// User model
const Order = model("Order", OrderSchema);

module.exports = Order