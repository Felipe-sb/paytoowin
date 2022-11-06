const Product = require("../../models/Product")
const cloudinary = require("../../helpers/cloudinary")
const updateProduct = async( id,title,game,level,description,price,username,files)=>{
    let images = []
	for (let i = 0; i <files.length; i++){
		images[i] = await cloudinary.v2.uploader.upload(files[i].path)
	}
	images = images.map(image=>{
		return {url:image.url,originalname:image.original_filename,public_id:image.public_id}
	})
    const newProduct = await Product.findByIdAndUpdate(id,{title,game,level,images,description,price,username},{new:true})
    return newProduct
}
module.exports=updateProduct