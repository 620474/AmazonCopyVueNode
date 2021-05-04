const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const AddressSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "user"},
    country: String,
    fullName: String,
    streetAddress: String,
    city: String,
    state: String,
    zipCode: Number,
    phoneNumber: Number,
    deliverInstructions: String,
    securityCode: String
});

let Address = mongoose.model('Address', AddressSchema);

module.exports = Address;
