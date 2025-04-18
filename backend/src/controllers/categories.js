import express from 'express'
import bcrypt from 'bcryptjs'
import prisma from '../config/prisma.js'

import { validateAccountAndAuxiliaries } from './helpers/funct_categories.js'

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
router.get('/get/:id', async (req, res) => {
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
    const data = req.body

    const existingCategory = await prisma.categories.findMany({
      where: { name: data.name }
    })

    if (existingCategory.length > 0) {
      return res.status(400).json({ success: false, message: 'The category already exists', name: data.name})
    }

    const search = await prisma.costCenter.findFirst()

    if (!search) {
      return res.status(404).json({ success: false, message: 'No available cost center found' })
    }

    const category = await prisma.categories.create({...data, id_cost_center: search.id,})

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

// --- Categorias de Cuentas ---

// Obtener todas las categorías de cuentas
router.get('/accounts', async (req, res) => {
  try {
    const categories = await prisma.account_Categories.findMany()
    if (categories.length > 0) {
      return res.status(200).json({ success: true, code:200, message: 'Account categories found', categories })
    }else{
      return res.status(404).json({ success: false, code:404 , message: 'Account categories not found' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: 'Error fetching account categories' })
  }
})

// Obtener categoría de una cuenta por ID
router.get('/account/:id', async (req, res) => {
  try {
    const { id } = req.params
    const categories = await prisma.account_Categories.findUnique({where : { id }})

    if (categories) {
      return res.status(200).json({ success: true, code:200, message: 'Account category found', categories })
    }else{
      return res.status(404).json({ success: false, code:404 , message: 'Account category not found' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: 'Error fetching account category', error })
  }
})

// Crear una nueva categoría para una cuenta
router.post('/account/register', async (req, res) => {
  try {
    const {
      id_Categories,
      account_Sales, auxiliary1_Sales, auxiliary2_Sales,
      account_buy, auxiliary1_buy, auxiliary2_buy,
      account_consumos, auxiliary1_consumos, auxiliary2_consumos,
      account_devbuy, auxiliary1_devbuy, auxiliary2_devbuy,
      account_tax, auxiliary1_tax, auxiliary2_tax
    } = req.body;

    const data = req.body

    // Validar existencia de la categoría
    const existingCategory = await prisma.categories.findUnique({
      where: { id: id_Categories }
    });

    if (!existingCategory) {
      return res.status(404).json({ success: false, code : 404 , message: 'Category not found' });
    }

    const existingCategoryAccount = await prisma.account_Categories.findMany({ where : {id_Categories : id_Categories} })
    
    if (existingCategoryAccount.length > 0) {
      return res.status(400).json({ success: false, code: 400, message: 'The accounting category already exists', name: id_Categories });
    }

    // Solo validar si la cuenta principal existe
    if (account_Sales) {
      await validateAccountAndAuxiliaries(account_Sales, auxiliary1_Sales, auxiliary2_Sales, 'ventas');
    }
    if (account_buy) {
      await validateAccountAndAuxiliaries(account_buy, auxiliary1_buy, auxiliary2_buy, 'compras');
    }
    if (account_consumos) {
      await validateAccountAndAuxiliaries(account_consumos, auxiliary1_consumos, auxiliary2_consumos, 'consumos');
    }
    if (account_devbuy) {
      await validateAccountAndAuxiliaries(account_devbuy, auxiliary1_devbuy, auxiliary2_devbuy, 'devolución de compras');
    }
    if (account_tax) {
      await validateAccountAndAuxiliaries(account_tax, auxiliary1_tax, auxiliary2_tax, 'impuestos');
    }

    // Crear el registro
    const newAccountCategory = await prisma.account_Categories.create({ data });

    res.status(200).json({ success: true, code:200 , message: 'Account category registered succesfully', category: newAccountCategory });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, code: 500, message: 'Error creating account category', error })

  }
});

// Actualizar la categoria de una cuenta
router.put('/account/edit/:id', async (req, res) => {
  try {
    const {
      id_Categories,
      account_Sales, auxiliary1_Sales, auxiliary2_Sales,
      account_buy, auxiliary1_buy, auxiliary2_buy,
      account_consumos, auxiliary1_consumos, auxiliary2_consumos,
      account_devbuy, auxiliary1_devbuy, auxiliary2_devbuy,
      account_tax, auxiliary1_tax, auxiliary2_tax
    } = req.body
    const data = req.body
    const { id } = req.params

    // Validar existencia de la cateogoría de la cuenta
    const existingAccount = await prisma.account_Categories.findUnique({
      where: { id }
    });

    if (!existingAccount) {
      return res.status(404).json({ success: false, code: 404, message: 'Account Category not found' });
    }

    // Validar existencia de la categoría
    const existingCategory = await prisma.categories.findUnique({
      where: { id: id_Categories }
    });

    if (!existingCategory) {
      return res.status(404).json({ success: false, code: 404, message: 'Category not found' });
    }

    // Solo validar si la cuenta principal existe
    if (account_Sales) {
      await validateAccountAndAuxiliaries(account_Sales, auxiliary1_Sales, auxiliary2_Sales, 'ventas');
    }
    if (account_buy) {
      await validateAccountAndAuxiliaries(account_buy, auxiliary1_buy, auxiliary2_buy, 'compras');
    }
    if (account_consumos) {
      await validateAccountAndAuxiliaries(account_consumos, auxiliary1_consumos, auxiliary2_consumos, 'consumos');
    }
    if (account_devbuy) {
      await validateAccountAndAuxiliaries(account_devbuy, auxiliary1_devbuy, auxiliary2_devbuy, 'devolución de compras');
    }
    if (account_tax) {
      await validateAccountAndAuxiliaries(account_tax, auxiliary1_tax, auxiliary2_tax, 'impuestos');
    }

    // Crear el registro
    const newAccountCategory = await prisma.account_Categories.update({
      data,
      where: { id }
    });

    res.status(200).json({ success: true, code:200, message: 'Account Category updated succesfully', category: newAccountCategory });

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, code:500, message: 'Error updating the category', error })
  }
})

// Eliminar la Categoria de una cuenta
router.delete('/account/delete/:id', async (req, res) => {
  try {
    const { id } = req.params

    const search = await prisma.account_Categories.findUnique({ where: { id } })

    if(search){
      const deleteCategory = await prisma.account_Categories.delete({ where: {id} })
      res.json({ success: true, code: 200, message: 'Account category successfully deleted', deleteCategory })    
    }else{
      res.status(404).json({ success: false, code: 404 , message: 'Account category not found' })
    }

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Error deleting the account category'})
  }
})

export default router