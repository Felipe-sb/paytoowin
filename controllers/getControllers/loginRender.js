const loginRender = (req,res)=>{
    res.render('./authViews/login',{alertConfig:{alert:false}})
}
module.exports = loginRender