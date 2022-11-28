const Product = require('../../models/Product')
const listProducts = async(req,res,next) =>{
    if(!req.session.loggedIn){
        next()
        return
    }
    
    let products = await Product.find({}).populate('owner')
     if(products !== []){
        res.render('./productsViews/updateProducts',
            {products,msg:"error su usuario no tiene productos en venta",login:{username:req.session.username,email: req.session.email, rol:req.session.rol},alertConfig:{alert:false}})
        return

     }
    if (req.session.rol === 'admin' || req.session.rol === 'clientService'){
        res.render('./productsViews/updateProducts',
            {products,login:{username:req.session.username,email: req.session.email, rol:req.session.rol},alertConfig:{alert:false}})
        return
    }else{
        products = products.filter(product =>{
            console.log(product.owner)
            if (product.owner[0].email === req.session.email) {
                return product
            }
        })
        console.log(products)
        res.render('./productsViews/updateProducts',
            {products,login:{username:req.session.username,email: req.session.email, rol:req.session.rol},alertConfig:{alert:false}})
        return
    }
    next()
}
module.exports = listProducts