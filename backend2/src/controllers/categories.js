import express from 'express'
import bcrypt from 'bcryptjs'
import prisma from '../config/prisma.js'
import { ObjectId } from 'mongodb'

import { validateAccountAndAuxiliaries } from './helpers/funct_categories.js'

const router = express.Router()

// --- Categories ---
router.get('/', async (req, res) => {
  try {
    const { name } = req.query // ejemplo: /api/categories?name=ropa

    // Condición dinámica de búsqueda
    const whereCondition = name
      ? { name: { contains: name, mode: 'insensitive' } }
      : {}

    // Buscar categorías (todas o filtradas)
    const categories = await prisma.categories.findMany({
      where: whereCondition,
    })

    if (!categories.length) {
      return res
        .status(404)
        .json({ success: false, code: 404, message: 'No categories found' })
    }

    const categoriesWithAccounts = await Promise.all(
      categories.map(async (category) => {
        // Buscar relación en Account_Categories
        const accountCat = await prisma.account_Categories.findFirst({
          where: { id_Categories: category.id },
        })

        // Buscar el centro de costos
        let costCenterData = null
        if (category.id_cost_center) {
          costCenterData = await prisma.costCenter.findUnique({
            where: { id: category.id_cost_center },
            select: {
              id: true,
              current_cost: true,
              average_cost: true,
              previous_cost: true,
              higher_current_average: true,
              lower_current_previous_average: true,
              createdAt: true,
            },
          })
        }

        // Funciones auxiliares
        const getAccountData = async (id) => {
          if (!id || !ObjectId.isValid(id)) return null
          const account = await prisma.accountingAccounts.findUnique({ where: { id } })
          if (!account) return null
          return {
            id: account.id,
            name: account.name,
            code_account: account.code_account,
            auxiliary1_initials: account.auxiliary1_initials,
            auxiliary2_initials: account.auxiliary2_initials,
            category_account: account.category_account,
          }
        }

        const getAuxiliaryData = async (id) => {
          if (!id || !ObjectId.isValid(id)) return null
          const aux = await prisma.auxiliariesAccounts.findUnique({ where: { id } })
          if (!aux) return null
          return {
            id: aux.id,
            name: aux.name,
            auxiliary_code: aux.auxiliary_code,
          }
        }

        // Si NO existe relación, devolver estructura vacía
        if (!accountCat) {
          return {
            id: category.id,
            name: category.name,
            discount_percentage: category.discount_percentage,
            profit_percentage: category.profit_percentage,
            cost_center: costCenterData || {},
            createdAt: category.createdAt,
            accounts: {
              id_accounting_account: null,
              account_Sales: null,
              auxiliary1_Sales: null,
              auxiliary2_Sales: null,
              account_buy: null,
              auxiliary1_buy: null,
              auxiliary2_buy: null,
              account_consumos: null,
              auxiliary1_consumos: null,
              auxiliary2_consumos: null,
              account_devbuy: null,
              auxiliary1_devbuy: null,
              auxiliary2_devbuy: null,
              account_tax: null,
              auxiliary1_tax: null,
              auxiliary2_tax: null,
            },
          }
        }

        // Si existe relación, construir objeto completo
        const detailedAccounts = {
          id_accounting_account: accountCat.id,
          account_Sales: await getAccountData(accountCat.account_Sales),
          auxiliary1_Sales: await getAuxiliaryData(accountCat.auxiliary1_Sales),
          auxiliary2_Sales: await getAuxiliaryData(accountCat.auxiliary2_Sales),
          account_buy: await getAccountData(accountCat.account_buy),
          auxiliary1_buy: await getAuxiliaryData(accountCat.auxiliary1_buy),
          auxiliary2_buy: await getAuxiliaryData(accountCat.auxiliary2_buy),
          account_consumos: await getAccountData(accountCat.account_consumos),
          auxiliary1_consumos: await getAuxiliaryData(accountCat.auxiliary1_consumos),
          auxiliary2_consumos: await getAuxiliaryData(accountCat.auxiliary2_consumos),
          account_devbuy: await getAccountData(accountCat.account_devbuy),
          auxiliary1_devbuy: await getAuxiliaryData(accountCat.auxiliary1_devbuy),
          auxiliary2_devbuy: await getAuxiliaryData(accountCat.auxiliary2_devbuy),
          account_tax: await getAccountData(accountCat.account_tax),
          auxiliary1_tax: await getAuxiliaryData(accountCat.auxiliary1_tax),
          auxiliary2_tax: await getAuxiliaryData(accountCat.auxiliary2_tax),
        }

        return {
          id: category.id,
          name: category.name,
          discount_percentage: category.discount_percentage,
          profit_percentage: category.profit_percentage,
          cost_center: costCenterData || {},
          createdAt: category.createdAt,
          accounts: detailedAccounts,
        }
      })
    )

    res.status(200).json({
      success: true,
      code: 200,
      message: 'Categories found',
      data: categoriesWithAccounts,
    })
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ success: false, message: 'Error fetching categories', error: error.message })
  }
})

