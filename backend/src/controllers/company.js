import express from 'express'
import prisma from '../config/prisma.js'

const router = express.Router()

// Obtener todas las empresas
router.get('/', async (req, res) => {
  try {
    const companies = await prisma.company.findMany()
    res.json({ success: true, companies })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener empresas',
      error: error.message,
    })
  }
})

// Obtener una empresa por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const company = await prisma.company.findUnique({ where: { id } })
    if (!company)
      return res
        .status(404)
        .json({ success: false, message: 'Empresa no encontrada' })

    res.json({ success: true, company })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener la empresa',
      error: error.message,
    })
  }
})

// Crear una nueva empresa (sucursales opcionales)
router.post('/', async (req, res) => {
  try {
    const { name, id_branch } = req.body

    const data = { name }
    if (id_branch !== undefined) {
      data.id_branch = id_branch // se guarda solo si viene en el body
    }

    const company = await prisma.company.create({ data })
    res
      .status(201)
      .json({ success: true, message: 'Empresa creada', company })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear la empresa',
      error: error.message,
    })
  }
})

// Actualizar una empresa (sucursales opcionales)
router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { name, id_branch } = req.body

  try {
    const data = {}
    if (name !== undefined) data.name = name
    if (id_branch !== undefined) data.id_branch = id_branch

    const updatedCompany = await prisma.company.update({
      where: { id },
      data,
    })

    res.json({
      success: true,
      message: 'Empresa actualizada',
      company: updatedCompany,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar la empresa',
      error: error.message,
    })
  }
})

// Eliminar una empresa
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    await prisma.company.delete({ where: { id } })
    res.json({ success: true, message: 'Empresa eliminada' })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar la empresa',
      error: error.message,
    })
  }
})

// --- Branches / Sucursales ---

// Obtener todas las sucursales asociadas a una empresa
router.get('/branches/:id_company', async (req, res) => {
  const { id_company } = req.params

  try {
    const company = await prisma.company.findUnique({ where: { id: id_company } })

    if (!company) {
      return res.status(404).json({ success: false, message: 'Empresa no encontrada' })
    }

    if (!company.id_branch || company.id_branch.length === 0) {
      return res.json({ success: true, branches: [] })
    }

    const branches = await prisma.branch.findMany({
      where: {
        id: { in: company.id_branch },
      },
    })

    res.json({ success: true, branches })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener sucursales por empresa',
      error: error.message,
    })
  }
})

// Obtener una sucursal por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const branch = await prisma.branch.findUnique({ where: { id } })
    if (!branch) return res.status(404).json({ success: false, message: 'Sucursal no encontrada' })
    res.json({ success: true, branch })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener la sucursal', error: error.message })
  }
})

// Crear una sucursal
router.post('/', async (req, res) => {
  try {
    const { name } = req.body
    const branch = await prisma.branch.create({ data: { name } })
    res.status(201).json({ success: true, message: 'Sucursal creada', branch })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al crear la sucursal', error: error.message })
  }
})

// Actualizar una sucursal
router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { name } = req.body
  try {
    const updatedBranch = await prisma.branch.update({ where: { id }, data: { name } })
    res.json({ success: true, message: 'Sucursal actualizada', branch: updatedBranch })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al actualizar la sucursal', error: error.message })
  }
})

// Eliminar una sucursal
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    await prisma.branch.delete({ where: { id } })
    res.json({ success: true, message: 'Sucursal eliminada' })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al eliminar la sucursal', error: error.message })
  }
})

export default router
