const Product = require('../../models/Product');

const getAllProducts = async (req, res) => {
	const products = await Product.find();
	if (products.length === 0) {
		if (req.session.loggedIn) {
			res.render('./productsViews/catalog', {
				msg: 'Aun no se han agregado productos',
				products: null,
				login: {
					username: req.session.username,
					email: req.session.email,
				},
			});
			return;
		}
        res.render('./productsViews/catalog',{msg:'Aun no se han agregado productos',products:null,login:null})
        return
	}
	if (req.session.loggedIn) {
        res.render('./productsViews/catalog', {
            msg: null,
            products,
            login: {
                username: req.session.username,
                email: req.session.email,
            },
        });
        return;
    }
    res.render('./productsViews/catalog',{msg:null,products,login:null})
};
module.exports = getAllProducts;
