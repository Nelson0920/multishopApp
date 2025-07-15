// Dependencies
import express from 'express'
import prisma from '../config/prisma.js'
// Helpers
import { Inventory } from './helpers/inventory.js'
import { InventoryEntities } from './helpers/inventoryEntitiesOne.js'
// import { Costs } from './helpers/costs.js'
// import { AlternateCodes } from './helpers/alternateCodes.js'
// import { TypeCurrency } from './helpers/typeCurrency.js'

const router = express.Router()

// -- Inventario --

// Obtener todos los Inventarios
router.get('/all', async (req, res) => {
  try {
    const inventories = await Inventory.getInventories()
    return res.status(inventories.code).json(inventories)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, code:500, message: 'Error get the inventories', error })
  }
})

// Obtener un inventario por ID
router.get('/get/:id', async (req, res) => {
  try {
    const {id} = req.params
    const inventory = await Inventory.getInventory(id)
    return res.status(inventory.code).json(inventory)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, code:500, message: 'Error get the inventory', error })
  }
})

// Crear un nuevo Inventario
router.post('/register', async (req, res) => {
  try {
    const data = req.body
    const inventory = await Inventory.createInventory(data)
    return res.status(inventory.code).json(inventory)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, code:500, message: 'Error creating the inventory', error })
  }
})

// Actualizar un Inventario
router.put('/edit/:id', async (req, res) => {
  try {
    const { id } = req.params
    const data = req.body

    const inventory = await Inventory.editInventory(id, data)
    return res.status(inventory.code).json(inventory)

  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, code:500, message: 'Error updating the inventory', error })
  }
})

// Eliminar un Inventario
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params

    const inventory = await Inventory.deleteInventory(id)
    return res.status(inventory.code).json(inventory)

  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, code: 500, message: 'Error deleting inventory' })
  }
})


// -- Precios --

// Obtener todos los precios
router.get('/prices', async (req, res) => {
  try {
    const prices = await InventoryEntities.getPrices()
    return res.status(prices.code).json(prices)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, code:500, message: 'Error get the prices', error })
  }
})

// Obtener un precio por ID
router.get('/price/:id', async (req, res) => {
  try {
    const {id} = req.params
    const price = await InventoryEntities.getPrice(id)
    return res.status(price.code).json(price)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, code:500, message: 'Error get the price', error })
  }
})

// Crear un nuevo Precio
router.post('/price/register', async (req, res) => {
  try {
    const data = req.body
    const price = await InventoryEntities.createPrice(data)
    return res.status(price.code).json(price)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, code:500, message: 'Error creating price', error })
  }
})

// Actualizar un Precio
router.put('/price/edit/:id', async (req, res) => {
  try {
    const { id } = req.params
    const data = req.body

    const price = await InventoryEntities.editPrice(id, data)
    return res.status(price.code).json(price)

  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, code:500, message: 'Error updating price', error })
  }
})

// Eliminar un Precio
router.delete('/price/delete/:id', async (req, res) => {
  try {
    const { id } = req.params

    const price = await InventoryEntities.deletePrice(id)
    return res.status(price.code).json(price)

  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, code: 500, message: 'Error deleting price' })
  }
})


// -- Costos --

// Obtener todos los costos
router.get('/costs', async (req, res) => {
  try {
    const costs = await InventoryEntities.getCosts()
    return res.status(costs.code).json(costs)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, code:500, message: 'Error get the costs', error })
  }
})

// Obtener un costo por ID
router.get('/cost/:id', async (req, res) => {
  try {
    const {id} = req.params
    const cost = await InventoryEntities.getCost(id)
    return res.status(cost.code).json(cost)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, code:500, message: 'Error get the cost', error })
  }
})

// Crear un nuevo Costo
router.post('/cost/register', async (req, res) => {
  try {
    const data = req.body
    const cost = await InventoryEntities.createCost(data)
    return res.status(cost.code).json(cost)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, code:500, message: 'Error creating the cost', error })
  }
})

