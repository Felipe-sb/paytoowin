const Product = require("../../models/Product");

const indexRender = async(req, res) => {
	const data = await Product.find({})
	const orderProductsByClicks = data
		.filter(product=>{
			if (!product.sold && product.verified && !product.partialDelete) {
				return product
			}
		})
		.sort((a,b)=>{
		return b.clicks - a.clicks
	})
	if (req.session.loggedIn) {
		const {username, email, rol } = req.session;
		res.status(200).render('./baseViews/index', {
			top:orderProductsByClicks,
			login: { username, email, rol },
		});
		return;
	}
	res.status(200).render('./baseViews/index',{top:orderProductsByClicks, login:null});
};
module.exports = indexRender;
