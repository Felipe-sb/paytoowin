const Product = require("../models/Product");
const validateUpdateProduct = async(req,res,next) =>{
    const {id,title,level,description,price,username} = req.body;
    const images = req.files
    const regexNotEmptyString = /^(?!\s*$).+/
    const regexOnlyNumbers = /^[0-9]*$/
	const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    const product = await Product.findById(id)
    if(!regexNotEmptyString.test(title)){
        res.render('./productsViews/updateProduct',{
            product,
            login:{username:req.session.username,rol:req.session.rol},
            alertConfig:{
				alert:true,
				title:'Titulo invalido',
				text:`Porfavor ingrese valores validos`,
				icon:'warning',
				confirmButton:true,
				timer:false,
				route:`products/update-product/${id}`
			},
            product,
            rol:req.session.rol
        })
        return;
    }
    if(!regexOnlyNumbers.test(level) || !regexNotEmptyString.test(level)){
        res.render('./productsViews/updateProduct',{
            login:{username:req.session.username,rol:req.session.rol},
            alertConfig:{
				alert:true,
				title:'Nivel invalido',
				text:`Porfavor ingrese solo numeros`,
				icon:'warning',
				confirmButton:true,
				timer:false,
				route:`products/update-product/${id}`
			},
            product,
            rol:req.session.rol
        })
        return;
    }
    if (images.length=== 0) {
        res.render('./productsViews/updateProduct',{
            login:{username:req.session.username,rol:req.session.rol},
            alertConfig:{
				alert:true,
				title:'No se ha subido ninguna imagen',
				text:`Porfavor ingrese al menos una imagen`,
				icon:'warning',
				confirmButton:true,
				timer:false,
				route:`products/update-product/${id}`
			},
            product,
            rol:req.session.rol
        })
        return;
    }
    if (!regexNotEmptyString.test(description)) {
        res.render('./productsViews/updateProduct',{
            login:{username:req.session.username,rol:req.session.rol},
            alertConfig:{
				alert:true,
				title:'Descripcion invalida',
				text:`Porfavor ingrese alguna descripcion del producto`,
				icon:'warning',
				confirmButton:true,
				timer:false,
				route:`products/update-product/${id}`
			},
            product,
            rol:req.session.rol
        })
        return;
    }
    if(!regexOnlyNumbers.test(price) || !regexNotEmptyString.test(price)){
        res.render('./productsViews/updateProduct',{
            login:{username:req.session.username,rol:req.session.rol},
            alertConfig:{
				alert:true,
				title:'Precio invalido',
				text:`Porfavor ingrese un precio valido`,
				icon:'warning',
				confirmButton:true,
				timer:false,
				route:`products/update-product/${id}`
			},
            product,
            rol:req.session.rol
        })
        return;
    }
	if (!regexNotEmptyString.test(username)) {
        res.render('./productsViews/updateProduct',{
            login:{username:req.session.username,rol:req.session.rol},
            alertConfig:{
				alert:true,
				title:'Nombre de usuario invalido',
				text:`Porfavor ingrese valores validos`,
				icon:'warning',
				confirmButton:true,
				timer:false,
				route:`products/update-product/${id}`
			},
            product,
            rol:req.session.rol
        })
        return;
    }
    next()
}
module.exports = validateUpdateProduct