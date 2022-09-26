const User = require("../../models/User")

const updateUserById = async (req,res) =>{
    const {id,username,rol} = req.body
    const newUser = await User.findByIdAndUpdate(id,{username,rol})
    res.redirect('/admin/users')
}
module.exports ={
    updateUserById
}