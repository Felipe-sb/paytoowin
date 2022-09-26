const Product = require("../../models/Product")


const productFilter = async (req,res) => {

    const {game,gameType,developer} = req.body
    const products = await Product.find({game,gametype,developer})
    console.log(products)
    res.render("./productsViews/catalog",{products,login:null,alertConfig:{alert:false},msg:null})
    





    



}
module.exports = {
    productFilter
}