const loginRender = (req,res)=>{
    if(req.session.loggedIn){
        res.redirect('/')
        return
    }
    res.status(200).render('./authViews/login',{alertConfig:{alert:false}})
}
module.exports = loginRender