const User = require("../../models/User")

const oldSalesRender = async(req,res,next) =>{
    if(!req.session.loggedIn) {
        next()
        return
    }
    const user = await User.findOne({email:req.session.email}).populate('products')
    const soldProducts = user.products.filter(product => {
        if (product.sold) {
            return product
        }
    })
    res.render('./accountViews/oldSales',{
        login:{username:req.session.username},
        products:soldProducts,
    })
}
module.exports= oldSalesRender