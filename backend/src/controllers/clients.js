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
    const data = req.body

    const existingClient = await prisma.clients.findMany({ where: { rif: data.rif } })

    if (existingClient.length > 0) {
      return res.status(400).json({ success: false, code:400, message: 'The client already exists', data })
    }

    // const search = await prisma.costCenter.findFirst()

    // if (!search) {
    //   return res.status(404).json({ success: false, message: 'No available cost center found' })
    // }

    // const category = await prisma.categories.create({
    //   data: {
    //     name,
    //     discount_percentage,
    //     profit_percentage,
    //     id_cost_center: search.id,
    //     band_management
    //   }
    // })

    // res.status(201).json({ success: true, message: 'Category created successfully', category })

  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: 'Error creating category', error })
  }
})

// Actualizar un cliente
router.put('/edit/:id', async (req, res) => {
  const { id } = req.params
  try {
    const updatedClient = await prisma.clients.update({
      where: { id: Number(id) },
      data: req.body,
    })

    res.json({ success: true, message: 'Cliente actualizado', updatedClient })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al actualizar el cliente' })
  }
})

// Eliminar un cliente
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params
  try {
    await prisma.clients.delete({ where: { id: Number(id) } })
    res.json({ success: true, message: 'Cliente eliminado' })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al eliminar el cliente' })
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
