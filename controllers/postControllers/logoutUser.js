const logoutUser = (req,res) =>{
    req.session.destroy(()=>{
        res.redirect('/auth//login')
    })   
}
module.exports = logoutUser