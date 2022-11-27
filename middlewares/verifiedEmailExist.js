const User = require('../models/User')
const verifiedEmailExist = async (req,res,next) =>{
    const {email} = req.body
    const user = await User.find({email})
    if (user.length !== 0) {
        res.render('./baseViews/updateEmailClient',{
            alertConfig:{
				alert:true,
				title:`La cuenta con el correo ${email} ya existe`,
				text:``,
				icon:'warning',
				confirmButton:true,
				timer:false,
				route:'updateEmailClient'
			},

        login:{userId:req.session.userId, username:req.session.username, email:req.session.email, rol:req.session.rol}
        })
        return;
    }
    next()
}
module.exports=verifiedEmailExist