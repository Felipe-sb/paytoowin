const Product = require('../../models/Product');
const getProductById = async (id) => {
	const product = await Product.findById(id);
	product.clicks = product.clicks+1
	await product.save();
	return product
};
module.exports = getProductById;
