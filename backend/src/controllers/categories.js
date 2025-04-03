import express from 'express'
import bcrypt from 'bcryptjs'
import prisma from '../config/prisma.js'

const router = express.Router()

// --- Categories ---

// Obtener todas las categorías
router.get('/', async (req, res) => {
  try {
    const categories = await prisma.categories.findMany()
    if (categories.length > 0) {
      return res.status(200).json({ success: true, code:200, message: 'Categories found', categories })
    }else{
      return res.status(404).json({ success: false, code:404 , message: 'No categories found' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: 'Error fetching categories' })
  }
})

// Obtener categoría por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const categories = await prisma.categories.findUnique({where : { id }})

    if (categories) {
      return res.status(200).json({ success: true, code:200, message: 'category found', categories })
    }else{
      return res.status(404).json({ success: false, code:404 , message: 'No category found' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: 'Error fetching category', error })
  }
})

// Crear una nueva categoría
router.post('/register', async (req, res) => {
  try {
    const { name, discount_percentage, profit_percentage, band_management } = req.body

    const existingCategory = await prisma.categories.findMany({
      where: { name }
    })

    if (existingCategory.length > 0) {
      return res.status(400).json({ success: false, message: 'The category already exists', name })
    }

    const search = await prisma.costCenter.findFirst()

    if (!search) {
      return res.status(404).json({ success: false, message: 'No available cost center found' })
    }

    const category = await prisma.categories.create({
      data: {
        name,
        discount_percentage,
        profit_percentage,
        id_cost_center: search.id,
        band_management
      }
    })

    res.status(201).json({ success: true, message: 'Category created successfully', category })

  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: 'Error creating category', error })
  }
})

// Actualizar una categoria
router.put('/edit/:id', async (req, res) => {
  try {
    const { id } = req.params
    const data = req.body

    const search = await prisma.categories.findUnique({ where: { id } })

    if(search){
      const category = await prisma.categories.update({ 
        data,
        where: { id } 
      })
      res.status(200).json({ success: true, code: 200 , message: 'Category updated successfully', category })
    }else{
      res.status(404).json({ success: false, code: 404 , message: 'Category not found' })
    }

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Error updating the category', error })
  }
})

// Eliminar una Categoria
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params

    const search = await prisma.categories.findUnique({ where: { id } })

    if(search){
      const deleteCategory = await prisma.categories.delete({ where: {id} })
      res.json({ success: true, code: 200, message: 'Category successfully deleted', deleteCategory })    
    }else{
      res.status(404).json({ success: false, code: 404 , message: 'Category not found' })
    }

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Error deleting the category'})
  }
})


// --- Centros de Costo ---

// Obtener todos los centros de costo
router.get('/cost/center', async (req, res) => {
  try {
    const costCenters = await prisma.costCenter.findMany()
    if (costCenters.length > 0) {
      return res.status(200).json({ success: true, code: 200, costCenters })
    } else {
      return res.status(404).json({ success: false, code: 404, message: 'No cost centers found' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: 'Error fetching cost centers' })
  }
})

// Crear o actualizar un centro de costo
router.post('/cost/center/change', async (req, res) => {
  try {
    const data = req.body

    // Validar que solo un valor sea 1 y los demás sean 0
    const values = [
      data.current_cost,
      data.average_cost,
      data.previous_cost,
      data.higher_current_average,
      data.lower_current_previous_average,
    ]

    const countOnes = values.filter(value => value === 1).length

    if (countOnes !== 1) {
      return res.status(400).json({
        success: false,
        message: 'Only one of the values must be 1, the others must be 0',
      })
    }

    // Buscar si ya existe un centro de costo
    let costCenter = await prisma.costCenter.findFirst()

    if (costCenter) {
      // Si existe, actualizarlo
      costCenter = await prisma.costCenter.update({
        where: { id: costCenter.id },
        data,
      })
      res.status(200).json({ success: true, code: 200, message: 'Cost center updated', costCenter })
    } else {
      // Si no existe, crearlo
      costCenter = await prisma.costCenter.create({ data })
      res.status(201).json({ success: true, code: 201, message: 'Cost center created', costCenter })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: 'Error updating cost center' })
  }
})

export default router