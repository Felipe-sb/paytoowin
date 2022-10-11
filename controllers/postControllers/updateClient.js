const User = require('../../models/User');
const bcryptjs = require ('bcryptjs');

const updateClient = async (req, res,next) => {
    if (req.session.rol === 'admin') {
        const { email, password } = req.body;
        if (email === "" || email === undefined ) {
            const cryptPass = await bcryptjs.hash(password,8)
        const newUser = await User.findByIdAndUpdate(req.session.userId, { password: cryptPass });
        res.render('./baseViews/cuenta',{
                alertConfig:{
                    alert:true,
                    title:'OPERACION EXITOSA',
                    text:`Contraseña modificada exitosamente`,
                    icon:'success',
                    confirmButton:true,
                    timer:false,
                    route:'cuenta'
                },
                login:{userId:req.session.userId, username:req.session.username, email:req.session.email}
    
            })
        return
        }
        if (password === "" || password === undefined ) {
            const newUser = await User.findByIdAndUpdate(req.session.userId, { email });
            res.render('./baseViews/cuenta',{
                alertConfig:{
                    alert:true,
                    title:'OPERACION EXITOSA',
                    text:`Email modificado exitosamente`,
                    icon:'success',
                    confirmButton:true,
                    timer:false,
                    route:'cuenta'
                },
                login:{userId:req.session.userId, username:req.session.username, email:req.session.email}
    
            })
            return
            }
    }
    next()
};
module.exports = {
    updateClient,
};