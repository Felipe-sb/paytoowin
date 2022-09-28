const cartRender = (req, res,next) => {
	if (req.session.loggedIn) {
		res.render('./commerceViews/cart', {
			login:null
		});
		return;
	}
    next();
};
module.exports = cartRender;