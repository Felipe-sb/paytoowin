const forgotPasswordRender = (req,res) =>{
    if(req.session.loggedIn){
        res.redirect('/')
        return
    }
    res.render('./authViews/forgotPassword',{alertConfig:{alert:false}})
}
module.exports = forgotPasswordRender