// Obtener categoría por ID
router.get('/get/:id', async (req, res) => {
  try {
    const { id } = req.params

    // Buscar la categoría
    const category = await prisma.categories.findUnique({ where: { id } })

    if (!category) {
      return res.status(404).json({
        success: false,
        code: 404,
        message: 'No category found'
      })
    }

    // Buscar relación con Account_Categories
    const accountCat = await prisma.account_Categories.findFirst({
      where: { id_Categories: category.id },
    })

    // Buscar información del centro de costos
    let costCenterData = null
    if (category.id_cost_center) {
      costCenterData = await prisma.costCenter.findUnique({
        where: { id: category.id_cost_center },
        select: {
          id: true,
          current_cost: true,
          average_cost: true,
          previous_cost: true,
          higher_current_average: true,
          lower_current_previous_average: true,
          createdAt: true,
        },
      })
    }

    // Funciones auxiliares para obtener info detallada
    const getAccountData = async (id) => {
      if (!id || !ObjectId.isValid(id)) return null
      const account = await prisma.accountingAccounts.findUnique({ where: { id } })
      if (!account) return null
      return {
        id: account.id,
        name: account.name,
        code_account: account.code_account,
        auxiliary1_initials: account.auxiliary1_initials,
        auxiliary2_initials: account.auxiliary2_initials,
        category_account: account.category_account,
      }
    }

    const getAuxiliaryData = async (id) => {
      if (!id || !ObjectId.isValid(id)) return null
      const aux = await prisma.auxiliariesAccounts.findUnique({ where: { id } })
      if (!aux) return null
      return {
        id: aux.id,
        name: aux.name,
        auxiliary_code: aux.auxiliary_code,
      }
    }

    // Construir objeto accounts con estructura estándar
    let detailedAccount = {
      id_accounting_account: null,
      account_Sales: null,
      auxiliary1_Sales: null,
      auxiliary2_Sales: null,
      account_buy: null,
      auxiliary1_buy: null,
      auxiliary2_buy: null,
      account_consumos: null,
      auxiliary1_consumos: null,
      auxiliary2_consumos: null,
      account_devbuy: null,
      auxiliary1_devbuy: null,
      auxiliary2_devbuy: null,
      account_tax: null,
      auxiliary1_tax: null,
      auxiliary2_tax: null,
    }

    // Si existe relación, completar los datos
    if (accountCat) {
      detailedAccount = {
        id_accounting_account: accountCat.id,
        account_Sales: await getAccountData(accountCat.account_Sales),
        auxiliary1_Sales: await getAuxiliaryData(accountCat.auxiliary1_Sales),
        auxiliary2_Sales: await getAuxiliaryData(accountCat.auxiliary2_Sales),
        account_buy: await getAccountData(accountCat.account_buy),
        auxiliary1_buy: await getAuxiliaryData(accountCat.auxiliary1_buy),
        auxiliary2_buy: await getAuxiliaryData(accountCat.auxiliary2_buy),
        account_consumos: await getAccountData(accountCat.account_consumos),
        auxiliary1_consumos: await getAuxiliaryData(accountCat.auxiliary1_consumos),
        auxiliary2_consumos: await getAuxiliaryData(accountCat.auxiliary2_consumos),
        account_devbuy: await getAccountData(accountCat.account_devbuy),
        auxiliary1_devbuy: await getAuxiliaryData(accountCat.auxiliary1_devbuy),
        auxiliary2_devbuy: await getAuxiliaryData(accountCat.auxiliary2_devbuy),
        account_tax: await getAccountData(accountCat.account_tax),
        auxiliary1_tax: await getAuxiliaryData(accountCat.auxiliary1_tax),
        auxiliary2_tax: await getAuxiliaryData(accountCat.auxiliary2_tax),
      }
    }

    // Respuesta final uniforme
    res.status(200).json({
      success: true,
      code: 200,
      message: 'Category found',
      data: {
        id: category.id,
        name: category.name,
        discount_percentage: category.discount_percentage,
        profit_percentage: category.profit_percentage,
        cost_center: costCenterData || {},
        createdAt: category.createdAt,
        accounts: detailedAccount,
      },
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      code: 500,
      message: 'Error fetching category',
      error: error.message,
    })
  }
})

