import express from 'express'
import { authMiddleware } from '../middlewares/auth.js'

const router = express.Router()

// Auth - Users
import authUsers from '../controllers/auth.js'
import users from '../controllers/users.js'
// Company -Branches
import company from '../controllers/company.js'
// Clients
import clients from '../controllers/clients.js'
// Sellers
import sellers from '../controllers/sellers.js'
// Images
import images from '../controllers/img.js'


// --- Routes ---

// Auth - Users
router.use('/auth', authUsers)
//router.use('/user', authMiddleware, users)
router.use('/user', users)

// Company - Branches
router.use('/company', company)

// Clients
router.use('/clients', clients)

// Sellers
router.use('/sellers', sellers)

// Images
router.use('/images', images)

export default router