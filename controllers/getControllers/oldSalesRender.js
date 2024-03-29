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
    res.status(200).render('./accountViews/oldSales',{
        login:{username:req.session.username, rol:req.session.rol},
        products:soldProducts,
    })
}
module.exports= oldSalesRender