// Crear categoría
router.post('/register', async (req, res) => {
  try {
    const {
      name,
      description,
      discount_percentage,
      profit_percentage,
      id_cost_center,
      accounts = {}
    } = req.body

    // Verificar duplicado
    const existingCategory = await prisma.categories.findFirst({
      where: { name }
    })

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        code: 400,
        message: 'The category already exists',
        name
      })
    }

    // Buscar centro de costo (usar el indicado o uno por defecto)
    let costCenterId = id_cost_center
    if (!costCenterId) {
      const search = await prisma.costCenter.findFirst()
      if (!search) {
        return res.status(404).json({
          success: false,
          code: 404,
          message: 'No available cost center found'
        })
      }
      costCenterId = search.id
    }

    // Crear categoría
    const category = await prisma.categories.create({
      data: {
        name,
        description,
        discount_percentage: discount_percentage || 0,
        profit_percentage: profit_percentage || 0,
        id_cost_center: costCenterId
      }
    })

    // Crear registro en account_Categories
    const accountCat = await prisma.account_Categories.create({
      data: {
        category: {
          connect: { id: category.id }
        },
        account_Sales: accounts.account_Sales || null,
        auxiliary1_Sales: accounts.auxiliary1_Sales || null,
        auxiliary2_Sales: accounts.auxiliary2_Sales || null,
        account_buy: accounts.account_buy || null,
        auxiliary1_buy: accounts.auxiliary1_buy || null,
        auxiliary2_buy: accounts.auxiliary2_buy || null,
        account_consumos: accounts.account_consumos || null,
        auxiliary1_consumos: accounts.auxiliary1_consumos || null,
        auxiliary2_consumos: accounts.auxiliary2_consumos || null,
        account_devbuy: accounts.account_devbuy || null,
        auxiliary1_devbuy: accounts.auxiliary1_devbuy || null,
        auxiliary2_devbuy: accounts.auxiliary2_devbuy || null,
        account_tax: accounts.account_tax || null,
        auxiliary1_tax: accounts.auxiliary1_tax || null,
        auxiliary2_tax: accounts.auxiliary2_tax || null
      }
    })

    // Traer info del centro de costos
    const costCenterData = await prisma.costCenter.findUnique({
      where: { id: costCenterId },
      select: {
        id: true,
        current_cost: true,
        average_cost: true,
        previous_cost: true,
        higher_current_average: true,
        lower_current_previous_average: true,
        createdAt: true
      }
    })

    // Helpers para obtener la info completa
    const getAccountData = async (id) => {
      if (!id || !ObjectId.isValid(id)) return ""
      const acc = await prisma.accountingAccounts.findUnique({ where: { id } })
      return acc
        ? {
            id: acc.id,
            name: acc.name,
            code_account: acc.code_account,
            auxiliary1_initials: acc.auxiliary1_initials,
            auxiliary2_initials: acc.auxiliary2_initials,
            category_account: acc.category_account
          }
        : ""
    }

    const getAuxData = async (id) => {
      if (!id || !ObjectId.isValid(id)) return ""
      const aux = await prisma.auxiliariesAccounts.findUnique({ where: { id } })
      return aux
        ? {
            id: aux.id,
            name: aux.name,
            auxiliary_code: aux.auxiliary_code
          }
        : ""
    }

    // Construcción del objeto final "accounts"
    const detailedAccounts = {
      id_accounting_account: accountCat.id,
      account_Sales: await getAccountData(accountCat.account_Sales),
      auxiliary1_Sales: await getAuxData(accountCat.auxiliary1_Sales),
      auxiliary2_Sales: await getAuxData(accountCat.auxiliary2_Sales),
      account_buy: await getAccountData(accountCat.account_buy),
      auxiliary1_buy: await getAuxData(accountCat.auxiliary1_buy),
      auxiliary2_buy: await getAuxData(accountCat.auxiliary2_buy),
      account_consumos: await getAccountData(accountCat.account_consumos),
      auxiliary1_consumos: await getAuxData(accountCat.auxiliary1_consumos),
      auxiliary2_consumos: await getAuxData(accountCat.auxiliary2_consumos),
      account_devbuy: await getAccountData(accountCat.account_devbuy),
      auxiliary1_devbuy: await getAuxData(accountCat.auxiliary1_devbuy),
      auxiliary2_devbuy: await getAuxData(accountCat.auxiliary2_devbuy),
      account_tax: await getAccountData(accountCat.account_tax),
      auxiliary1_tax: await getAuxData(accountCat.auxiliary1_tax),
      auxiliary2_tax: await getAuxData(accountCat.auxiliary2_tax)
    }

    // Respuesta final
    res.status(201).json({
      success: true,
      code: 201,
      message: 'Category created successfully',
      data: {
        id: category.id,
        name: category.name,
        discount_percentage: category.discount_percentage,
        profit_percentage: category.profit_percentage,
        cost_center: costCenterData || {},
        createdAt: category.createdAt,
        accounts: detailedAccounts
      }
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      code: 500,
      message: 'Error creating category',
      error: error.message
    })
  }
})

