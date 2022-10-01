const mongoose = require('mongoose');
const User = require('../../models/User')
const deleteProductFromCart = async(req, res, next) => {
    const {idProduct} = req.body
    const user = await User.findOne({email: req.session.email})
    let position=0
    for (let i = 0; i < user.cart.length; i++) {
        const item = user.cart[i];
        if (item.toString()===idProduct) {
            break
        }
        position++;
    }
    user.cart.splice(position, 1)
    const newUser = await user.save()
    res.redirect('/commerce')
}
module.exports={
    deleteProductFromCart
}