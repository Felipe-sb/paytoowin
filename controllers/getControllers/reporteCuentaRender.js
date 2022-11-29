const reporteCuentaRender=(req,res) =>{
    if(!req.session.loggedIn){
        res.status(200).render('./baseViews/reporteCuenta',{alertConfig:{alert:false},login:null})
        return   
    }
    res.status(200).render('./baseViews/reporteCuenta',{alertConfig:{alert:false},login:{username:req.session.username, email:req.session.email}})
}
module.exports = reporteCuentaRender