// Actualizar una categoría y su configuración contable
router.put('/edit/:id', async (req, res) => {
  try {
    const { id } = req.params
    const {
      name,
      discount_percentage,
      profit_percentage,
      id_cost_center,
      accounts
    } = req.body

    // 1️⃣ Verificar existencia de la categoría
    const categoryExists = await prisma.categories.findUnique({ where: { id } })
    if (!categoryExists) {
      return res.status(404).json({
        success: false,
        code: 404,
        message: 'Category not found'
      })
    }

    // 2️⃣ Actualizar la categoría
    const updatedCategory = await prisma.categories.update({
      where: { id },
      data: {
        name,
        discount_percentage,
        profit_percentage,
        id_cost_center
      }
    })

    // 3️⃣ Buscar configuración contable
    const accountCat = await prisma.account_Categories.findFirst({
      where: { id_Categories: id }
    })

    // 4️⃣ Si no existe configuración contable
    if (!accountCat) {
      return res.status(200).json({
        success: true,
        code: 200,
        message: 'Category updated (no accounting configuration found to edit)',
        data: {
          id: updatedCategory.id,
          name: updatedCategory.name,
          discount_percentage: updatedCategory.discount_percentage,
          profit_percentage: updatedCategory.profit_percentage,
          cost_center: {},
          createdAt: updatedCategory.createdAt,
          accounts: {}
        }
      })
    }

    // 5️⃣ Actualizar configuración contable
    const updatedAccountCat = await prisma.account_Categories.update({
      where: { id: accountCat.id },
      data: {
        account_Sales: accounts?.account_Sales || null,
        auxiliary1_Sales: accounts?.auxiliary1_Sales || null,
        auxiliary2_Sales: accounts?.auxiliary2_Sales || null,
        account_buy: accounts?.account_buy || null,
        auxiliary1_buy: accounts?.auxiliary1_buy || null,
        auxiliary2_buy: accounts?.auxiliary2_buy || null,
        account_consumos: accounts?.account_consumos || null,
        auxiliary1_consumos: accounts?.auxiliary1_consumos || null,
        auxiliary2_consumos: accounts?.auxiliary2_consumos || null,
        account_devbuy: accounts?.account_devbuy || null,
        auxiliary1_devbuy: accounts?.auxiliary1_devbuy || null,
        auxiliary2_devbuy: accounts?.auxiliary2_devbuy || null,
        account_tax: accounts?.account_tax || null,
        auxiliary1_tax: accounts?.auxiliary1_tax || null,
        auxiliary2_tax: accounts?.auxiliary2_tax || null
      }
    })

    // 6️⃣ Traer información del centro de costos
    let costCenterData = null
    if (updatedCategory.id_cost_center) {
      costCenterData = await prisma.costCenter.findUnique({
        where: { id: updatedCategory.id_cost_center },
        select: {
          id: true,
          current_cost: true,
          average_cost: true,
          previous_cost: true,
          higher_current_average: true,
          lower_current_previous_average: true,
          createdAt: true
        }
      })
    }

    // 7️⃣ Funciones auxiliares para obtener info detallada
    const getAccountData = async (id) => {
      if (!id || !ObjectId.isValid(id)) return ""
      const account = await prisma.accountingAccounts.findUnique({ where: { id } })
      return account
        ? {
            id: account.id,
            name: account.name,
            code_account: account.code_account,
            auxiliary1_initials: account.auxiliary1_initials,
            auxiliary2_initials: account.auxiliary2_initials,
            category_account: account.category_account
          }
        : ""
    }

    const getAuxiliaryData = async (id) => {
      if (!id || !ObjectId.isValid(id)) return ""
      const aux = await prisma.auxiliariesAccounts.findUnique({ where: { id } })
      return aux
        ? {
            id: aux.id,
            name: aux.name,
            auxiliary_code: aux.auxiliary_code
          }
        : ""
    }

    // 8️⃣ Construir respuesta con estructura uniforme
    const detailedAccount = {
      id_accounting_account: updatedAccountCat.id,
      account_Sales: await getAccountData(updatedAccountCat.account_Sales),
      auxiliary1_Sales: await getAuxiliaryData(updatedAccountCat.auxiliary1_Sales),
      auxiliary2_Sales: await getAuxiliaryData(updatedAccountCat.auxiliary2_Sales),

      account_buy: await getAccountData(updatedAccountCat.account_buy),
      auxiliary1_buy: await getAuxiliaryData(updatedAccountCat.auxiliary1_buy),
      auxiliary2_buy: await getAuxiliaryData(updatedAccountCat.auxiliary2_buy),

      account_consumos: await getAccountData(updatedAccountCat.account_consumos),
      auxiliary1_consumos: await getAuxiliaryData(updatedAccountCat.auxiliary1_consumos),
      auxiliary2_consumos: await getAuxiliaryData(updatedAccountCat.auxiliary2_consumos),

      account_devbuy: await getAccountData(updatedAccountCat.account_devbuy),
      auxiliary1_devbuy: await getAuxiliaryData(updatedAccountCat.auxiliary1_devbuy),
      auxiliary2_devbuy: await getAuxiliaryData(updatedAccountCat.auxiliary2_devbuy),

      account_tax: await getAccountData(updatedAccountCat.account_tax),
      auxiliary1_tax: await getAuxiliaryData(updatedAccountCat.auxiliary1_tax),
      auxiliary2_tax: await getAuxiliaryData(updatedAccountCat.auxiliary2_tax)
    }

    // 9️⃣ Respuesta final unificada
    res.status(200).json({
      success: true,
      code: 200,
      message: 'Category and accounting configuration updated successfully',
      data: {
        id: updatedCategory.id,
        name: updatedCategory.name,
        discount_percentage: updatedCategory.discount_percentage,
        profit_percentage: updatedCategory.profit_percentage,
        cost_center: costCenterData || {},
        createdAt: updatedCategory.createdAt,
        accounts: detailedAccount
      }
    })
  } catch (error) {
    console.error('❌ Error updating the category:', error)
    res.status(500).json({
      success: false,
      code: 500,
      message: 'Error updating the category',
      error: error.message
    })
  }
})

