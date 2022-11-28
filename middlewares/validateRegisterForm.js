exports.validateRegisterForm=(req,res,next)=>{
    const {email,password,confirmPassword,username,rol} = req.body
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,12}$/
    const confirmPassRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,12}$/
    const usernameRegex= /^[a-zA-Z0-9]{4,10}$/

    if (!usernameRegex.test(username)) {
        res.render('./authViews/register',{
            alertConfig:{
				alert:true,
				title:'Campo Vacio',
				text:`Por favor ingrese un nombre de usuario`,
				icon:'warning',
				confirmButton:true,
				timer:false,
				route:'auth/register'
			}
        })
        return
    }
    if (!email || !emailRegex.test(email)) {
        res.render('./authViews/register',{
            alertConfig:{
				alert:true,
				title:'Correo electronico no valido',
				text:`Ingrese un email valido`,
				icon:'warning',
				confirmButton:true,
				timer:false,
				route:'auth/register'
			}
        })
        return
    }
    if (!password || !passRegex.test(password)){

        res.render('./authViews/register',{
            alertConfig:{
				alert:true,
				title:'Contraseña no valida',
				text:`Ingrese una contraseña valida que contenga minimo 8 caracteres, una mayuscula y un número`,
				icon:'warning',
				confirmButton:true,
				timer:false,
				route:'auth/register'
			}
        })
        return

    }
    if (!confirmPassword || !confirmPassRegex.test(confirmPassword)) {
        res.render('./authViews/register',{
            alertConfig:{
				alert:true,
				title:'Contraseña no valida',
				text:`Ingrese una contraseña valida que contenga minimo 8 caracteres, una mayuscula y un número`,
				icon:'warning',
				confirmButton:true,
				timer:false,
				route:'auth/register'
			}
        })
        return
    }
    if (password !== confirmPassword ) {
        res.render('./authViews/register',{
            alertConfig:{
				alert:true,
				title:'Ooooops',
				text:`Las contraseñas deben ser iguales`,
				icon:'warning',
				confirmButton:true,
				timer:false,
				route:'auth/register'
			}
        })
        return
    }
    next();
        
}

