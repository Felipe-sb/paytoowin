const { Schema, model } = require('mongoose');
const productSchema = new Schema({
	title: String,
	game: String,
	level: Number,
	images:Array,
	description: String,
	price: Number,
	partialDelete: Boolean,
	verified: Boolean,
});
const Product = model('Product', productSchema);
module.exports = Product;
