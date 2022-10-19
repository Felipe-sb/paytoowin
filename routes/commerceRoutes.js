const cartRender = require('../controllers/getControllers/cartRender');
const { deleteProductFromCart } = require('../controllers/getControllers/deleteProductFronUserCart');
const { addProductToCart } = require('../controllers/postControllers/addProductToCart');
const { captureOrder, cancelOrder, createOrder } = require('../controllers/getControllers/paymentController');

const router = require('express').Router();
router.get('/',cartRender)
router.get('/captureOrder',captureOrder)
router.get('/cancelOrder',cancelOrder)
router.get('/createOrder',createOrder)
router.post('/addToCart',addProductToCart)
router.post('/deleteProductFromCart', deleteProductFromCart)

module.exports = router