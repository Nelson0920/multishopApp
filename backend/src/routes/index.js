const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');


// Rutas individuales
const exampleRoutes = require('../controllers/example');
const authUsers = require('../controllers/auth');


// Auth
router.use('/auth', authUsers);


// Ejemplo
router.use('/example', authMiddleware, exampleRoutes);




module.exports = router;