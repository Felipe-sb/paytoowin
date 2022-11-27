const User = require("../../models/User")

const getAllUsers = async(req,res,next) =>{
    if (req.session.rol === 'admin') {
        const users = await User.find({})
        res.render('./adminViews/allUsers',{users,login:true,username:req.session.username, rol:req.session.rol})
        return
    }
    next()
}
module.exports  = {
    getAllUsers
}