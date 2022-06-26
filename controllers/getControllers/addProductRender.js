const addProductRender = (req,res) =>{
    if (req.session.loggedIn) {
		const { username, email } = req.session;
		res.render('./productsViews/addProduct', {
			login: { username, email },
            alertConfig:{alert:false}
		});
		return;
	}
	res.render('./productsViews/addProduct',{login:null,alertConfig:{alert:false}});
}
module.exports = addProductRender