// Actualizar un Costo
router.put('/cost/edit/:id', async (req, res) => {
  try {
    const { id } = req.params
    const data = req.body

    const cost = await InventoryEntities.editCost(id, data)
    return res.status(cost.code).json(cost)

  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, code:500, message: 'Error updating cost', error })
  }
})

// Eliminar un Costo
router.delete('/cost/delete/:id', async (req, res) => {
  try {
    const { id } = req.params

    const cost = await InventoryEntities.deleteCost(id)
    return res.status(cost.code).json(cost)

  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, code: 500, message: 'Error deleting cost' })
  }
})

// -- Codigos Alternos --

// Obtener todos los Códigos Alternos
router.get('/alternate/codes', async (req, res) => {
  try {
    const AlternateCodes = await InventoryEntities.getAlternateCodes()
    return res.status(AlternateCodes.code).json(AlternateCodes)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, code:500, message: 'Error get the AlternateCodes', error })
  }
})

// Obtener un Código Alterno por ID
router.get('/alternate/code/:id', async (req, res) => {
  try {
    const {id} = req.params
    const alternateCode = await InventoryEntities.getAlternateCode(id)
    return res.status(alternateCode.code).json(alternateCode)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, code:500, message: 'Error get the AlternateCode', error })
  }
})

// Crear un nuevo Código Alterno
router.post('/alternate/code/register', async (req, res) => {
  try {
    const data = req.body
    const alternateCode = await InventoryEntities.createAlternateCode(data)
    return res.status(alternateCode.code).json(alternateCode)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, code:500, message: 'Error creating the alternateCode', error })
  }
})

// Actualizar un Código Alterno
router.put('/alternate/code/edit/:id', async (req, res) => {
  try {
    const { id } = req.params
    const data = req.body

    const alternateCode = await InventoryEntities.editAlternateCode(id, data)
    return res.status(alternateCode.code).json(alternateCode)

  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, code:500, message: 'Error updating alternateCode', error })
  }
})

// Eliminar un Código Alterno
router.delete('/alternate/code/delete/:id', async (req, res) => {
  try {
    const { id } = req.params

    const alternateCode = await InventoryEntities.deleteAlternateCode(id)
    return res.status(alternateCode.code).json(alternateCode)

  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, code: 500, message: 'Error deleting alternateCode' })
  }
})

// -- Tipo de Moneda --

// Obtener todos los Tipos de Monedas
router.get('/types/currency', async (req, res) => {
  try {
    const currency = await InventoryEntities.getTypesCurrency()
    return res.status(currency.code).json(currency)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, code:500, message: 'Error get the types of currency ', error })
  }
})

// Obtener un Tipo de Moneda por ID
router.get('/type/currency/:id', async (req, res) => {
  try {
    const {id} = req.params
    const currency = await InventoryEntities.getTypeCurrency(id)
    return res.status(currency.code).json(currency)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, code:500, message: 'Error get the type currency', error })
  }
})

// Crear un nuevo Tipo de Moneda
router.post('/type/currency/register', async (req, res) => {
  try {
    const data = req.body
    const cost = await InventoryEntities.createCost(data)
    return res.status(cost.code).json(cost)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, code:500, message: 'Error creating the cost', error })
  }
})

// Actualizar un Tipo de Moneda
router.put('/type/currency/edit/:id', async (req, res) => {
  try {
    const { id } = req.params
    const data = req.body

    const cost = await InventoryEntities.editCost(id, data)
    return res.status(cost.code).json(cost)

  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, code:500, message: 'Error updating cost', error })
  }
})

// Eliminar un Tipo de Moneda
router.delete('/type/currency/delete/:id', async (req, res) => {
  try {
    const { id } = req.params

    const cost = await InventoryEntities.deleteCost(id)
    return res.status(cost.code).json(cost)

  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, code: 500, message: 'Error deleting cost' })
  }
})



export default router
