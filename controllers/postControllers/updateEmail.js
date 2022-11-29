const User = require('../../models/User');

const updateEmail = async (req, res,next) => {
    if (req.session.rol === 'admin') {
        const { email } = req.body;
        if (email !== "" ) {
            const newUser = await User.findByIdAndUpdate(req.session.userId, { email },{new:true});
            req.session.email = newUser.email;
            res.status(200).render('./accountViews/updateEmailClient',{
                alertConfig:{
                    alert:true,
                    title:'OPERACION EXITOSA',
                    text:`Email modificado exitosamente`,
                    icon:'success',
                    confirmButton:true,
                    timer:false,
                    route:'account/updateEmailClient'
                },
                login:{userId:req.session.userId, username:req.session.username, email:req.session.email, rol:req.session.rol}
    
            })
            return
            }
    }
    next()
};
module.exports = {
    updateEmail,
};