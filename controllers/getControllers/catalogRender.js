const Product = require('../../models/Product');

const getAllProducts = async (req, res) => {
    const page = req.params.page;
    if (Number(page)===NaN) {
        next();
        return
    }
	const products = await Product.paginate({partialDelete:false, verified:true}, {limit: 8, page});
    const pages = products.totalPages
    const current = page

   if (!req.session.loggedIn) {
    res.render('./productsViews/catalog',{msg:null,products:products.docs,login:null, pages,current})
    return
   }

    res.render('./productsViews/catalog',{msg:null,products:products.docs,login:{username:req.session.username}, pages,current})
    


   
    

};

module.exports = getAllProducts;
