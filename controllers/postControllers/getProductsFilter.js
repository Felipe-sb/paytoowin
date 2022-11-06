const Product = require("../../models/Product")
const productFilter = async (query) => {
    const products = await Product.find(query)
    return products
}
module.exports = {
    productFilter
}