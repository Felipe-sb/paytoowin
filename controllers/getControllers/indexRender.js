const Product = require("../../models/Product");

const indexRender = async(req, res) => {
	const data = await Product.find({})

	const orderProductsByClicks = data
		.filter(product=>{
			if (!product.sold) {
				return product
			}
		})
		.sort((a,b)=>{
		return b.clicks - a.clicks
	})
	console.log(data)
	if (req.session.loggedIn) {
		const {username, email } = req.session;
		res.render('./baseViews/index', {
			top:orderProductsByClicks,
			login: { username, email },
		});
		return;
	}
	res.render('./baseViews/index',{top:orderProductsByClicks, login:null});
};
module.exports = indexRender;
