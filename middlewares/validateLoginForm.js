exports.validateLoginForm=(req,res,next)=>{
    const {email,password} = req.body
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,15}$/

    if (!email || !emailRegex.test(email)) {
        res.render('./authViews/login',{
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

        res.render('./authViews/login',{
            alertConfig:{
				alert:true,
				title:'Contraseña no valida',
				text:`Ingrese una contraseña valida (Ej: A12da45)`,
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