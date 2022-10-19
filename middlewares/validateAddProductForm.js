const validateAddProductForm = (req,res,next)=>{
    const {title,game,level,description,price,gameType,developer,username,password,email} = req.body;
    const images = req.files
    const regexNotEmptyString = /^(?!\s*$).+/
    const regexOnlyNumbers = /^[0-9]*$/
	const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
	const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,15}$/

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
	if (!regexNotEmptyString.test(username)) {
        res.render('./productsViews/addProduct',{
            login:req.session.loggedIn,
            alertConfig:{
				alert:true,
				title:'Nombre de usuario invalido',
				text:`Ingrese un nombre de usuario valido`,
				icon:'warning',
				confirmButton:true,
				timer:false,
				route:'products/add-product'
			}
        })
        return;
    }
	if (!email || !emailRegex.test(email)) {
        res.render('./productsViews/addProduct',{
			login:req.session.loggedIn,
            alertConfig:{
				alert:true,
				title:'Correo electronico no valido',
				text:`Ingrese un email valido`,
				icon:'warning',
				confirmButton:true,
				timer:false,
				route:'products/add-product'
			}
        })
        return
    }
	if (!password || !passRegex.test(password)){

        res.render('./productsViews/addProduct',{
			login:req.session.loggedIn,
            alertConfig:{
				alert:true,
				title:'Contraseña no valida',
				text:`Ingrese una contraseña valida (Ej: A12da45)`,
				icon:'warning',
				confirmButton:true,
				timer:false,
				route:'products/add-product'
			}
        })
        return

    }
    next()
}

module.exports = validateAddProductForm