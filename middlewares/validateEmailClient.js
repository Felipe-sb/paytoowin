exports.validateEmail=(req,res,next)=>{
const {email} = req.body
const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

if (!email || !emailRegex.test(email)) {
    res.status(406).render('./baseViews/updateEmailClient',{
        alertConfig:{
            alert:true,
            title:'Correo electronico no valido',
            text:`Ingrese un email valido`,
            icon:'warning',
            confirmButton:true,
            timer:false,
            route:'updateEmailClient'
        },
        login:{userId:req.session.userId, username:req.session.username, email:req.session.email, rol:req.session.rol}
    })
    return
}
next();
}