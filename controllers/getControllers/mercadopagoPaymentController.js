const mercadopago = require('../../helpers/meradopago');
const axios = require('axios')
const createOrderMercadoPago = async(user) =>{
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const currentMonth = `${currentDate.getMonth()+1}`.length === 1 
                            ? `0${currentDate.getMonth()+1}`
                            : `${currentDate.getMonth()+1}`
    const currentDay = `${currentDate.getDate()}`.length === 1 
                            ? `0${currentDate.getDate()}`
                            : `${currentDate.getDate()}`
    const holidays = await axios.get(`https://apis.digital.gob.cl/fl/feriados/${currentYear}`)
    let isHoliday = false;
    let data
    holidays.data.forEach(holiday =>{
        if (holiday.fecha === `${currentYear}-${currentMonth}-${currentDay}`) {
            isHoliday = true;
        }
    })
    if (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
        isHoliday = true
    }
    if (isHoliday) {
        data = await axios.get(`https://api.cmfchile.cl/api-sbifv3/recursos_api/dolar/anteriores/${currentYear}/${currentMonth}/dias/${currentDay}?apikey=e8298c7f6be9139923017aed93b70296c120a06f&formato=json`)
    }else{
        data = await axios.get(`https://api.cmfchile.cl/api-sbifv3/recursos_api/dolar?apikey=e8298c7f6be9139923017aed93b70296c120a06f&formato=json`)
    }
    let preference = {
        items:[],
        back_urls:{
            "success":`${process.env.HOST}/commerce/successPay`,
            "failure":`${process.env.HOST}/commerce/successPay`,
            "pending":`${process.env.HOST}/commerce/successPay`
        },
        auto_return:'approved',
    }
    let price = 0
    user.cart.forEach(product =>{
        price = Math.round(product.price* Number(data.data.Dolares[data.data.Dolares.length-1].Valor.replace(',','.')))
        preference.items = [...preference.items,{
            title:`${product.title}`,
            unit_price:price,
            quantity:1
        }]
    })
    const response = await mercadopago.preferences.create(preference)
    return response.body.id
}
module.exports={
    createOrderMercadoPago
}