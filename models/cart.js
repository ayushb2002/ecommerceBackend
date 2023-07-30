const {
    Schema,
    model
} = require("../db/connection")

const CartSchema = new Schema({
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
        }
    }],
    count: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
})

CartSchema.methods.deleteItemById = function (itemIdToDelete) {
    var itemIndexToDelete = -1;
    var i = 0;
    this.items.forEach(itm => {
        if (itm.item == itemIdToDelete) {
            itemIndexToDelete = i;
        } else {
            i++;
        }
    });

    if (itemIndexToDelete !== -1) {
        this.items.splice(itemIndexToDelete, 1);
    }

    this.count = this.items.reduce((total, item) => total + item.itemCount, 0);
    this.amount = this.items.reduce((total, item) => total + item.itemCount * item.costPerItem, 0);

    return this.save();
};

const Cart = model("Cart", CartSchema);

module.exports = Cart