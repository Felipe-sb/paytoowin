const adminDashboardRender=(req,res)=>{
    res.render('./adminViews/dashboard',{host:process.env.HOST})
}
module.exports= adminDashboardRender