const Product = require("../../models/Product")
const productFilter = async (req,res) => {
    const {game,gameType,developer} = req.body
    let query = {}
    if(game !== ''){
        query['game'] = game
    }
    if(gameType !== ''){
        query['gameType'] = gameType
    }
    if(developer !== ''){
        query['developer'] = developer
    }
    console.log(query)
    const products = await Product.find(query)
    res.render("./productsViews/catalog",{products,login:null,alertConfig:{alert:false},msg:null})
}
module.exports = {
    productFilter
}