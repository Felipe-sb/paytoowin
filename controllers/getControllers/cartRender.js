const User = require("../../models/User");
const { createOrderMercadoPago } = require("./mercadopagoPaymentController");

const cartRender = async(req, res,next) => {
	if (req.session.loggedIn) {
		const user = await User.findOne({email:req.session.email}).populate('cart')
		if(user.cart.length >0){
			const id = await createOrderMercadoPago(user)
			res.status(200).render('./commerceViews/cart', {
				cart:user.cart,
				login:{username:req.session.username,email:req.session.email, rol:req.session.rol},
				paymentId:id
			});
			return;
		}
		res.status(200).render('./commerceViews/cart', {
			cart:user.cart,
			login:{username:req.session.username,email:req.session.email, rol:req.session.rol},
			paymentId:null
		});
		return;
		
	}
    next();
};
module.exports = cartRender;