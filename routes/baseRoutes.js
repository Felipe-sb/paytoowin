const cuentaRender = require('../controllers/getControllers/accountRender');
const contactRender = require('../controllers/getControllers/contactRender');
const indexRender = require('../controllers/getControllers/indexRender');
const terminosRender = require('../controllers/getControllers/terminosRender');
const sendContactMail = require('../controllers/postControllers/sendContactMail');
const { updateClient } = require('../controllers/postControllers/updateClient');
const { validateClientAccount } = require('../middlewares/validateClientAccount');
const { validateContactForm } = require('../middlewares/validateContactForm');

const router = require('express').Router();
router.get('/',indexRender)
router.get('/terminos',terminosRender)
router.get('/cuenta',cuentaRender)
router.get('/contact',contactRender)
router.post('/contact',validateContactForm,sendContactMail)
router.post('/cuenta',updateClient)
module.exports = router