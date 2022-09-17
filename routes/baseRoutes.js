const contactRender = require('../controllers/getControllers/contactRender');
const indexRender = require('../controllers/getControllers/indexRender');
const terminosRender = require('../controllers/getControllers/terminosRender');
const sendContactMail = require('../controllers/postControllers/sendContactMail');
const { validateContactForm } = require('../middlewares/validateContactForm');

const router = require('express').Router();
router.get('/',indexRender)
router.get('/terminos',terminosRender)
router.get('/contact',contactRender)
router.post('/contact',validateContactForm,sendContactMail)
module.exports = router