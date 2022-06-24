const addProductRender = (req,res) =>{
    res.render('./productsViews/addProduct',{alertConfig:{alert:false}})
}
module.exports = addProductRender