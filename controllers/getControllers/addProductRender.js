const addProductRender = (req,res,next) =>{
    if (req.session.loggedIn) {
		const { username, email } = req.session;
		res.render('./productsViews/addProduct', {
			login: { username, email },
            alertConfig:{alert:false}
		});
		return;
	}
	next()
}
module.exports = addProductRender