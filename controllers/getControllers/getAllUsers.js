const User = require("../../models/User")

const getAllUsers = async(req,res,next) =>{
    if (req.session.rol === 'admin') {
        const users = await User.find({})
        res.render('./adminViews/allUsers',{users,username:req.session.username})
        return
    }
    next()
}
module.exports  = {
    getAllUsers
}