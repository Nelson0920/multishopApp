import express from 'express'
import bcrypt from 'bcryptjs'
import prisma from '../config/prisma.js'

const router = express.Router()

// Obtener todos los clientes
router.get('/', async (req, res) => {
  try {
    const clients = await prisma.clients.findMany()
    if (clients.length > 0) {
      return res.status(200).json({ success: true, code:200, message: 'Clients found', clients })
    }else{
      return res.status(404).json({ success: false, code:404 , message: 'No clients found' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: 'Error fetching clients' })
  }
})

// Obtener un cliente por ID
router.get('/get/:id', async (req, res) => {
  try {
  const { id } = req.params

    const client = await prisma.clients.findUnique({ where: { id } })

    if (!client) return res.status(404).json({ success: false, message: 'Cliente no encontrado' })

    res.status(200).json({ success: true, code:200, message: 'Client found', client })
    
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: 'Error fetching client'})
  }
})

// Crear un nuevo cliente
router.post('/register', async (req, res) => {
  try {
    const { type, rif, id_categories_clients, id_sellers, id_accounting_accounts, id_PaymentConditions, id_RetentionISLRConcepts } = req.body
    const data = req.body

    if (!['client', 'provider'].includes(type)) {
      return res.status(400).json({ success: false, code: 400, message: 'Invalid type provided', data })
    }

    const existing = await prisma.clients.findMany({
      where: { rif, type }
    })

    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        code: 400,
        message: `The ${type} already exists`,
        data
      })
    }

    // Validaciones de relaciones
    const searchCategory = await prisma.categoriesClient.findUnique({
      where: { id: id_categories_clients }
    })
    if (!searchCategory) {
      return res.status(400).json({
        success: false,
        code: 400,
        message: 'Invalid category ID',
        data: id_categories_clients
      })
    }

    const searchSeller = await prisma.sellers.findUnique({
      where: { id: id_sellers }
    })
    if (!searchSeller) {
      return res.status(400).json({
        success: false,
        code: 400,
        message: 'Invalid Seller ID',
        data: id_sellers
      })
    }


    const searchAccounting = await prisma.accountingAccounts.findUnique({
      where: { id: id_accounting_accounts }
    })
    if (!searchAccounting) {
      return res.status(400).json({
        success: false,
        code: 400,
        message: 'Invalid accounting account ID',
        data: id_accounting_accounts
      })
    }

    const searchPayCondition = await prisma.paymentConditions.findUnique({
      where: { id: id_PaymentConditions }
    })
    if (!searchPayCondition) {
      return res.status(400).json({
        success: false,
        code: 400,
        message: 'Invalid payment condition ID',
        data: id_PaymentConditions
      })
    }

    const searchRetention = await prisma.retentionISLRConcepts.findUnique({
      where: { id: id_RetentionISLRConcepts }
    })
    if (!searchRetention) {
      return res.status(400).json({
        success: false,
        code: 400,
        message: 'Invalid ISLR retention concept ID',
        data: id_RetentionISLRConcepts
      })
    }

    const created = await prisma.clients.create({ data })

    res.status(200).json({
      success: true,
      code: 200,
      message: `${type.charAt(0).toUpperCase() + type.slice(1)} created successfully`,
      [type]: created
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      code: 500,
      message: 'Error creating client or provider',
      error
    })
  }
})

// Actualizar un cliente
router.put('/edit/:id', async (req, res) => {
  try {
    const { id } = req.params
    const data = req.body

    const search = await prisma.clients.findUnique({ where: { id } })

    if(search){
      const categoryClient = await prisma.categoriesClient.update({ 
        data,
        where: { id } 
      })
      res.status(200).json({ success: true, code:200, message: 'Client updated successfully', categoryClient })
    }else{
      res.status(404).json({ success: false, code:404, message: 'Client not found' })
    }

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, code:500, message: 'Error updating the client', error })
  }
})

// Eliminar un cliente
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params

    const search = await prisma.clients.findUnique({ where: { id } })

    if(search){
      const client = await prisma.clients.delete({ where: { id } })

      res.status(200).json({ success: true, code:200, message: 'Client deleted successfully', client })
    }else{
      res.status(404).json({ success: false, code:404, message: 'Client not found' })
    }

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, code:500, message: 'Error deleting the client', error })
  }
})

// --- Categorias Cliente ---

// Obtener todos las categorias de los clientes
router.get('/category', async (req, res) => {
  try {
    const clients = await prisma.categoriesClient.findMany()
    if (clients.length > 0) {
      return res.status(200).json({ success: true, code:200, message: 'Categories clients found', clients })
    }else{
      return res.status(404).json({ success: false, code:404 , message: 'No categories clients found' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, code:500, message: 'Error fetching categories clients' })
  }
})

// Obtener categoría de un cliente por ID
router.get('/category/:id', async (req, res) => {
  try {
  const { id } = req.params

    const client = await prisma.categoriesClient.findUnique({ where: { id } })

    if (!client) return res.status(404).json({ success: false, message: 'Category client not found' })

    res.status(200).json({ success: true, code:200, message: 'Category client found', client })
    
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: 'Error fetching category client'})
  }
})

// Crear nueva categoría de un cliente
router.post('/category/register', async (req, res) => {
  try {
    const data = req.body

    const existingCategory = await prisma.categoriesClient.findMany({ where: { name: data.name } })

    if (existingCategory.length > 0) {
      return res.status(400).json({ success: false, code:400, message: 'This category name already exists', data })
    }

    // const search = await prisma.costCenter.findFirst()

    // if (!search) {
    //   return res.status(404).json({ success: false, message: 'No available cost center found' })
    // }

    const categoryClient = await prisma.categoriesClient.create({data})

    res.status(200).json({ success: true, code:200,  message: 'Category client created successfully', categoryClient })

  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, code:500, message: 'Error creating category', error })
  }
})

// Actualizar categoría de un cliente
router.put('/category/edit/:id', async (req, res) => {
  try {
    const { id } = req.params
    const data = req.body

    const search = await prisma.categoriesClient.findUnique({ where: { id } })

    if(search){
      const categoryClient = await prisma.categoriesClient.update({ 
        data,
        where: { id } 
      })
      res.status(200).json({ success: true, code:200, message: 'Category client updated successfully', categoryClient })
    }else{
      res.status(404).json({ success: false, code:404, message: 'Category client not found' })
    }

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, code:500, message: 'Error updating the category', error })
  }
})

// Eliminar categoría de un cliente
router.delete('/category/delete/:id', async (req, res) => {
  try {
    const { id } = req.params

    const search = await prisma.categoriesClient.findUnique({ where: { id } })

    if(search){
      const categoryClient = await prisma.categoriesClient.delete({ where: { id } })

      res.status(200).json({ success: true, code:200, message: 'Category client deleted successfully', categoryClient })
    }else{
      res.status(404).json({ success: false, code:404, message: 'Category client not found' })
    }

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, code:500, message: 'Error deleting the category', error })
  }
})

export default router
