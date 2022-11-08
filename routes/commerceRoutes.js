const cartRender = require('../controllers/getControllers/cartRender');
const { deleteProductFromCart } = require('../controllers/getControllers/deleteProductFronUserCart');
const { createOrderMercadoPago } = require('../controllers/getControllers/mercadopagoPaymentController');
const { captureOrderPayPal, cancelOrderPayPal, createOrderPayPal } = require('../controllers/getControllers/paypalPaymentController');
const { addProductToCart } = require('../controllers/postControllers/addProductToCart');


const router = require('express').Router();
router.get('/',cartRender)
router.get('/createOrderMercadoPago',createOrderMercadoPago)
router.get('/captureOrderPayPal',captureOrderPayPal)
router.get('/cancelOrderPayPal',cancelOrderPayPal)
router.get('/createOrderPayPal',createOrderPayPal)
router.get('/failedPay',(req,res)=>{
    res.render('./commerceViews/pagorechazado.ejs',{
        login:null
    })
})
router.post('/addToCart',addProductToCart)
router.post('/deleteProductFromCart', deleteProductFromCart)

module.exports = router