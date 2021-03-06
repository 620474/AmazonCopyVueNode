const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const CategorySchema = new Schema({
    type: {type: String, unique: true, required: true}
});

let Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
