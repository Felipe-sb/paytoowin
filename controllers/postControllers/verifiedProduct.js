const Product = require("../../models/Product");
const verifiedProduct = async(id)=>{
const product = await Product.findByIdAndUpdate(id, {verified:true})
return product

}
module.exports = verifiedProduct