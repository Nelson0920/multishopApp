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
// Inventory
import inventory from '../controllers/inventory.js'
import inventoryEntities from '../controllers/inventoryEntities.js'
// Complementary
import complementary from '../controllers/complementary.js'
// Images
import images from '../controllers/img.js'


// --- Routes ---

// Auth - Users
router.use('/auth', authUsers)
//router.use('/user', authMiddleware, users)
router.use('/user', users)

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

// Inventory
router.use('/inventory', inventory)
router.use('/inventory/entities', inventoryEntities)

// Complementary
router.use('/complementary', complementary)

// Images
router.use('/images', images)

export default router