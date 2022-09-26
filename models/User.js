const { Schema, model } = require('mongoose');
const userSchema = new Schema({
	username: String,
	email: String,
	password: String,
	createDate:String,
	rol:String,
	banned:Boolean
});
const User = model('User', userSchema);
module.exports = User;
