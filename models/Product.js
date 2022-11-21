const { Schema, model } = require('mongoose');
const productSchema = new Schema({
	title: String,
	game: String,
	level: Number,
	images:[
		{
			url:String,
			originalname:String,
			public_id:String,
		}
	],
	description: String,
	price: Number,
	partialDelete: Boolean,
	verified: Boolean,
	sold:Boolean,
	gameType: String,
	developer: String,
	owner: [{
		type:Schema.Types.ObjectId,
		ref:'User'
	}],
	clicks:Number,
	username:String,
	password:String,
	email:String,
});
const Product = model('Product', productSchema);
module.exports = Product;
