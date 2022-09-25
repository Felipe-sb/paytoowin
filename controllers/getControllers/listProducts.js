const Product = require('../../models/Product')
const listProducts = async(req,res) =>{
    const products = await Product.find()
    if (req.session.rol === 'admin' || req.session.rol === 'clientService'){
        if(!req.session.loggedIn) {
            res.render('./productsViews/updateProducts',
                {products,login:null,alertConfig:{alert:false}})
            return
        }
        res.render('./productsViews/updateProducts',
            {products,login:{username:req.session.username,email: req.session.email},alertConfig:{alert:false}})
        return
    }
    res.redirect('/products')
}
module.exports = listProducts