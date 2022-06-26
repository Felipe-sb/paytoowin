const loginRender = (req,res)=>{
    if(req.session.loggedIn){
        res.redirect('/')
        return
    }
    res.render('./authViews/login',{alertConfig:{alert:false}})
}
module.exports = loginRender