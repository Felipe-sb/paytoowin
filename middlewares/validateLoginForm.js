exports.validateLoginForm=(req,res,next)=>{
    const {email,password} = req.body
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,12}$/

    if (!email || !emailRegex.test(email)) {
        res.status(406).render('./authViews/login',{
            alertConfig:{
				alert:true,
				title:'Correo electronico no valido',
				text:`Ingrese un email valido`,
				icon:'warning',
				confirmButton:true,
				timer:false,
				route:'auth/login'
			}
        })
        return
    }
    if (!password || !passRegex.test(password)){

        res.status(406).render('./authViews/login',{
            alertConfig:{
				alert:true,
				title:'Contraseña no valida',
				text:`Ingrese una contraseña valida que contenga minimo 8 caracteres, una mayuscula y un número`,
				icon:'warning',
				confirmButton:true,
				timer:false,
				route:'auth/login'
			}
        })
        return

    }
    next();
        
}