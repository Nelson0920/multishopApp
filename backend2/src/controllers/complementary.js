import express from 'express'
import prisma from '../config/prisma.js'

const router = express.Router()

// Diccionario de modelos
const models = {
  type: prisma.type,
  finish: prisma.finish,
  width: prisma.width,
  weight: prisma.weight,
  composition: prisma.composition,
  physicallocation: prisma.physicalLocation,
  manufacturer: prisma.manufacturer,
  laboratory: prisma.laboratory,
  unitofmeasure: prisma.unitOfMeasure,
  componentactive: prisma.componentActive,
  brand: prisma.brand,
  subbrand: prisma.subBrand,
  model: prisma.model,
  subcategory: prisma.subCategory,
  businessunit: prisma.businessUnit,
}

// Middleware para validar modelo
function getModel(req, res, next) {
  const { entity } = req.params
  const model = models[entity.toLowerCase()]
  if (!model) {
    return res.status(400).json({ success: false, message: `Model "${entity}" not found` })
  }
  req.model = model
  next()
}

// GET ALL
router.get('/:entity', getModel, async (req, res) => {
  try {
    const data = await req.model.findMany()
    if (data.length === 0) {
      return res.status(404).json({ success: false, message: 'No records found' })
    }
    res.status(200).json({ success: true, data })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching records', error: error.message })
  }
})

// GET BY ID
router.get('/:entity/:id', getModel, async (req, res) => {
  try {
    const { id } = req.params
    const record = await req.model.findUnique({ where: { id } })
    if (!record) {
      return res.status(404).json({ success: false, message: 'Record not found' })
    }
    res.status(200).json({ success: true, record })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching record', error: error.message })
  }
})

// CREATE (valida duplicado)
router.post('/:entity', getModel, async (req, res) => {
  try {
    const { name } = req.body
    const existing = await req.model.findFirst({ where: { name } })
    if (existing) {
      return res.status(400).json({ success: false, message: `Record with name "${name}" already exists` })
    }
    const created = await req.model.create({ data: { name } })
    res.status(201).json({ success: true, created })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating record', error: error.message })
  }
})

// UPDATE (valida duplicado)
router.put('/:entity/:id', getModel, async (req, res) => {
  try {
    const { id } = req.params
    const { name } = req.body

    // Verificar duplicado con otro registro
    const existing = await req.model.findFirst({ where: { name, NOT: { id } } })
    if (existing) {
      return res.status(400).json({ success: false, message: `Another record with name "${name}" already exists` })
    }

    const updated = await req.model.update({ where: { id }, data: { name } })
    res.status(200).json({ success: true, updated })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating record', error: error.message })
  }
})

// DELETE
router.delete('/:entity/:id', getModel, async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await req.model.delete({ where: { id } })
    res.status(200).json({ success: true, deleted })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting record', error: error.message })
  }
})

export default router
