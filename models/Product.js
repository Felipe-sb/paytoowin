const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

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
productSchema.plugin(mongoosePaginate);

const Product = model('Product', productSchema);
module.exports = Product;
