const { Schema, model } = require('mongoose');
const cartSchema = new Schema({
	user: {
		username: String,
		email: String,
		password: String,
	},
	products: Array,
});
const Cart = model('Cart', cartSchema);
module.exports = Cart;
