const Product = require("../../models/Product");

const deleteProduct = (req,res)=>{
    const {id} = req.body;
    Product.findByIdAndDelete(id)
        .then(
            res.render('./productsViews/addProduct',{
                login:req.session.loggedIn,
                product:null,
                alertConfig:{
                    alert:true,
                    title:'Producto Eliminado',
                    text:``,
                    icon:'warning',
                    confirmButton:true,
                    timer:false,
                    route:'products'
                }
            })
        )
}
module.exports = deleteProduct;