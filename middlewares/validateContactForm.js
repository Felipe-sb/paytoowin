exports.validateContactForm=(req,res,next)=>{
    const {email,subject,text} = req.body
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    const subjectRegex = /^(?!\s*$).+/
    const textRegex = /^(?!\s*$).+/
    if (!emailRegex.test(email)) {
        res.render('./baseViews/contact',{
			login:req.session.loggedIn,
            alertConfig:{
				alert:true,
				title:'Email invalido',
				text:`Por favor ingrese un email valido`,
				icon:'warning',
				confirmButton:true,
				timer:false,
				route:'contact'
			}
        })
        return
    }

    if (!subjectRegex.test(subject)) {
        res.render('./baseViews/contact',{
			login:req.session.loggedIn,
            alertConfig:{
				alert:true,
				title:'Asunto vacio',
				text:`Por favor ingrese el asunto`,
				icon:'warning',
				confirmButton:true,
				timer:false,
				route:'contact'
			}
        })
        return
    }

    if (!textRegex.test(text)) {
        res.render('./baseViews/contact',{
			login:req.session.loggedIn,
            alertConfig:{
				alert:true,
				title:'Contenido vacio',
				text:`Por favor explique su problema`,
				icon:'warning',
				confirmButton:true,
				timer:false,
				route:'contact'
			}
        })
        return
    }
   next();
}