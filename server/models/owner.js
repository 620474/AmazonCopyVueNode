const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const OwnerSchema = new Schema({
    name: String,
    about: String,
    photo: String
});

let Owner = mongoose.model('Owner', OwnerSchema);

module.exports = Owner;
