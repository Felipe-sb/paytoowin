const User = require('../../models/User');
const bcryptjs = require ('bcryptjs');
const updatePasswordClient = async (req, res,next) => {
    const { password, clientPassword } = req.body;
    const email = req.session.email;
    const user = await User.findOne({email})
    const comparePassword = await bcryptjs.compare(clientPassword, user.password)
    console.log(user);
    console.log(clientPassword);
    if (comparePassword) {
        if (password !== "" || password !== undefined ) {
            const cryptPass = await bcryptjs.hash(password,8)
        const newUser = await User.findByIdAndUpdate(req.session.userId, { password: cryptPass });
        res.status(200).render('./accountViews/cuenta',{
                alertConfig:{
                    alert:true,
                    title:'OPERACION EXITOSA',
                    text:`Contraseña modificada exitosamente`,
                    icon:'success',
                    confirmButton:true,
                    timer:false,
                    route:'auth/login'
                },
                login:{userId:req.session.userId, username:req.session.username, email:req.session.email, rol:req.session.rol}
                
            });
            req.session.destroy();
        return
        }
        
    }else { 
        res.status(401).render('./accountViews/cuenta',{
            alertConfig:{
                alert:true,
                title:'Contraseña invalida ',
                text:`La contraseña actual no es valida`,
                icon:'warning',
                confirmButton:true,
                timer:false,
                route:'account/cuenta'
            },
            login:{userId:req.session.userId, username:req.session.username, email:req.session.email, rol:req.session.rol}

        })
    }
    next()
    
};
module.exports = {
    updatePasswordClient
};