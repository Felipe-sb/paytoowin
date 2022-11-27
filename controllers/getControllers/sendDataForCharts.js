const Sale = require("../../models/Sale");

const sendDataForCharts = async(req,res,next) =>{
    if(!req.session.loggedIn || req.session.rol !== 'admin'){
        res.json({error:'Usted no esta autenticado o no es administrador'})
    }
    const months=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    const {from,to} = req.query
    const sales = (!from || !to) 
        ? await Sale.find({}).populate('products sellers buyer')
        : await Sale.find({createdAt:{$gte:`${from}`,$lte:`${to}`}}).populate('products sellers buyer')
    let perMonth={}
    sales.forEach(sale => {
        if (perMonth[months[sale.createdAt.getMonth()]] !== undefined) {
            perMonth[months[sale.createdAt.getMonth()]]= [...perMonth[months[sale.createdAt.getMonth()]],{sale,month:months[sale.createdAt.getMonth()]}]
        }else{
            perMonth[months[sale.createdAt.getMonth()]]= [{sale,month:months[sale.createdAt.getMonth()]}]
        }
    })
    console.log(perMonth);
    res.json({sales,perMonth})
}
module.exports = sendDataForCharts