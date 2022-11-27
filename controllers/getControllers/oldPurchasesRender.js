const User = require("../../models/User");
const oldPurchasesRender = async (req,res,next) =>{
    if(!req.session.loggedIn) {
        next();
        return;
    }
    const user = await User.findOne({email:req.session.email}).populate('oldPurchases')
    res.render('./accountViews/oldPurchases',{
        login:{username:req.session.username, rol:req.session.rol},
        products:user.oldPurchases
    })
}
module.exports = oldPurchasesRender