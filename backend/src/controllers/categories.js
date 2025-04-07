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
      id_categories,
      account_sales, auxiliary1_sales, auxiliary2_sales,
      account_buy, auxiliary1_buy, auxiliary2_buy,
      account_consumos, auxiliary1_consumos, auxiliary2_consumos,
      account_devbuy, auxiliary1_devbuy, auxiliary2_devbuy,
      account_tax, auxiliary1_tax, auxiliary2_tax
    } = req.body;

    // Validar existencia de la categoría
    const existingCategory = await prisma.categories.findUnique({
      where: { id: id_categories }
    });

    if (!existingCategory) {
      return res.status(404).json({ success: false, message: 'No existe la categoria' });
    }

    // Función para validar cuentas y auxiliares
    const validateAccountAndAuxiliaries = async (accountCode, aux1, aux2, label) => {
      const account = await prisma.accountingAccounts.findUnique({
        where: { code_account: accountCode }
      });

      if (!account) {
        throw new Error(`La cuenta ${label} (${accountCode}) no existe`);
      }

      const auxiliary1 = await prisma.auxiliariesAccounts.findUnique({
        where: { code_auxiliary: aux1 }
      });

      if (!auxiliary1) {
        throw new Error(`El auxiliar 1 de ${label} (${aux1}) no existe`);
      }

      const auxiliary2 = await prisma.auxiliariesAccounts.findUnique({
        where: { code_auxiliary: aux2 }
      });

      if (!auxiliary2) {
        throw new Error(`El auxiliar 2 de ${label} (${aux2}) no existe`);
      }

      if (account.auxiliary1_initials !== aux1 || account.auxiliary2_initials !== aux2) {
        throw new Error(`Los auxiliares de ${label} no coinciden con las iniciales requeridas`);
      }

      return { account, auxiliary1, auxiliary2 };
    };

    // Validar cada conjunto de cuenta + auxiliares
    await validateAccountAndAuxiliaries(account_sales, auxiliary1_sales, auxiliary2_sales, 'ventas');
    await validateAccountAndAuxiliaries(account_buy, auxiliary1_buy, auxiliary2_buy, 'compras');
    await validateAccountAndAuxiliaries(account_consumos, auxiliary1_consumos, auxiliary2_consumos, 'consumos');
    await validateAccountAndAuxiliaries(account_devbuy, auxiliary1_devbuy, auxiliary2_devbuy, 'devolución de compras');
    await validateAccountAndAuxiliaries(account_tax, auxiliary1_tax, auxiliary2_tax, 'impuestos');

    // Si pasa todas las validaciones, crear el registro
    const newAccountCategory = await prisma.account_Categories.create({
      data: {
        id_categories,
        account_sales,
        auxiliary1_sales,
        auxiliary2_sales,
        account_buy,
        auxiliary1_buy,
        auxiliary2_buy,
        account_consumos,
        auxiliary1_consumos,
        auxiliary2_consumos,
        account_devbuy,
        auxiliary1_devbuy,
        auxiliary2_devbuy,
        account_tax,
        auxiliary1_tax,
        auxiliary2_tax
      }
    });

    res.status(201).json({ success: true, message: 'Categoría contable registrada correctamente', category: newAccountCategory });

  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: error.message || 'Error al registrar la categoría contable' });
  }
});


// Actualizar la categoria de una cuenta
router.put('/account/edit/:id', async (req, res) => {
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