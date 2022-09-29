const cartRender = require('../controllers/getControllers/cartRender');
const { addProductToCart } = require('../controllers/postControllers/addProductToCart');


const router = require('express').Router();
router.get('/',cartRender)
router.post('/addToCart',addProductToCart)

module.exports = router