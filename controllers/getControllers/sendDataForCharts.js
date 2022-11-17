const Sale = require("../../models/Sale");

const sendDataForCharts = async(req,res,next) =>{
    // if(!req.session.loggedIn || req.session.rol !== 'admin'){
    //     next();
    // }
    // const {from,to} = req.query
    // const date = new Date().toISOString()
    // console.log(date);
    const sales = await Sale.find({createdAt:{$gte:'2022/09/23',$lte:'2022-12-01'}})
    res.json(sales)
}
module.exports = sendDataForCharts