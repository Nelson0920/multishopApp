import express from 'express'
import bcrypt from 'bcryptjs'
import prisma from '../config/prisma.js'

const router = express.Router()

// Obtener todos los Vendedores
router.get('/', async (req, res) => {
  try {
    const sellers = await prisma.sellers.findMany()
    if (sellers.length > 0) {
      return res.status(200).json({ success: true, code: 200, message: "Sellers Found", sellers })
    } else {
      return res.status(404).json({ success: false, code: 404, message: 'No sellers found' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, code: 500, message: 'Error fetching sellers' })
  }
})

// Obtener un vendedor por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const seller = await prisma.sellers.findUnique({ where: { id} })
    
    if (seller) {
      return res.status(200).json({ success: true, code: 200, message: "Seller found", seller })
    } else {
      return res.status(404).json({ success: false, code: 404, message: 'Seller not found' })
    }

  } catch (error) {
    res.status(500).json({ success: false, code: 500, message: 'Error found seller', error })
  }
})

// Crear un nuevo Vendedor
router.post('/register', async (req, res) => {
  try {
    const { name, rif, address, phone, email, type, commission, credentials } = req.body
  
    const search = await prisma.sellers.findMany({ where: { rif } })

    if (search.length > 0) {
      return res.status(400).json({ success: false, code: 400, message: 'This seller already exists' })
    }else{
      const passwordUpper = credentials.password.toUpperCase()

      const hashedPassword = await bcrypt.hash(passwordUpper, 10)
  
      const seller = await prisma.sellers.create({
        data: {
          name, rif, address, phone, email, type_seller: type, commission,
          credentials: {
            email: credentials.username.toUpperCase(),
            password: hashedPassword,
          }
        }
      })
  
      res.status(200).json({ success: true, message: 'Seller created successfully', seller })
    }

  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, code: 500, message: 'Error creating seller', error })
  }
})

// Editar un Vendedor
router.put('/edit/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { name, rif, address, phone, email, type, commission, credentials } = req.body
  
    const search = await prisma.sellers.findMany({ where: { id } })

    if (search.length > 0){
      const passwordUpper = credentials.password.toUpperCase()

      const hashedPassword = await bcrypt.hash(passwordUpper, 10)
  
      const seller = await prisma.sellers.update({
        where: { id },
        data: {
          name, rif, address, phone, email, type_seller: type, commission,
          credentials: {
            email: credentials.username.toUpperCase(),
            password: hashedPassword,
          }
        }
      })
  
      res.status(200).json({ success: true, message: 'Seller updated successfully', seller })
    }else{
      return res.status(404).json({ success: false, code: 404, message: 'Seller not found' })
    }

  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, code: 500, message: 'Error updating the seller', error })
  }
})

// Eliminar un Vendedor
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params

    const seller = await prisma.sellers.delete({ where: { id } })
    res.status(200).json({ success: true, message: 'Seller successfully deleted', seller })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, code: 500, message: 'Error deleting seller' })
  }
})

export default router
