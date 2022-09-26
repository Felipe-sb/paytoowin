const User = require("../../models/User")

const getAllUsers = async(req,res) =>{
    const users = await User.find({})
    res.render('./adminViews/allUsers',{users})
}
module.exports  = {
    getAllUsers
}