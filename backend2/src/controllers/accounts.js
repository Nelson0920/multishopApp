import express from 'express'
import bcrypt from 'bcryptjs'
import prisma from '../config/prisma.js'

const router = express.Router()

// --- Cuentas Contables ---

// Obtener cuentas contables (buscar por nombre/código o categoría)
router.get('/accounting', async (req, res) => {
  try {
    const { search, category } = req.query

    const whereClause = {}

    if (search || category) {
      whereClause.AND = []

      if (search) {
        whereClause.AND.push({
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { code_account: { contains: search, mode: 'insensitive' } }
          ]
        })
      }

      if (category) {
        whereClause.AND.push({
          category_account: { contains: category, mode: 'insensitive' }
        })
      }
    }

    const accounting = await prisma.accountingAccounts.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' }
    })

    if (accounting.length === 0) {
      return res.status(404).json({
        success: false,
        code: 404,
        message: 'No accounting accounts found'
      })
    }

    // Formatear códigos solo si aún no lo están
    const formattedAccounting = accounting.map(acc => {
      const code = acc.code_account ? acc.code_account.toString().trim() : ''
      let formattedCode = code

      // Solo formatear si no tiene puntos (significa que no está formateado)
      if (!code.includes('.')) {
        if (code.length >= 6) {
          formattedCode = `${code[0]}.${code.slice(1, 3)}.${code[3]}.${code.slice(4)}`
        } else if (code.length === 5) {
          formattedCode = `${code[0]}.${code.slice(1, 3)}.${code[3]}.${code[4]}`
        } else if (code.length === 4) {
          formattedCode = `${code[0]}.${code.slice(1, 3)}.${code[3]}.`
        } else if (code.length === 3) {
          formattedCode = `${code[0]}.${code.slice(1)}.`
        }
      }

      formattedCode = formattedCode.replace(/\.\.+/g, '.').replace(/\.$/, '')

      return { ...acc, code_account: formattedCode }
    })

    // Mensaje dinámico
    let message = 'All accounting accounts found'
    if (search && category) {
      message = `Accounting accounts found for search '${search}' and category '${category}'`
    } else if (search) {
      message = `Accounting accounts found for search '${search}'`
    } else if (category) {
      message = `Accounting accounts found for category '${category}'`
    }

    return res.status(200).json({
      success: true,
      code: 200,
      message,
      accounting: formattedAccounting
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      code: 500,
      message: 'Error fetching accounting accounts',
      error: error.message
    })
  }
})


// Obtener una cuenta contable por ID
router.get('/accounting/specific/:id', async (req, res) => {
  try {
    const { id } = req.params
    const accounting = await prisma.accountingAccounts.findUnique({ where: { id } })

    if (!accounting) {
      return res.status(404).json({
        success: false,
        code: 404,
        message: 'No accounting accounts found'
      })
    }

    // 🔸 Formatear code_account individual
    let formattedCode = ''
    const code = accounting.code_account ? accounting.code_account.toString().trim() : ''

    if (code.length >= 6) {
      formattedCode = `${code[0]}.${code.slice(1, 3)}.${code[3]}.${code.slice(4)}`
    } else if (code.length === 5) {
      formattedCode = `${code[0]}.${code.slice(1, 3)}.${code[3]}.${code[4]}`
    } else if (code.length === 4) {
      formattedCode = `${code[0]}.${code.slice(1, 3)}.${code[3]}.`
    } else if (code.length === 3) {
      formattedCode = `${code[0]}.${code.slice(1)}.`
    } else {
      formattedCode = code
    }

    return res.status(200).json({
      success: true,
      code: 200,
      message: "Accounting accounts Found",
      accounting: { ...accounting, code_account: formattedCode }
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      code: 500,
      message: 'Error fetching accounting accounts'
    })
  }
})

// Crear una nueva cuenta contable
router.post('/accounting/register', async (req, res) => {
  try {
    const data = req.body

    const search = await prisma.accountingAccounts.findMany({ where: { code_account: data.code_account } })

    console.log(search)

    if (search.length > 0) {
      res.status(400).json({ success: false, code: 400, message: 'This account already exists', account: search[0].name })
    } else {
      const account = await prisma.accountingAccounts.create({ data })
      res.status(200).json({ success: true, code: 200, message: 'Accounting account created successfully', account })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, code: 500, message: 'Error creating the accounting account', error })
  }
})

// Actualizar una cuenta contable
router.put('/accounting/edit/:id', async (req, res) => {
  try {
    const { id } = req.params
    const data = req.body

    const search = await prisma.accountingAccounts.findUnique({ where: { id } })

    if (search) {
      const account = await prisma.accountingAccounts.update({
        where: { id },
        data,
      })
      res.status(200).json({ success: true, code: 200, message: 'Accounting account updated successfully', account })
    } else {
      res.status(404).json({ success: false, code: 404, message: 'No accounting account found' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, code: 500, message: 'Error updating the accounting account', error })
  }
})

// Eliminar una cuenta contable
router.delete('/accounting/delete/:id', async (req, res) => {
  try {
    const { id } = req.params

    const account = await prisma.accountingAccounts.delete({ where: { id } })
    res.status(200).json({ success: true, code: 200, message: 'Accounting account successfully deleted', account })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, code: 500, message: 'Error deleting the accounting account' })
  }
})

// --- Cuentas Auxiliares ---