// Eliminar una categoría
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params

    // 1️⃣ Verificar si la categoría existe
    const category = await prisma.categories.findUnique({ where: { id } })
    if (!category) {
      return res.status(404).json({
        success: false,
        code: 404,
        message: 'Category not found'
      })
    }

    // 2️⃣ Verificar si tiene relación contable
    const accountCat = await prisma.account_Categories.findFirst({
      where: { id_Categories: id }
    })

    // 3️⃣ Si existe relación, eliminarla
    if (accountCat) {
      await prisma.account_Categories.delete({
        where: { id: accountCat.id }
      })
    }

    // 4️⃣ Eliminar la categoría
    const deletedCategory = await prisma.categories.delete({
      where: { id }
    })

    // 5️⃣ Responder con confirmación
    return res.status(200).json({
      success: true,
      code: 200,
      message: 'Category and related accounting configuration deleted successfully',
      data: deletedCategory
    })

  } catch (error) {
    console.error('❌ Error deleting category:', error)
    return res.status(500).json({
      success: false,
      code: 500,
      message: 'Error deleting the category',
      error: error.message
    })
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
    const accountCategories = await prisma.account_Categories.findMany({
      include: {
        category: {
          select: {
            name: true,
            profit_percentage: true,
            discount_percentage: true
          }
        }
      }
    })

    if (accountCategories.length === 0) {
      return res.status(404).json({
        success: false,
        code: 404,
        message: 'Account categories not found'
      })
    }

    // ✅ Formatear la respuesta
    const formattedAccounts = accountCategories.map(acc => ({
      id_Categories: acc.category?.id_Categories,
      name: acc.category?.name,
      profit_percentage: acc.category?.profit_percentage,
      discount_percentage: acc.category?.discount_percentage,
      account_Sales: acc.account_Sales,
      account_buy: acc.account_buy,
      account_consumos: acc.account_consumos,
      account_devbuy: acc.account_devbuy,
      account_tax: acc.account_tax,
      auxiliary1_Sales: acc.auxiliary1_Sales,
      auxiliary2_Sales: acc.auxiliary2_Sales,
      auxiliary1_buy: acc.auxiliary1_buy,
      auxiliary2_buy: acc.auxiliary2_buy,
      auxiliary1_consumos: acc.auxiliary1_consumos,
      auxiliary2_consumos: acc.auxiliary2_consumos,
      auxiliary1_devbuy: acc.auxiliary1_devbuy,
      auxiliary2_devbuy: acc.auxiliary2_devbuy,
      auxiliary1_tax: acc.auxiliary1_tax,
      auxiliary2_tax: acc.auxiliary2_tax
    }))

    return res.status(200).json({
      success: true,
      code: 200,
      message: 'Account categories found',
      data: formattedAccounts
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      code: 500,
      message: 'Error fetching account categories'
    })
  }
})

