const validateAddProductForm = (req,res,next)=>{
    const {title,game,level,description,price,gameType,developer} = req.body;
    const images = req.files
    const regexNotEmptyString = /^(?!\s*$).+/
    const regexOnlyNumbers = /^[0-9]*$/
    if(!regexNotEmptyString.test(title)){
        res.render('./productsViews/addProduct',{
            login:req.session.loggedIn,
            alertConfig:{
				alert:true,
				title:'Titulo invalido',
				text:`Porfavor ingrese valores validos`,
				icon:'warning',
				confirmButton:true,
				timer:false,
				route:'products/add-product'
			}
        })
        return;
    }
	if(gameType !== "battleroyale" && gameType !=="deportes" && gameType !=="rpg" && gameType !=="mmo" ){
		
        res.render('./productsViews/addProduct',{
            login:req.session.loggedIn,
            alertConfig:{
				alert:true,
				title:'Tipo de juego invalido',
				text:`Porfavor ingrese valores validos`,
				icon:'warning',
				confirmButton:true,
				timer:false,
				route:'products/add-product'
			}
        })
        return;
    }
	if(developer !== "ubisoft" && developer!== "rockstar" && developer!== "blizzard" && developer!=="activision" && developer!=="riot" && developer!=="ea" && developer!=="epicgames" && developer!=="microsoft" && developer!=="bigpoint" && developer!=="pubgstudios"){
        res.render('./productsViews/addProduct',{
            login:req.session.loggedIn,
            alertConfig:{
				alert:true,
				title:'Pais invalido',
				text:`Porfavor ingrese valores validos`,
				icon:'warning',
				confirmButton:true,
				timer:false,
				route:'products/add-product'
			}
        })
        return;
    }
    if (game !== "darkorbit" && game !=="lol" && game !=="gta5" && game !=="wow" && game !=="warzone" && game !=="fortnite" && game !=="pubg" && game !=="apex" && game !=="forzah5" && game !=="valorant" && game !=="fifa23"){
        res.render('./productsViews/addProduct',{
            login:req.session.loggedIn,
            alertConfig:{
				alert:true,
				title:'Juego invalido',
				text:`Porfavor ingrese valores validos`,
				icon:'warning',
				confirmButton:true,
				timer:false,
				route:'products/add-product'
			}
        })
        return;
    }
    if(!regexOnlyNumbers.test(level) || !regexNotEmptyString.test(level)){
        res.render('./productsViews/addProduct',{
            login:req.session.loggedIn,
            alertConfig:{
				alert:true,
				title:'Nivel invalido',
				text:`Porfavor ingrese solo numeros`,
				icon:'warning',
				confirmButton:true,
				timer:false,
				route:'products/add-product'
			}
        })
        return;
    }
    if (images.length=== 0) {
        res.render('./productsViews/addProduct',{
            login:req.session.loggedIn,
            alertConfig:{
				alert:true,
				title:'Ingresa al menos una imagen',
				text:``,
				icon:'warning',
				confirmButton:true,
				timer:false,
				route:'products/add-product'
			}
        })
        return;
    }
    if (!regexNotEmptyString.test(description)) {
        res.render('./productsViews/addProduct',{
            login:req.session.loggedIn,
            alertConfig:{
				alert:true,
				title:'Descripcion invalida',
				text:`Ingresa una descripcion valida`,
				icon:'warning',
				confirmButton:true,
				timer:false,
				route:'products/add-product'
			}
        })
        return;
    }
    if(!regexOnlyNumbers.test(price)){
        res.render('./productsViews/addProduct',{
            login:req.session.loggedIn,
            alertConfig:{
				alert:true,
				title:'Precio invalido',
				text:`Porfavor ingrese solo numeros`,
				icon:'warning',
				confirmButton:true,
				timer:false,
				route:'products/add-product'
			}
        })
        return;
    }
    next()
}

module.exports = validateAddProductForm