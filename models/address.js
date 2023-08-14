const {
    Schema,
    model
} = require("../db/connection") // import Schema & model

const AddressSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    firstLine: {
        type: String,
        required: true
    },
    secondLine: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String, 
        required: true
    },
    pincode: {
        type: String,
        required: true
    }
})

const Address = model("Address", AddressSchema)

module.exports = Address