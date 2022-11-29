const addProductRender = (req,res,next) =>{
    if (req.session.loggedIn) {
		const { username, email, rol } = req.session;
		res.status(200).render('./productsViews/addProduct', {
			login: { username, email, rol },
            alertConfig:{alert:false}
		});
		return;
	}
	next()
}
module.exports = addProductRender