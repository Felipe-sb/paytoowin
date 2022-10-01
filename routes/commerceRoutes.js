const cartRender = require('../controllers/getControllers/cartRender');
const { deleteProductFromCart } = require('../controllers/getControllers/deleteProductFronUserCart');
const { addProductToCart } = require('../controllers/postControllers/addProductToCart');


const router = require('express').Router();
router.get('/',cartRender)
router.post('/addToCart',addProductToCart)
router.post('/deleteProductFromCart', deleteProductFromCart)

module.exports = router