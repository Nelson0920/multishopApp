// Dependencies
import express from 'express'
// Helpers
import { InventoryEntities2 } from './helpers/inventoryEntitiesTwo.js'
import { InventoryEntities3 } from './helpers/inventoryEntitiesThree.js'

const router = express.Router()

// -- Información Adicional --

// Obtener toda la Información Adicional
router.get('/additional/info/all', async (req, res) => {
  try {
    const info = await InventoryEntities2.getAdditionalInfoAll()
    return res.status(info.code).json(info)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, code:500, message: 'Error get the all Additional Info ', error })
  }
})

// Obtener una Información Adicional por ID
router.get('/additional/info/:id', async (req, res) => {
  try {
    const {id} = req.params
    const info = await InventoryEntities2.getAdditionalInfo(id)
    return res.status(info.code).json(info)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, code:500, message: 'Error get the Additional Info', error })
  }
})

// Crear una Información Adicional
router.post('/additional/info/register', async (req, res) => {
  try {
    const data = req.body
    const info = await InventoryEntities2.createAdditionalInfo(data)
    return res.status(info.code).json(info)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, code:500, message: 'Error creating the Additional Info', error })
  }
})

// Actualizar una Información Adicional
router.put('/additional/info/edit/:id', async (req, res) => {
  try {
    const { id } = req.params
    const data = req.body

    const info = await InventoryEntities2.editAdditionalInfo(id, data)
    return res.status(info.code).json(info)

  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, code:500, message: 'Error updating Additional Info', error })
  }
})

// Eliminar una Información Adicional
router.delete('/additional/info/delete/:id', async (req, res) => {
  try {
    const { id } = req.params

    const info = await InventoryEntities2.deleteAdditionalInfo(id)
    return res.status(info.code).json(info)

  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, code: 500, message: 'Error deleting Additional Info' })
  }
})

//  -- Producto Compuesto --

// Obtener todos los Productos Compuestos
router.get('/composite/products', async (req, res) => {
  try {
    const info = await InventoryEntities2.getCompositeProducts()
    return res.status(info.code).json(info)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, code:500, message: 'Error get the all Composite Products ', error })
  }
})

// Obtener un Producto Compuesto por ID
router.get('/composite/product/:id', async (req, res) => {
  try {
    const {id} = req.params
    const product = await InventoryEntities2.getCompositeProduct(id)
    return res.status(product.code).json(product)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, code:500, message: 'Error get the Composite Product', error })
  }
})

// Crear un Producto Compuesto
router.post('/composite/product/register', async (req, res) => {
  try {
    const data = req.body
    const info = await InventoryEntities2.createCompositeProduct(data)
    return res.status(info.code).json(info)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, code:500, message: 'Error creating the Composite Product', error })
  }
})

// Actualizar un Producto Compuesto
router.put('/composite/product/edit/:id', async (req, res) => {
  try {
    const { id } = req.params
    const data = req.body

    const info = await InventoryEntities2.editCompositeProduct(id, data)
    return res.status(info.code).json(info)

  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, code:500, message: 'Error updating Composite Product', error })
  }
})

// Eliminar un Producto Compuesto
router.delete('/composite/product/delete/:id', async (req, res) => {
  try {
    const { id } = req.params

    const info = await InventoryEntities2.deleteCompositeProduct(id)
    return res.status(info.code).json(info)

  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, code: 500, message: 'Error deleting Composite Product' })
  }
})

// -- Alertas de Producto --

// Obtener todos las Alertas de Productos
router.get('/alert/products', async (req, res) => {
  try {
    const info = await InventoryEntities3.getAlertProducts()
    return res.status(info.code).json(info)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, code:500, message: 'Error get the all Alert Products ', error })
  }
})

// Obtener un Alerta de Producto por ID
router.get('/alert/product/:id', async (req, res) => {
  try {
    const {id} = req.params
    const product = await InventoryEntities3.getAlertProduct(id)
    return res.status(product.code).json(product)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, code:500, message: 'Error get the Alert Product', error })
  }
})

