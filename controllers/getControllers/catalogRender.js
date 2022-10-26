const Product = require('../../models/Product');

const getAllProducts = async (req, res, next) => {
    let perPage = 2;
    let page = req.params.page || 1;

	if (req.session.loggedIn) {
    Product.find({})
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec((err, products) => {
            Product.count((err, count) => {
                if (err) return next(err);
                res.render('./productsViews/catalog', {
                    products,
                    current: page,
                    pages: Math.ceil(count / perPage),
					login: {username: req.session.username},
					msg: null
				  
                });
				return
            });
        });
	
	}
};
module.exports = getAllProducts;
