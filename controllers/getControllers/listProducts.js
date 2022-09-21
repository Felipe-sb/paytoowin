const Product = require('../../models/Product')
const listProducts = async(req,res) =>{
    const products = await Product.find()
    console.log(products)
    if(!req.session.loggedIn) {
        res.render('./productsViews/updateProducts',
            {products,login:null,alertConfig:{alert:false}})
        return
    }
    res.render('./productsViews/updateProducts',
        {products,login:{username:req.session.username,email: req.session.email},alertConfig:{alert:false}})
}
module.exports = listProducts