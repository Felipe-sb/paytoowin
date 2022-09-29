const User = require("../../models/User");

const cartRender = async(req, res,next) => {
	if (req.session.loggedIn) {
		const user = await User.findOne({email:req.session.email}).populate('cart')
		res.render('./commerceViews/cart', {
			cart:user.cart,
			login:{username:req.session.username,email:req.session.email}
		});
		return;
	}
    next();
};
module.exports = cartRender;