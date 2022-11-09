const User = require('../../models/User');
const bcryptjs = require ('bcryptjs');

const updatePasswordClient = async (req, res,next) => {
    if (req.session.rol === 'admin') {
        const { password } = req.body;
        if (password !== "" || password !== undefined ) {
            const cryptPass = await bcryptjs.hash(password,8)
        const newUser = await User.findByIdAndUpdate(req.session.userId, { password: cryptPass });
        res.render('./accountViews/cuenta',{
                alertConfig:{
                    alert:true,
                    title:'OPERACION EXITOSA',
                    text:`Contraseña modificada exitosamente`,
                    icon:'success',
                    confirmButton:true,
                    timer:false,
                    route:'account/cuenta'
                },
                login:{userId:req.session.userId, username:req.session.username, email:req.session.email}
    
            })
        return
        }
    }
    next()
};
module.exports = {
    updatePasswordClient,
};