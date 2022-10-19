const Product = require("../../models/Product")
const cloudinary = require("../../helpers/cloudinary")
const updateProduct = async( req, res)=>{
    const {id,title,game,level,description,price,username} = req.body
    console.log({id,title,game,level,description,price,username})
    let images = []
	for (let i = 0; i < req.files.length; i++){
		images[i] = await cloudinary.v2.uploader.upload(req.files[i].path)
	}
	images = images.map(image=>{
		return {url:image.url,originalname:image.original_filename,public_id:image.public_id}
	})
    Product.findByIdAndUpdate(id,{title,game,level,images,description,price,username},{new:true})
        .then((product) =>{
            console.log(product)
            if(!req.session.loggedIn){
                res.render('./productsViews/updateProduct',{
                    login:null,
                    product,
                    alertConfig:{
                        alert:true,
                        title:'Producto actualizado con exito',
                        text:'',
                        icon:'success',
                        confirmButton:true,
                        timer:false,
                        route:''
                    }
                })
                return
            }
            res.render('./productsViews/updateProduct',{
                login:{
                    username:req.session.username,
                    email:req.session.email
                },
                product,
                alertConfig:{
                    alert:true,
                    title:'Producto actualizado con exito',
                    text:'',
                    icon:'success',
                    confirmButton:true,
                    timer:false,
                    route:''
                }
            })
        })
}
module.exports=updateProduct