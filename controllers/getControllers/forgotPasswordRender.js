const forgotPasswordRender = (req,res) =>{
    res.render('./authViews/forgotPassword',{alertConfig:{alert:false}})
}
module.exports = forgotPasswordRender