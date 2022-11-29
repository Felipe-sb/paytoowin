const Product = require('../../models/Product')
const User = require('../../models/User')
const updateProductRender = async(req,res,next) =>{

	if (!req.session.loggedIn) {
		next()
		return
	}
	const { id } = req.params;
	const {email} = req.session;
	const product = await Product.findById(id);
	const user = await User.findOne({email})
	res.status(200).render('./productsViews/updateProduct', {
		product,
		login: { username: req.session.username, email: req.session.email, rol:req.session.rol},
        alertConfig:{alert:false},
		rol:user.rol
	});
}
module.exports = updateProductRender;