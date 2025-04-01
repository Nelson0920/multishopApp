import express from 'express'
import bcrypt from 'bcryptjs'
import prisma from '../config/prisma.js'

const router = express.Router()

// Obtener todos los clientes
router.get('/', async (req, res) => {
  try {
    const clients = await prisma.clients.findMany()
    res.json({ success: true, clients })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener clientes',
      error: error.message,
    })
  }
})

// Obtener un cliente por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const client = await prisma.clients.findUnique({ where: { id: Number(id) } })
    if (!client) return res.status(404).json({ success: false, message: 'Cliente no encontrado' })

    res.json({ success: true, client })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener el cliente' })
  }
})

// Crear un nuevo cliente
router.post('/register', async (req, res) => {
  try {
    const data = req.body

    const client = await prisma.clients.create({ data })

    res.status(201).json({ success: true, message: 'Cliente creado', client })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Error al crear el cliente' })
  }
})

// Actualizar un cliente
router.put('/:id', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    await prisma.clients.delete({ where: { id: Number(id) } })
    res.json({ success: true, message: 'Cliente eliminado' })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al eliminar el cliente' })
  }
})

export default router
