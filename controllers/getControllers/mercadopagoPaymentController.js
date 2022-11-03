const mercadopago = require('../../helpers/meradopago');
const axios = require('axios')
const createOrderMercadoPago = async(user) =>{
    const {data} = await axios.get('https://api.cmfchile.cl/api-sbifv3/recursos_api/dolar?apikey=e8298c7f6be9139923017aed93b70296c120a06f&formato=json')
    let preference = {
        items:[],
        back_urls:{
            "success":"https://paytoowin.herokuapp.com/",
            "failure":"https://paytoowin.herokuapp.com/",
            "pending":"https://paytoowin.herokuapp.com/"
        },
        auto_return:'approved',
    }
    let price = 0
    user.cart.forEach(product =>{
        price = Math.round(product.price* parseInt(data.Dolares[0].Valor,10))
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