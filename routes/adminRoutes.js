const { getAllUsers } = require('../controllers/getControllers/getAllUsers');
const { getUserById } = require('../controllers/getControllers/getUserById');
const { banUserById } = require('../controllers/postControllers/banUserById');
const { updateUserById } = require('../controllers/postControllers/updateUserByid');

const router = require('express').Router();
router.get('/users',getAllUsers)
router.get('/users/:id',getUserById)
router.post('/banUser',banUserById)
router.post('/updateUser',updateUserById)
module.exports =router