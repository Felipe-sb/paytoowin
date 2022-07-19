const Product = require('../../models/Product')
const updateProductRender = async(req,res,next) =>{
    const { id } = req.params;
	try {
		const product = await Product.findById(id);
		if (!req.session.loggedIn) {
			res.render('./productsViews/updateProduct', { product, login: null,alertConfig:{alert:false} });
			return;
		}
		res.render('./productsViews/updateProduct', {
			product,
			login: { username: req.session.username, email: req.session.email },
            alertConfig:{alert:false}
		});
	} catch (error) {
		next();
	}
}
module.exports = updateProductRender;