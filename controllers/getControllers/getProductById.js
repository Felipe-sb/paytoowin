const Product = require("../../models/Product")
const getProductById = async(req, res, next) => {
    const {id} = req.params
    try {
        const product = await Product.findById(id)
        res.render('./productsViews/product',{product})
    } catch (error) {
        next(error)
    }
}
module.exports = getProductById