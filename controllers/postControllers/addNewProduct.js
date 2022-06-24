const Product = require('../../models/Product');

const addNewProduct = (req, res) => {
	const { title, game, level, description, price } = req.body;
	const newProduct = new Product({
		title,
		game,
		level: Number(level),
		description,
		price: Number(price),
		partialDelete: false,
		verified: false,
	});
    newProduct.save()
        .then((product)=>{
            res.redirect('/products')
        })
};
module.exports = addNewProduct;