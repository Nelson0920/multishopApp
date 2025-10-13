import express from 'express'

const router = express.Router()

// Categories
import categories from '../controllers/categories.js'
// Accounts 
import accounts from '../controllers/accounts.js'
// Finanzas
import finance from '../controllers/finance.js'
// Inventory
import inventory from '../controllers/inventory.js'
import inventoryEntities from '../controllers/inventoryEntities.js'
// Complementary
import complementary from '../controllers/complementary.js'


// --- Routes ---

// Categories
router.use('/category', categories)

// Accounts
router.use('/accounts', accounts)

// Finance
router.use('/finance', finance)

// Inventory
router.use('/inventory', inventory)
router.use('/inventory/entities', inventoryEntities)

// Complementary
router.use('/complementary', complementary)

export default router