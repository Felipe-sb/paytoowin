const User = require("../../models/User")

const getAllUsers = async(req,res,next) =>{
    if (req.session.rol === 'admin') {
        const users = await User.find({})
        res.status(200).render('./adminViews/allUsers',{users,login:{username:req.session.username,rol:req.session.rol}})
        return
    }
    next()
}
module.exports  = {
    getAllUsers
}