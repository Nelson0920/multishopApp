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

// Buscar cuentas auxiliares
router.get('/auxiliaries', async (req, res) => {
  try {
    const { codigo } = req.query // Ejemplo: /api/two/auxiliaries?codigo=J.000005 o /api/two/auxiliaries?codigo=ventas

    let auxiliaries

    if (codigo && codigo.trim() !== '') {
      auxiliaries = await prisma.auxiliariesAccounts.findMany({
        where: {
          OR: [
            {
              auxiliary_code: {
                contains: codigo,
                mode: 'insensitive'
              }
            },
            {
              name: {
                contains: codigo,
                mode: 'insensitive'
              }
            }
          ]
        },
        orderBy: { createdAt: 'desc' }
      })
    } else {
      // Si no se envía código, traer todos
      auxiliaries = await prisma.auxiliariesAccounts.findMany({
        orderBy: { createdAt: 'desc' }
      })
    }

    if (auxiliaries.length === 0) {
      return res.status(404).json({
        success: false,
        code: 404,
        message: 'No se encontraron cuentas auxiliares'
      })
    }

    return res.status(200).json({
      success: true,
      code: 200,
      message: 'Cuentas auxiliares encontradas',
      auxiliaries
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      code: 500,
      message: 'Error al buscar cuentas auxiliares',
      error: error.message
    })
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
    const { name, auxiliary_code } = req.body

    // 🔹 Validar que se haya enviado una letra
    const prefixPattern = /^[A-Z]$/i
    if (!prefixPattern.test(auxiliary_code)) {
      return res.status(400).json({
        success: false,
        code: 400,
        message: 'Invalid code. You must send only one letter, e.g., "L".'
      })
    }

    const prefix = auxiliary_code.toUpperCase()

    // 🔹 Buscar el último código existente con ese prefijo
    const lastAccount = await prisma.auxiliariesAccounts.findFirst({
      where: {
        auxiliary_code: {
          startsWith: `${prefix}.`
        }
      },
      orderBy: {
        auxiliary_code: 'desc'
      }
    })

    // 🔹 Calcular el nuevo número correlativo
    let nextNumber = 1
    if (lastAccount) {
      const lastNumber = parseInt(lastAccount.auxiliary_code.split('.')[1])
      nextNumber = lastNumber + 1
    }

    // 🔹 Generar el nuevo código completo
    const newAuxiliaryCode = `${prefix}.${nextNumber.toString().padStart(7, '0')}`

    // 🔹 Crear la nueva cuenta
    const account = await prisma.auxiliariesAccounts.create({
      data: {
        name,
        auxiliary_code: newAuxiliaryCode
      }
    })

    res.status(201).json({
      success: true,
      code: 200,
      message: 'Auxiliary account created successfully',
      account
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      code: 500,
      message: 'Error creating the auxiliary account',
      error: error.message
    })
  }
})

// Actualizar una cuenta auxiliar
router.put('/auxiliaries/edit/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { name, auxiliary_code } = req.body

    // Validar formato: solo una letra mayúscula
    const codePattern = /^[A-Z]$/
    if (!codePattern.test(auxiliary_code)) {
      return res.status(400).json({
        success: false,
        code: 400,
        message: 'El código auxiliar debe ser solo una letra mayúscula (ejemplo: "J")'
      })
    }

    // Buscar cuenta existente
    const existingAccount = await prisma.auxiliariesAccounts.findUnique({ where: { id } })
    if (!existingAccount) {
      return res.status(404).json({
        success: false,
        code: 404,
        message: 'Cuenta auxiliar no encontrada'
      })
    }

    // Obtener la inicial actual del código existente
    const currentInitial = existingAccount.auxiliary_code.charAt(0)

    let newAuxiliaryCode = existingAccount.auxiliary_code

    // 🔹 Si la inicial cambia, generar un nuevo número correlativo
    if (auxiliary_code !== currentInitial) {
      const lastAccount = await prisma.auxiliariesAccounts.findFirst({
        where: {
          auxiliary_code: {
            startsWith: `${auxiliary_code}.`
          }
        },
        orderBy: {
          auxiliary_code: 'desc'
        }
      })

      let nextNumber = 1
      if (lastAccount) {
        const lastNum = parseInt(lastAccount.auxiliary_code.split('.')[1], 10)
        nextNumber = lastNum + 1
      }

      newAuxiliaryCode = `${auxiliary_code}.${nextNumber.toString().padStart(7, '0')}`
    }

    // Actualizar la cuenta auxiliar
    const updatedAccount = await prisma.auxiliariesAccounts.update({
      where: { id },
      data: {
        name,
        auxiliary_code: newAuxiliaryCode
      }
    })

    return res.status(200).json({
      success: true,
      code: 200,
      message:
        auxiliary_code === currentInitial
          ? 'Cuenta auxiliar actualizada sin cambio de código'
          : 'Cuenta auxiliar actualizada con nuevo código generado',
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

// Obtener auxiliares disponibles según las iniciales enviadas
router.get('/auxiliaries/available', async (req, res) => {
  try {
    const { initials } = req.query

    if (!initials || initials.trim() === '') {
      return res.status(400).json({
        success: false,
        code: 400,
        message: 'Debes enviar al menos una inicial como parámetro (ejemplo: ?initials=A,B,J)'
      })
    }

    // Dividir las iniciales recibidas por comas, limpiar espacios y convertir a mayúsculas
    const initialsArray = initials
      .split(',')
      .map(i => i.trim().toUpperCase())
      .filter(i => i !== '')

    if (initialsArray.length === 0) {
      return res.status(400).json({
        success: false,
        code: 400,
        message: 'No se enviaron iniciales válidas'
      })
    }

    // Buscar auxiliares que comiencen con cualquiera de las iniciales enviadas
    const auxiliaries = await prisma.auxiliariesAccounts.findMany({
      where: {
        OR: initialsArray.map(initial => ({
          auxiliary_code: {
            startsWith: initial,
            mode: 'insensitive'
          }
        }))
      },
      orderBy: { auxiliary_code: 'asc' }
    })

    if (auxiliaries.length === 0) {
      return res.status(404).json({
        success: false,
        code: 404,
        message: `No se encontraron auxiliares para las iniciales: ${initialsArray.join(', ')}`
      })
    }

    return res.status(200).json({
      success: true,
      code: 200,
      message: `Auxiliares disponibles para las iniciales: ${initialsArray.join(', ')}`,
      auxiliaries
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      code: 500,
      message: 'Error al obtener auxiliares disponibles',
      error: error.message
    })
  }
})



export default router
