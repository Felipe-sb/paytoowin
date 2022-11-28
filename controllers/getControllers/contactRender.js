const contactRender=(req,res) =>{
    if(!req.session.loggedIn){
        res.render('./baseViews/contact',{alertConfig:{alert:false},login:null})
        return   
    }
    res.render('./baseViews/contact',{alertConfig:{alert:false},login:{username:req.session.username, email:req.session.email,rol:req.session.rol}})
}
module.exports = contactRender