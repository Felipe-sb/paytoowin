const { Schema, model } = require('mongoose');
const userSchema = new Schema({
	username: String,
	email: String,
	password: String,
	createDate:String,
	rol:String,
	banned:Boolean,
	cart:[{
		type: Schema.Types.ObjectId,
		ref: 'Product'
	}],
	oldPurchases:[{
		type: Schema.Types.ObjectId,
		ref: 'Product'
	}]
});
const User = model('User', userSchema);
module.exports = User;
