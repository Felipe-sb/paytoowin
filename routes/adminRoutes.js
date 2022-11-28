const adminDashboardRender = require('../controllers/getControllers/adminDashboardRender');
const { getAllUsers } = require('../controllers/getControllers/getAllUsers');
const { getUserById } = require('../controllers/getControllers/getUserById');
const singUpAdminRender = require('../controllers/getControllers/registerAdminRender');
const sendDataForCharts = require('../controllers/getControllers/sendDataForCharts');
const { banUserById } = require('../controllers/postControllers/banUserById');
const registerAdmin = require('../controllers/postControllers/registerAdmin');
const { updateUserById } = require('../controllers/postControllers/updateUserByid');
const { validateAdminRegisterForm } = require('../middlewares/validateAdminRegisterForm');
const router = require('express').Router();
router.get('/', adminDashboardRender)
router.get('/data',sendDataForCharts)
router.get('/users',getAllUsers)
router.get('/register',singUpAdminRender)
router.get('/users/:id',getUserById)
router.post('/banUser',banUserById)
router.post('/updateUser',updateUserById)
router.post('/register',validateAdminRegisterForm,registerAdmin)
module.exports =router