const Product = require("../../models/Product");
const deleteProduct = async(id)=>{
    const product = await Product.findByIdAndDelete(id)
    return product
}
module.exports = deleteProduct;