// Crear un Alerta de Producto
router.post('/alert/product/register', async (req, res) => {
  try {
    const data = req.body
    const info = await InventoryEntities3.createAlertProduct(data)
    return res.status(info.code).json(info)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, code:500, message: 'Error creating the Alert Product', error })
  }
})

// Actualizar un Alerta de Producto
router.put('/alert/product/edit/:id', async (req, res) => {
  try {
    const { id } = req.params
    const data = req.body

    const info = await InventoryEntities3.editAlertProduct(id, data)
    return res.status(info.code).json(info)

  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, code:500, message: 'Error updating Alert Product', error })
  }
})

// Eliminar un Alerta de Producto
router.delete('/alert/product/delete/:id', async (req, res) => {
  try {
    const { id } = req.params

    const info = await InventoryEntities3.deleteAlertProduct(id)
    return res.status(info.code).json(info)

  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, code: 500, message: 'Error deleting Alert Product' })
  }
})

// -- Estadísitcas de Compra --

// Obtener todos las Estadisticas de Productos
router.get('/purchase/statistics', async (req, res) => {
  try {
    const info = await InventoryEntities3.getPurchaseStatistics()
    return res.status(info.code).json(info)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, code:500, message: 'Error get the all Purchase Statisticss ', error })
  }
})

// Obtener una Estadística de Compra por ID
router.get('/purchase/statistic/:id', async (req, res) => {
  try {
    const {id} = req.params
    const product = await InventoryEntities3.getPurchaseStatistic(id)
    return res.status(product.code).json(product)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, code:500, message: 'Error get the Purchase Statistics', error })
  }
})

// Crear una Estadística de Compra
router.post('/purchase/statistic/register', async (req, res) => {
  try {
    const data = req.body
    const info = await InventoryEntities3.createPurchaseStatistic(data)
    return res.status(info.code).json(info)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, code:500, message: 'Error creating the Purchase Statistics', error })
  }
})

// Actualizar una Estadística de Compra
router.put('/purchase/statistic/edit/:id', async (req, res) => {
  try {
    const { id } = req.params
    const data = req.body

    const info = await InventoryEntities3.editPurchaseStatistic(id, data)
    return res.status(info.code).json(info)

  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, code:500, message: 'Error updating Purchase Statistics', error })
  }
})

// Eliminar una Estadística de Compra
router.delete('/purchase/statistic/delete/:id', async (req, res) => {
  try {
    const { id } = req.params

    const info = await InventoryEntities3.deletePurchaseStatistic(id)
    return res.status(info.code).json(info)

  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, code: 500, message: 'Error deleting Purchase Statistics' })
  }
})

// -- Funciones Web --

// Obtener todos las Funciones Web
router.get('/web/features', async (req, res) => {
  try {
    const info = await InventoryEntities3.getWebFeatures()
    return res.status(info.code).json(info)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, code:500, message: 'Error get the all Purchase Statisticss ', error })
  }
})

// Obtener una Funcion Web por ID
router.get('/web/feature/:id', async (req, res) => {
  try {
    const {id} = req.params
    const product = await InventoryEntities3.getWebFeature(id)
    return res.status(product.code).json(product)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, code:500, message: 'Error get the Purchase Statistics', error })
  }
})

// Crear una Funcion Web
router.post('/web/feature/register', async (req, res) => {
  try {
    const data = req.body
    const info = await InventoryEntities3.createWebFeature(data)
    return res.status(info.code).json(info)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, code:500, message: 'Error creating the Purchase Statistics', error })
  }
})

// Actualizar una Funcion Web
router.put('/web/feature/edit/:id', async (req, res) => {
  try {
    const { id } = req.params
    const data = req.body

    const info = await InventoryEntities3.editWebFeature(id, data)
    return res.status(info.code).json(info)

  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, code:500, message: 'Error updating Purchase Statistics', error })
  }
})

// Eliminar una Funcion Web
router.delete('/web/feature/delete/:id', async (req, res) => {
  try {
    const { id } = req.params

    const info = await InventoryEntities3.deleteWebFeature(id)
    return res.status(info.code).json(info)

  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, code: 500, message: 'Error deleting Purchase Statistics' })
  }
})

export default router