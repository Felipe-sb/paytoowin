const singUpRender = (req,res) =>{
    res.render('./authViews/register',{alertConfig:{alert:false}})
}
module.exports = singUpRender