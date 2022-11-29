const User = require('../models/User')
const verifiedIfUserAlreadyExits = async (req,res,next) =>{
    const {email} = req.body
    const user = await User.find({email})
    if (user.length !== 0) {
        res.status(406).render('./authViews/register',{
            alertConfig:{
				alert:true,
				title:`La cuenta con el correo ${email} ya existe`,
				text:``,
				icon:'warning',
				confirmButton:true,
				timer:false,
				route:'auth/register'
			}
        })
        return;
    }
    next()
}
module.exports=verifiedIfUserAlreadyExits