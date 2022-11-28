const singUpAdminRender = (req,res,next) =>{
    if(req.session.rol !== "admin") {
        next();
        return

    }

    res.render('./adminViews/register',{alertConfig:{alert:false}, login:{username:req.session.username,rol:req.session.rol}})
}
module.exports = singUpAdminRender