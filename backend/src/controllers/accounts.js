import express from 'express'
import bcrypt from 'bcryptjs'
import prisma from '../config/prisma.js'

const router = express.Router()

// --- Cuentas Contables ---

// Obtener todas las cuentas contables
router.get('/accounting', async (req, res) => {
  try {
    const accounting = await prisma.accountingAccounts.findMany()
    if (accounting.length > 0) {
      return res.status(200).json({ success: true, code: 200, message: "Accounting accounts Found", accounting })
    } else {
      return res.status(404).json({ success: false, code: 404, message: 'No accounting accounts found' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, code: 500, message: 'Error fetching accounting accounts' })
  }
})

// Obtener una cuenta contable por ID
router.get('/accounting/specific/:id', async (req, res) => {
  try {
    const { id } = req.params
    const accounting = await prisma.accountingAccounts.findUnique({where : { id }})

    if (accounting) {
      return res.status(200).json({ success: true, code: 200, message: "Accounting accounts Found", accounting })
    } else {
      return res.status(404).json({ success: false, code: 404, message: 'No accounting accounts found' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, code: 500, message: 'Error fetching accounting accounts' })
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

// Obtener todas las cuentas auxiliares
router.get('/auxiliaries', async (req, res) => {
  try {
    const auxiliaries = await prisma.auxiliariesAccounts.findMany()
    if (auxiliaries.length > 0) {
      return res.status(200).json({ success: true, code: 200, message: "Auxilaries accounts found", auxiliaries })
    } else {
      return res.status(404).json({ success: false, code: 404, message: 'No auxiliaries accounts found' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, code: 500, message: 'Error fetching auxiliaries accounts' })
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
    const data = req.body

    const search = await prisma.auxiliariesAccounts.findMany({ where: { auxiliary_code: data.auxiliary_code } })

    if (search.length > 0) {
      res.status(400).json({ success: false, code: 400, message: 'This account auxiliary already exists', account: search[0].name })
    } else {
      const account = await prisma.auxiliariesAccounts.create({ data })
      res.status(201).json({ success: true, code: 200, message: 'Auxiliary account created successfully', account })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, code: 500, message: 'Error creating the auxiliary account', error })
  }
})

// Actualizar una cuenta auxiliar
router.put('/auxiliaries/edit/:id', async (req, res) => {
  try {
    const { id } = req.params
    const data = req.body

    const search = await prisma.auxiliariesAccounts.findUnique({ where: { id } })

    if (!search) {
      return res.status(404).json({ success: false, message: 'No accounting account found' })
    }

    // // Verificar si el nombre ya existe en otro registro
    // const verifyName = await prisma.auxiliariesAccounts.findFirst({
    //   where: { name: data.name }
    // })

    // Verificar si el código auxiliar ya existe en otro registro
    const verifyCode = await prisma.auxiliariesAccounts.findFirst({
      where: { auxiliary_code: data.auxiliary_code }
    })

    // console.log(verifyName)
    console.log(verifyCode)

    // if (verifyName) {
    //   return res.status(400).json({ success: false, message: 'The name is already in use', verifyName })
    // }

    if (verifyCode) {
      return res.status(400).json({ success: false, code: 400, message: 'The auxiliary code is already in use', verifyCode })
    }

    // Actualizar la cuenta auxiliar
    const account = await prisma.auxiliariesAccounts.update({
      where: { id },
      data
    })

    res.status(200).json({ success: true, code: 200, message: 'Accounting account updated successfully', account })

  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, code: 500, message: 'Error updating the accounting account', error })
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
