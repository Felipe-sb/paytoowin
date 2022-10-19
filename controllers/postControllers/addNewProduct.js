const Product = require('../../models/Product');
const cloudinary = require('../../helpers/cloudinary');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const addNewProduct = async (req, res) => {
	const { title, game, level, description, price,gameType,developer,username,password,email } = req.body;
	const hashPassword = await bcrypt.hash(password, 8);
	const user = await User.findOne({email:req.session.email})
	let images = []
	for (let i = 0; i < req.files.length; i++){
		images[i] = await cloudinary.v2.uploader.upload(req.files[i].path)
	}
	images = images.map(image=>{
		return {url:image.url,originalname:image.original_filename,public_id:image.public_id}
	})
	console.log(images)
	const newProduct = new Product({
		title,
		game,
		level: Number(level),
		images,
		description,
		price: Number(price),
		partialDelete: false,
		verified: false,
		gameType,
		developer,
		owner: user._id,
		clicks:0,
		username,
		password: hashPassword,
		email
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
			return product
        }).catch(error =>{
			console.log('No se pudo guardar el producto')
		})
};
module.exports = addNewProduct;