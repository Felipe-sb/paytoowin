const adminDashboardRender=(req,res,next)=>{
    if (!req.session.loggedIn || req.session.rol !== 'admin') {
        next()
    }
    res.status(200).render('./adminViews/dashboard',{host:process.env.HOST,login:{username:req.session.username,rol:req.session.rol}})
}
module.exports= adminDashboardRender