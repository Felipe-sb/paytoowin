const bcrypt = require('bcryptjs');
const User = require("../../models/User");

const loginUser = async(req,res)=>{
    const {email,password} = req.body;
    const user = await User.findOne({email})
    console.log(user);
    if(!user){
        res.render('./authViews/login',{
            alertConfig:{
				alert:true,
				title:'Correo electronico no valido',
				text:`No se ha encontrado ningun correo asociado`,
				icon:'warning',
				confirmButton:true,
				timer:false,
				route:'auth/login'
			}
        })
        return
    }
    const validatePassword = await bcrypt.compare(password, user.password)
    if (!validatePassword){
        res.render('./authViews/login',{
            alertConfig:{
				alert:true,
				title:'Contraseña Incorrecta',
				text:`Ingresa una contraseña valida para el email ${email}`,
				icon:'warning',
				confirmButton:true,
				timer:false,
				route:'auth/login'
			}
        })
        return
    }
    req.session.loggedIn = true;
    req.session.userId = user.id
    req.session.username = user.username
    req.session.email = user.email
    req.session.rol = user.rol
    console.log(req.session);
    res.redirect('/')
}
module.exports = loginUser;