// Buscar cuentas auxiliares (por código o todas)
router.get('/auxiliaries', async (req, res) => {
  try {
    const { codigo } = req.query // Ejemplo: /api/two/auxiliaries/search?codigo=J.000005

    let auxiliaries

    if (codigo && codigo.trim() !== '') {
      // Si se envía un código, buscar coincidencias
      auxiliaries = await prisma.auxiliariesAccounts.findMany({
        where: {
          auxiliary_code: {
            contains: codigo,
            mode: 'insensitive' // Ignora mayúsculas/minúsculas
          }
        }
      })
    } else {
      // Si no se envía código, traer todos
      auxiliaries = await prisma.auxiliariesAccounts.findMany()
    }

    if (auxiliaries.length === 0) {
      return res.status(404).json({ success: false, code: 404, message: 'No se encontraron cuentas auxiliares' })
    }

    return res.status(200).json({
      success: true,
      code: 200,
      message: 'Cuentas auxiliares encontradas',
      auxiliaries
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, code: 500, message: 'Error al buscar cuentas auxiliares' })
  }
})

// Obtener una cuenta auxiliar
router.get('/auxiliaries/specific/:id', async (req, res) => {
  try {
    const { id } = req.params
    const auxiliaries = await prisma.auxiliariesAccounts.findUnique({where : { id }})
    
    if (auxiliaries) {
      return res.status(200).json({ success: true, code: 200, message: "Auxilary accounts found", auxiliaries })
    } else {
      return res.status(404).json({ success: false, code: 404, message: 'Auxiliary account not found' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, code: 500, message: 'Error fetching auxiliaries accounts' })
  }
})

// Crear una nueva cuenta auxiliar
router.post('/auxiliaries/register', async (req, res) => {
  try {
    const data = req.body;
    const { name, auxiliary_code } = data;

    // 🔸 Validar formato del código auxiliar (Ejemplo: J.0000001)
    const codePattern = /^[A-Z]\.\d{7}$/;
    if (!codePattern.test(auxiliary_code)) {
      return res.status(400).json({
        success: false,
        code: 400,
        message: 'Invalid auxiliary code format. It must be like N.1234567'
      });
    }

    // 🔸 Verificar si el nombre ya existe
    const searchName = await prisma.auxiliariesAccounts.findFirst({ where: { name } });
    if (searchName) {
      return res.status(400).json({
        success: false,
        code: 400,
        message: 'This name already exists',
        account_name: searchName.name,
        account_code: searchName.auxiliary_code
      });
    }

    // 🔸 Verificar si el código ya existe
    const searchCode = await prisma.auxiliariesAccounts.findFirst({ where: { auxiliary_code } });
    if (searchCode) {
      return res.status(400).json({
        success: false,
        code: 400,
        message: 'This auxiliary code already exists',
        account_name: searchCode.name,
        account_code: searchCode.auxiliary_code
      });
    }

    // 🔸 Crear la nueva cuenta
    const account = await prisma.auxiliariesAccounts.create({ data });

    // 🔸 Calcular el siguiente código
    const prefix = auxiliary_code.charAt(0); // Ejemplo: "J"
    const numericPart = parseInt(auxiliary_code.slice(2)); // Ejemplo: 0000001 → 1
    const nextNumber = numericPart + 1;
    const nextCode = `${prefix}.${nextNumber.toString().padStart(7, '0')}`;

    res.status(201).json({
      success: true,
      code: 200,
      message: 'Auxiliary account created successfully',
      account,
      next_auxiliary_code: nextCode
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      code: 500,
      message: 'Error creating the auxiliary account',
      error: error.message
    });
  }
});


// Actualizar una cuenta auxiliar
router.put('/auxiliaries/edit/:id', async (req, res) => {
  try {
    const { id } = req.params
    const data = req.body

    const existingAccount = await prisma.auxiliariesAccounts.findUnique({ where: { id } })

    if (!existingAccount) {
      return res.status(404).json({
        success: false,
        code: 404,
        message: 'Auxiliary account not found'
      })
    }

    const verifyCode = await prisma.auxiliariesAccounts.findFirst({
      where: {
        auxiliary_code: data.auxiliary_code,
        NOT: { id }
      }
    })

    if (verifyCode) {
      return res.status(400).json({
        success: false,
        code: 400,
        message: 'Este código auxiliar ya está en uso por otra cuenta',
      })
    }

    // Actualizar la cuenta auxiliar
    const updatedAccount = await prisma.auxiliariesAccounts.update({
      where: { id },
      data
    })

    return res.status(200).json({
      success: true,
      code: 200,
      message: 'Codigo auxiliar actualizado correctamente',
      account: updatedAccount
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      code: 500,
      message: 'Error actualizando la cuenta auxiliar',
      error: error.message
    })
  }
})


// Eliminar una cuenta auxiliar
router.delete('/auxiliaries/delete/:id', async (req, res) => {
  try {
    const { id } = req.params
    const search = await prisma.auxiliariesAccounts.findUnique({ where: { id } })

    if(search){
      const account = await prisma.auxiliariesAccounts.delete({ where: { id } })
      res.status(200).json({ success: true, code: 200, message: 'Auxiliary account successfully deleted', account })  
    }else{
      res.status(404).json({ success: false, code: 404 , message: 'Auxiliary account not found' })
    }

  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, code: 500, message: 'Error deleting the auxiliary account' })
  }
})

export default router
