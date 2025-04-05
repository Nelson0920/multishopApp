import express from 'express'
import {authMiddleware} from '../middlewares/auth.js'

const router = express.Router()

// Auth - Users
import authUsers from '../controllers/auth.js'
import users from '../controllers/users.js'
// Categories
import categories from '../controllers/categories.js'
// Accounts 
import accounts from '../controllers/accounts.js'
// Clients
import clients from '../controllers/clients.js'
// Finanzas
import finance from '../controllers/finance.js'
// Sellers
import sellers from '../controllers/sellers.js'

// --- Routes ---

// Auth - Users
router.use('/auth', authUsers)
router.use('/user', authMiddleware, users)
// Categories
router.use('/category', categories)
// Accounts
router.use('/accounts', accounts)
// Clients
router.use('/clients', clients)
// Finance
router.use('/finance', finance)
// Sellers
router.use('/sellers', sellers)

export default router