const Product = require("../../models/Product")

const getAllProducts = async(req,res) =>{
    const products = await Product.find()
    if(products.length === 0){
        res.render('./productsViews/catalog',{msg:'Aun no se han agregado productos',products:null})
        return
    }
    res.render('./productsViews/catalog',{msg:null,products})
}
module.exports = getAllProducts