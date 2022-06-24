const Product = require('../../models/Product');

const addNewProduct = (req, res) => {
	const { title, game, level, description, price } = req.body;
	const newProduct = new Product({
		title,
		game,
		level: Number(level),
		description,
		price: Number(price),
		partialDelete: false,
		verified: false,
	});
    newProduct.save()
        .then((product)=>{
            res.render('./productsViews/addProduct',{
				product,
				alertConfig:{
					alert:true,
					title:'Producto agregado',
					text:`Ahora tienes que esperar a que sea verificado por nuestro equipo`,
					icon:'success',
					confirmButton:true,
					timer:false,
					route:'products'
				}
			})
        })
};
module.exports = addNewProduct;