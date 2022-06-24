const contactRender = require('../controllers/getControllers/contactRender');
const indexRender = require('../controllers/getControllers/indexRender');
const sendContactMail = require('../controllers/postControllers/sendContactMail');

const router = require('express').Router();
router.get('/',indexRender)
router.get('/contact',contactRender)
router.post('/contact',sendContactMail)
module.exports = router