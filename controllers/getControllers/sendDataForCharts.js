const Sale = require("../../models/Sale");

const sendDataForCharts = async(req,res,next) =>{
    // if(!req.session.loggedIn || req.session.rol !== 'admin'){
    //     next();
    // }
    const {from,to} = req.query
    const sales = (!from || !to) 
        ? await Sale.find({}).populate('products sellers buyer')
        : await Sale.find({createdAt:{$gte:`${from}`,$lte:`${to}`}}).populate('products sellers buyer')
    res.json(sales)
}
module.exports = sendDataForCharts