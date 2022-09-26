const User = require("../../models/User")

const banUserById = async (req, res) => {
    const {id} = req.body
    const newUser = await User.findByIdAndUpdate(id, {banned:true})
    res.redirect('/admin/users')
}
module.exports ={
    banUserById
}