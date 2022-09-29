const Product = require('../../models/Product');
const User = require('../../models/User');

const addProductToCart = async (req, res,next) => {
    if (req.session.loggedIn) {
        const { idProduct } = req.body;
        const product = await Product.findById(idProduct);
        const user = await User.findOne({email:req.session.email});
        user.cart = user.cart.concat(product._id)
        await user.save()
        res.redirect('/commerce');
        return
    }
    next();
};
module.exports ={
    addProductToCart
}