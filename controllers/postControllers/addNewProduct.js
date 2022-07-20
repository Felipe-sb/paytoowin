const Product = require('../../models/Product');

const addNewProduct = (req, res) => {
	const { title, game, level, description, price } = req.body;
	console.log(req.files)
	const images = req.files.map(image => image.filename)
	const newProduct = new Product({
		title,
		game,
		level: Number(level),
		images,
		description,
		price: Number(price),
		partialDelete: false,
		verified: false,
	});
    newProduct.save()
        .then((product)=>{
            res.render('./productsViews/addProduct',{
				login:req.session.loggedIn,
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
        }).catch(error =>{
			console.log('No se pudo guardar el producto')
		})
};
module.exports = addNewProduct;