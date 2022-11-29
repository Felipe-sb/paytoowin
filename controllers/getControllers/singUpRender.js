const singUpRender = (req,res) =>{
    if(req.session.loggedIn){
        res.redirect('/')
        return
    }
    res.status(200).render('./authViews/register',{alertConfig:{alert:false}})
}
module.exports = singUpRender