const Product = require('../../models/Product');
const getProductById = async (req, res, next) => {
	const { id } = req.params;
	try {
		const product = await Product.findById(id);
		if (!req.session.loggedIn) {
			res.render('./productsViews/product', { product, login: null });
			return;
		}
		res.render('./productsViews/product', {
			product,
			login: { username: req.session.username, email: req.session.email },
		});
	} catch (error) {
		next();
	}
};
module.exports = getProductById;
