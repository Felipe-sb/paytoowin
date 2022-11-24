exports.validateClientAccount=(req,res,next)=>{
    const {password,confirmPassword} = req.body
    const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,12}$/

    


    if (!password || !passRegex.test(password)){

        res.render('./accountViews/cuenta',{
            alertConfig:{
				alert:true,
				title:'Nueva contraseña invalida',
				text:`Ingrese una contraseña valida que contenga minimo 8 caracteres, una mayuscula y un número`,
				icon:'warning',
				confirmButton:true,
				timer:false,
				route:'account/cuenta'
			},
            login:{userId:req.session.userId, username:req.session.username, email:req.session.email}

        })
        return

    }
    if (!confirmPassword || !passRegex.test(confirmPassword)) {
        res.render('./accountViews/cuenta',{
            alertConfig:{
				alert:true,
				title:'Error al confirmar contraseña',
				text:`Ingrese una contraseña valida que contenga minimo 8 caracteres, una mayuscula y un número`,
				icon:'warning',
				confirmButton:true,
				timer:false,
				route:'account/cuenta'
			},
            login:{userId:req.session.userId, username:req.session.username, email:req.session.email}

        })
        
        return
    }
    if (password !== confirmPassword ) {
        res.render('./accountViews/cuenta',{
            alertConfig:{
				alert:true,
				title:'Ooooops',
				text:`Las contraseñas deben ser iguales`,
				icon:'warning',
				confirmButton:true,
				timer:false,
				route:'cuenta'
			},
            login:{userId:req.session.userId, username:req.session.username, email:req.session.email}

        })
        return
    }

    next();

}
