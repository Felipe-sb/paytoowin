const User = require('../../models/User');

const updateEmail = async (req, res,next) => {
    if (req.session.rol === 'admin') {
        const { email } = req.body;
        if (email !== "" ) {
            const newUser = await User.findByIdAndUpdate(req.session.userId, { email });
            res.render('./baseViews/updateEmailClient',{
                alertConfig:{
                    alert:true,
                    title:'OPERACION EXITOSA',
                    text:`Email modificado exitosamente`,
                    icon:'success',
                    confirmButton:true,
                    timer:false,
                    route:'updateEmailClient'
                },
                login:{userId:req.session.userId, username:req.session.username, email:req.session.email}
    
            })
            return
            }
    }
    next()
};
module.exports = {
    updateEmail,
};