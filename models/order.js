const {
    Schema,
    model
} = require("../db/connection") 

const OrderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        item: {
            type: String,
            required: true
        },
        itemCount: {
            type: Number,
            required: true,
            default: 1
        },
        costPerItem: {
            type: Number,
            required: true
        },
        taxPerItem: {
            type: Number,
            required: true
        }
    }],
    count: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    tax: {
        type: Number,
        required: true
    },
    bill: {
        type: Number,
        required: true
    },
    address: {
        type: Schema.Types.ObjectId,
        ref: 'Address',
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    }
});

// User model
const Order = model("Order", OrderSchema);

module.exports = Order