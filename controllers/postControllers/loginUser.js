const bcrypt = require('bcrypt');
const User = require("../../models/User");

const loginUser = async(req,res)=>{
    const {email,password} = req.body;
    const user = await User.findOne({email})
    const validatePassword = await bcrypt.compare(password, user.password)
    if (!validatePassword){
        res.redirect('/auth/login')
        return
    }
    req.session.loggedIn = true;
    req.session.username = user.username
    req.session.email = user.email
    res.redirect('/auth/register')
    console.log(req.session);
}
module.exports = loginUser;