// Obtener categoría de una cuenta por ID
router.get('/account/:id', async (req, res) => {
  try {
    const { id } = req.params
    const categories = await prisma.account_Categories.findUnique({ where: { id } })

    if (categories) {
      return res.status(200).json({ success: true, code: 200, message: 'Account category found', categories })
    } else {
      return res.status(404).json({ success: false, code: 404, message: 'Account category not found' })
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
    } = req.body

    const data = req.body

    // Validar existencia de la categoría
    const existingCategory = await prisma.categories.findUnique({
      where: { id: id_Categories }
    })

    if (!existingCategory) {
      return res.status(404).json({ success: false, code: 404, message: 'Category not found' })
    }

    const existingCategoryAccount = await prisma.account_Categories.findMany({ where: { id_Categories: id_Categories } })

    if (existingCategoryAccount.length > 0) {
      return res.status(400).json({ success: false, code: 400, message: 'The accounting category already exists', name: id_Categories })
    }

    // Solo validar si la cuenta principal existe
    if (account_Sales) {
      await validateAccountAndAuxiliaries(account_Sales, auxiliary1_Sales, auxiliary2_Sales, 'ventas')
    }
    if (account_buy) {
      await validateAccountAndAuxiliaries(account_buy, auxiliary1_buy, auxiliary2_buy, 'compras')
    }
    if (account_consumos) {
      await validateAccountAndAuxiliaries(account_consumos, auxiliary1_consumos, auxiliary2_consumos, 'consumos')
    }
    if (account_devbuy) {
      await validateAccountAndAuxiliaries(account_devbuy, auxiliary1_devbuy, auxiliary2_devbuy, 'devolución de compras')
    }
    if (account_tax) {
      await validateAccountAndAuxiliaries(account_tax, auxiliary1_tax, auxiliary2_tax, 'impuestos')
    }

    // Crear el registro
    const { id_Categories: categoryId, ...restData } = data
    const newAccountCategory = await prisma.account_Categories.create({
      data: {
        ...restData,
        category: {
          connect: { id: categoryId }
        }
      }
    })

    res.status(200).json({ success: true, code: 200, message: 'Account category registered succesfully', category: newAccountCategory })

  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, code: 500, message: 'Error creating account category', error })

  }
})

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
    })

    if (!existingAccount) {
      return res.status(404).json({ success: false, code: 404, message: 'Account Category not found' })
    }

    // Validar existencia de la categoría
    const existingCategory = await prisma.categories.findUnique({
      where: { id: id_Categories }
    })

    if (!existingCategory) {
      return res.status(404).json({ success: false, code: 404, message: 'Category not found' })
    }

    // Solo validar si la cuenta principal existe
    if (account_Sales) {
      await validateAccountAndAuxiliaries(account_Sales, auxiliary1_Sales, auxiliary2_Sales, 'ventas')
    }
    if (account_buy) {
      await validateAccountAndAuxiliaries(account_buy, auxiliary1_buy, auxiliary2_buy, 'compras')
    }
    if (account_consumos) {
      await validateAccountAndAuxiliaries(account_consumos, auxiliary1_consumos, auxiliary2_consumos, 'consumos')
    }
    if (account_devbuy) {
      await validateAccountAndAuxiliaries(account_devbuy, auxiliary1_devbuy, auxiliary2_devbuy, 'devolución de compras')
    }
    if (account_tax) {
      await validateAccountAndAuxiliaries(account_tax, auxiliary1_tax, auxiliary2_tax, 'impuestos')
    }

    // Crear el registro
    const newAccountCategory = await prisma.account_Categories.update({
      data,
      where: { id }
    })

    res.status(200).json({ success: true, code: 200, message: 'Account Category updated succesfully', category: newAccountCategory })

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, code: 500, message: 'Error updating the category', error })
  }
})

// Eliminar la Categoria de una cuenta
router.delete('/account/delete/:id', async (req, res) => {
  try {
    const { id } = req.params

    const search = await prisma.account_Categories.findUnique({ where: { id } })

    if (search) {
      const deleteCategory = await prisma.account_Categories.delete({ where: { id } })
      res.json({ success: true, code: 200, message: 'Account category successfully deleted', deleteCategory })
    } else {
      res.status(404).json({ success: false, code: 404, message: 'Account category not found' })
    }

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Error deleting the account category' })
  }
})

export default router