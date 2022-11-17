const mercadopago = require('../../helpers/meradopago');
const axios = require('axios')
const createOrderMercadoPago = async(user) =>{
    // const date = new Date('November 13, 2022')
    // let dayNumber = date.getDay()+1
    // let currentDay = `${date.getDate()}`
    // let currentMonth=  `${date.getMonth()+1}`
    // const currentYear = date.getFullYear()
    // console.log(dayNumber);
    // if (Number(dayNumber) === 1) {
    //     currentDay =`${Number(currentDay) -2}`
    // }
    // if (Number(dayNumber) === 7) {
    //     currentDay = `${Number(currentDay) - 1}`
    // }
    // const holidays = await axios.get(`https://apis.digital.gob.cl/fl/feriados/${currentYear}`)
    // let currentDate = `${currentYear}-${currentMonth.length===1?`0${currentMonth}`:currentMonth}-${currentDay.length===1?`0${currentDay}`:currentDay}`
    // let isHoliday
    // do {
    //     isHoliday = false
    //     for (let i = 0; i < holidays.data.length; i++) {
    //         const holiday = holidays.data[i];
    //         if (holiday.fecha === currentDate) {
    //             currentDay = `${Number(currentDay) - 1}`
    //             currentDate = `${currentYear}-${currentMonth.length===1?`0${currentMonth}`:currentMonth}-${currentDay.length===1?`0${currentDay}`:currentDay}`
    //             isHoliday = true
    //         }
    //     }
    // } while (isHoliday);
    // const {data} = await axios.get(`https://api.cmfchile.cl/api-sbifv3/recursos_api/dolar/${currentYear}/${currentMonth}/dias/${currentDay}?apikey=e8298c7f6be9139923017aed93b70296c120a06f&formato=json`)
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
        price = Math.round(product.price* 890)
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