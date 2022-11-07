const accountConfigRender = require('../controllers/getControllers/accountConfigRender');
const cuentaRender = require('../controllers/getControllers/accountRender');
const contactRender = require('../controllers/getControllers/contactRender');
const indexRender = require('../controllers/getControllers/indexRender');
const terminosRender = require('../controllers/getControllers/terminosRender');
const faqsRender = require('../controllers/getControllers/faqsRender');
const pagoexitosoRender = require('../controllers/getControllers/pagoexitosoRender');
const pagorechazadoRender = require('../controllers/getControllers/pagorechazadoRender');
const pagopendienteRender = require('../controllers/getControllers/pagopendienteRender');
const nosotrosRender = require('../controllers/getControllers/nosotrosRender');
const updateEmailClient = require('../controllers/getControllers/updateEmailClient');
const sendContactMail = require('../controllers/postControllers/sendContactMail');
const { updatePasswordClient } = require('../controllers/postControllers/updateClient');
const { updateEmail } = require('../controllers/postControllers/updateEmail');
const { validateClientAccount } = require('../middlewares/validateClientAccount');
const { validateContactForm } = require('../middlewares/validateContactForm');
const { validateEmail } = require('../middlewares/validateEmailClient');
const verifiedEmailExist = require('../middlewares/verifiedEmailExist');
const saldoRender = require('../controllers/getControllers/saldoRender');
const loginUser = require('../controllers/postControllers/loginUser');

const router = require('express').Router();
router.get('/',indexRender)
router.get('/terminos',terminosRender)
router.get('/faqs',faqsRender)
router.get('/pagoexitoso',pagoexitosoRender)
router.get('/pagorechazado',pagorechazadoRender)
router.get('/pagopendiente',pagopendienteRender)
router.get('/nosotros',nosotrosRender)
router.get('/cuenta',cuentaRender)
router.get('/accountSetting',accountConfigRender)
router.get('/saldo',saldoRender)
router.get('/updateEmailClient',updateEmailClient)
router.get('/contact',contactRender)
router.post('/contact',validateContactForm,sendContactMail)
router.post('/cuenta',validateClientAccount,updatePasswordClient)
router.post('/updateEmailClient',validateEmail,verifiedEmailExist,updateEmail)
module.exports = router