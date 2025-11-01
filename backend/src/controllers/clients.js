import express from 'express'
import bcrypt from 'bcryptjs'
import prisma from '../config/prisma.js'

const router = express.Router()

// --- Obtener CPOs (Clientes, Proveedores u Otros) ---
router.get('/', async (req, res) => {
  try {
    const { search, type } = req.query;

    // --- Filtro dinámico ---
    let whereClause = {};

    // Si se especifica tipo (cliente, proveedor, otro)
    if (type) {
      whereClause.type = type;
    }

    // Si se incluye texto de búsqueda
    if (search) {
      whereClause.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { rif: { contains: search, mode: 'insensitive' } },
        { name_commercial: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search, mode: 'insensitive' } },
        { address: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Si no hay búsqueda → limitar a 50 resultados
    const takeLimit = search ? undefined : 50;

    const cpos = await prisma.cPO.findMany({
      where: whereClause,
      take: takeLimit,
      orderBy: { createdAt: 'desc' },
      include: {
        paymentConditions: true, // si quieres traer también las condiciones de pago
      },
    });

    if (!cpos.length) {
      return res.status(404).json({
        success: false,
        code: 404,
        message: 'No CPOs found',
      });
    }

    return res.status(200).json({
      success: true,
      code: 200,
      message: 'CPOs found',
      cpos,
    });
  } catch (error) {
    console.error('❌ Error fetching CPOs:', error);
    res.status(500).json({
      success: false,
      code: 500,
      message: 'Error fetching CPOs',
    });
  }
});


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
    const {
      type,
      rif,
      id_categories_cpo,
      id_sellers,
      id_accounting_accounts,
      id_PaymentConditions,
      id_RetentionISLRConcepts
    } = req.body

    const data = req.body

    // Validar tipo
    if (!['client', 'provider'].includes(type)) {
      return res.status(400).json({
        success: false,
        code: 400,
        message: 'Invalid type provided',
        data
      })
    }

    // Verificar si ya existe
    const existing = await prisma.cPO.findMany({
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

    // 🔹 Validar categoría (obligatoria)
    if (!id_categories_cpo) {
      return res.status(400).json({
        success: false,
        code: 400,
        message: 'Category ID is required'
      })
    }
    const searchCategory = await prisma.categoriesCPO.findUnique({
      where: { id: id_categories_cpo }
    })
    if (!searchCategory) {
      return res.status(400).json({
        success: false,
        code: 400,
        message: 'Invalid category ID',
        data: id_categories_cpo
      })
    }

    // 🔹 Validar vendedor (obligatorio)
    if(id_sellers){
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
    }

    // 🔹 Validar cuenta contable (obligatoria)
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

    // 🔹 Validar condición de pago (solo si se envía)
    if (id_PaymentConditions) {
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
    }

    // 🔹 Validar concepto de retención ISLR (solo si se envía)
    if (id_RetentionISLRConcepts) {
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
    }

    // Crear el CPO
    const created = await prisma.cPO.create({ data })

    res.status(200).json({
      success: true,
      code: 200,
      message: `CPO created successfully`,
      [type]: created
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      code: 500,
      message: 'Error creating client or provider',
      error: error.message
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
      const categoryClient = await prisma.categoriesCPO.update({ 
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

// Obtener todas las categorías de los clientes (con filtros opcionales)
router.get('/category', async (req, res) => {
  try {
    const { name, filterDays, days } = req.query;

    const whereClause = {};

    // 🔍 Filtro por nombre
    if (name && name.trim() !== '') {
      whereClause.name = {
        contains: name.trim(),
        mode: 'insensitive'
      };
    }

    // 🔢 Filtro por número exacto de días de vigencia
    if (days && !isNaN(days)) {
      whereClause.deadline_day = Number(days);
    }

    // ⚙️ Ordenar según filtro de días de vigencia
    const orderByClause =
      filterDays === 'true'
        ? { deadline_day: 'asc' } // ordenar de menor a mayor
        : { createdAt: 'desc' }; // orden por defecto

    // 🔹 Buscar las categorías con su cuenta contable
    const categoriesData = await prisma.categoriesCPO.findMany({
      where: whereClause,
      include: {
        accountingAccount: {
          select: {
            id: true,
            name: true,
            code_account: true,
            auxiliary1_initials: true,
            auxiliary2_initials: true,
            category_account: true,
            createdAt: true
          }
        }
      },
      orderBy: orderByClause
    });

    if (!categoriesData.length) {
      return res.status(404).json({
        success: false,
        code: 404,
        message: 'No categories found'
      });
    }

    // 🔄 Obtener info completa de auxiliares
    const categories = await Promise.all(
      categoriesData.map(async (cat) => {
        const { auxiliary1, auxiliary2, id_accounting_accounts, ...rest } = cat;

        // Buscar auxiliares por ID si existen
        const [aux1Data, aux2Data] = await Promise.all([
          auxiliary1 ? prisma.auxiliariesAccounts.findUnique({ where: { id: auxiliary1 } }) : null,
          auxiliary2 ? prisma.auxiliariesAccounts.findUnique({ where: { id: auxiliary2 } }) : null
        ]);

        return {
          ...rest,
          accountingAccount: cat.accountingAccount,
          auxiliary1: aux1Data,
          auxiliary2: aux2Data
        };
      })
    );

    return res.status(200).json({
      success: true,
      code: 200,
      message: 'Categories with accounting and auxiliaries info found',
      categories
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      code: 500,
      message: 'Error fetching categories with accounting and auxiliaries info',
      error: error.message
    });
  }
});


// Obtener categoría de un cliente por ID
router.get('/category/:id', async (req, res) => {
  try {
  const { id } = req.params

    const client = await prisma.categoriesCPO.findUnique({ where: { id } })

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

    const existingCategory = await prisma.categoriesCPO.findMany({ where: { name: data.name } })

    if (existingCategory.length > 0) {
      return res.status(400).json({ success: false, code:400, message: 'This category name already exists', data })
    }

    // const search = await prisma.costCenter.findFirst()

    // if (!search) {
    //   return res.status(404).json({ success: false, message: 'No available cost center found' })
    // }

    const categoryClient = await prisma.categoriesCPO.create({data})

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

    const search = await prisma.categoriesCPO.findUnique({ where: { id } })

    if(search){
      const categoryClient = await prisma.categoriesCPO.update({ 
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

    const search = await prisma.categoriesCPO.findUnique({ where: { id } })

    if(search){
      const categoryClient = await prisma.categoriesCPO.delete({ where: { id } })

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
