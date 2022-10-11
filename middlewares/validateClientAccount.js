exports.validateClientAccount=(req,res,next)=>{
    const {email,password,confirmPassword} = req.body
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,15}$/

    


    if (!password || !passRegex.test(password)){

        res.render('./baseViews/cuenta',{
            alertConfig:{
				alert:true,
				title:'Contraseña no valida',
				text:`Ingrese una contraseña valida (Ej: A12da45)`,
				icon:'warning',
				confirmButton:true,
				timer:false,
				route:'cuenta'
			},
            login:{userId:req.session.userId, username:req.session.username, email:req.session.email}

        })
        return

    }
    if (!confirmPassword || !passRegex.test(confirmPassword)) {
        res.render('./baseViews/cuenta',{
            alertConfig:{
				alert:true,
				title:'Contraseña no valida',
				text:`Ingrese una contraseña valida (Ej: B23fa55)`,
				icon:'warning',
				confirmButton:true,
				timer:false,
				route:'cuenta'
			},
            login:{userId:req.session.userId, username:req.session.username, email:req.session.email}

        })
        
        return
    }
    if (password !== confirmPassword ) {
        res.render('./baseViews/cuenta',{
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
