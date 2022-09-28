const cartRender = require('../controllers/getControllers/cartRender');


const router = require('express').Router();
router.get('/',cartRender)

module.exports = router