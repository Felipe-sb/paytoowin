const Product = require('../../models/Product')
const updateProductRender = async(req,res,next) =>{
	if (!req.session.loggedIn) {
		next()
		return
	}
	const { id } = req.params;
	const product = await Product.findById(id);
	res.render('./productsViews/updateProduct', {
		product,
		login: { username: req.session.username, email: req.session.email },
        alertConfig:{alert:false}
	});
}
module.exports = updateProductRender;