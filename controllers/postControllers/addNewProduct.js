const Product = require('../../models/Product');
const cloudinary = require('../../helpers/cloudinary');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const addNewProduct = async (title, game, level, description, price ,gameType,developer,username,password,email,owner,files) => {
	const hashPassword = await bcrypt.hash(password, 8);
	const user = await User.findOne({email:owner})
	let images = []
	for (let i = 0; i < files.length; i++){
		console.log(files[i].path);
		images[i] = await cloudinary.v2.uploader.upload(files[i].path)
	}
	images = images.map(image=>{
		return {url:image.url,originalname:image.original_filename,public_id:image.public_id}
	})
	const newProduct = new Product({
		title,
		game,
		level: Number(level),
		images,
		description,
		price: Number(price),
		partialDelete: false,
		sold:false,
		verified: false,
		gameType,
		developer,
		owner: user._id,
		clicks:0,
		username,
		password: hashPassword,
		email
	});
    const product = await newProduct.save()
	return product
};
module.exports = addNewProduct;