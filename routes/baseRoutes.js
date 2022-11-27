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
const reporteCuentaRender = require('../controllers/getControllers/reporteCuentaRender');
const sendContactMail = require('../controllers/postControllers/sendContactMail');
const sendReporteCuentaMail = require('../controllers/postControllers/sendReporteCuentaMail');
const { validateContactForm } = require('../middlewares/validateContactForm');

const router = require('express').Router();
router.get('/',indexRender)
router.get('/terminos',terminosRender)
router.get('/faqs',faqsRender)
router.get('/pagoexitoso',pagoexitosoRender)
router.get('/pagorechazado',pagorechazadoRender)
router.get('/pagopendiente',pagopendienteRender)
router.get('/nosotros',nosotrosRender)
router.get('/reportecuenta',reporteCuentaRender)
router.get('/contact',contactRender)

router.post('/reportecuenta',sendReporteCuentaMail)
router.post('/contact',validateContactForm,sendContactMail)
module.exports = router