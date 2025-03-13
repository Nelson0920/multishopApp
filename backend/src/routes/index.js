const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');


// Rutas individuales
const exampleRoutes = require('../controllers/example');
const authUsers = require('../controllers/auth');
const users = require('../controllers/users');


// Auth
router.use('/auth', authUsers);


// Users
router.use('/user', authMiddleware, users);


// Ejemplo
router.use('/example', authMiddleware, exampleRoutes);


module.exports = router;