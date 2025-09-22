import express from 'express'
import bcrypt from 'bcryptjs'
import prisma from '../config/prisma.js'

const router = express.Router()

// --- Conceptos de Retención ISLR --- 

// Obtener todos los conceptos
router.get('/concepts/islr', async (req, res) => {
  try {
    const concept = await prisma.retentionISLRConcepts.findMany()
    if (concept.length > 0) {
      return res.status(200).json({ success: true, code:200, message: 'Retention ISLR Concept found', concept })
    }else{
      return res.status(404).json({ success: false, code:404 , message: 'Retention ISLR Concept not found' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: 'Error fetching Retention ISLR Concept' })
  }
})

// Obtener un concepto por ID
router.get('/concept/islr/:id', async (req, res) => {
  try {
  const { id } = req.params

    const concept = await prisma.retentionISLRConcepts.findUnique({ where: { id } })

    if (!concept) return res.status(404).json({ success: false, message: 'Retention ISLR Concept not found' })

    res.status(200).json({ success: true, code:200, message: 'Retention ISLR Concept found', concept })
    
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: 'Error fetching Retention ISLR Concept'})
  }
})

// Crear un nuevo cliente
router.post('/concept/islr/register', async (req, res) => {
  try {
    const data = req.body

    const existingConcept = await prisma.retentionISLRConcepts.findMany({ where: { code: data.code } })

    if (existingConcept.length > 0) {
      return res.status(400).json({ success: false, code:400, message: 'The retention concept ISLR already exists', data })
    }

    const concept = await prisma.retentionISLRConcepts.create({data})

    res.status(201).json({ success: true,  message: 'Retention concept ISLR created successfully', concept })

  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: 'Error creating retention concept ISLR', error })
  }
})

// Editar un concepto
router.put('/concept/islr/edit/:id', async (req, res) => {
  try {
  const { id } = req.params
  const data = req.body

  const search = await prisma.retentionISLRConcepts.findMany({ where: { id } })
  
  if (search.length == 0) {
    return res.status(404).json({ success: false,  code:404, message: 'Retention concept ISLR not found' })
  }

  const concept = await prisma.retentionISLRConcepts.update({
    data,
    where: {id}
  })

  res.status(200).json({ success: true, code: 200, message: 'Retention concept ISLR updated successfully', concept })

  } catch (error) {
    res.status(500).json({ success: false, code: 500, message: 'Error updating Retention concept ISLR' })
  }
})

// Eliminar un concepto
router.delete('/concept/islr/delete/:id', async (req, res) => {
  try {
    const { id } = req.params

    const search = await prisma.retentionISLRConcepts.findUnique({ where: { id } })

    if(search){
      const concept = await prisma.retentionISLRConcepts.delete({ where: { id } })

      res.status(200).json({ success: true, code:200, message: 'Retention concept ISLR deleted successfully', concept })
    }else{
      res.status(404).json({ success: false, code:404, message: 'Retention concept ISLR not found' })
    }

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, code:500, message: 'Error deleting the Retention concept ISLR', error })
  }
})

// --- Condiciones de Pago ---

// Obtener todas las condiciones
router.get('/payment/conditions', async (req, res) => {
  try {
    const conditions = await prisma.paymentConditions.findMany()
    if (conditions.length > 0) {
      return res.status(200).json({ success: true, code:200, message: 'Payment Conditions found', conditions })
    }else{
      return res.status(404).json({ success: false, code:404 , message: 'Payment Conditions not found' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: 'Error fetching Payment conditions' })
  }
})

// Obtener una condicion de pago por ID
router.get('/payment/condition/:id', async (req, res) => {
  try {
  const { id } = req.params

    const condition = await prisma.paymentConditions.findUnique({ where: { id } })

    if (!condition) return res.status(404).json({ success: false, message: 'Payment condition not found' })

    res.status(200).json({ success: true, code:200, message: 'Payment condition found', condition })
    
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: 'Error fetching Payment condition'})
  }
})

// Crear una nueva condición de pago
router.post('/payment/condition/register', async (req, res) => {
  try {
    const data = req.body

    const existingCondition = await prisma.paymentConditions.findMany({ where: { days: data.days } })

    if (existingCondition.length > 0) {
      return res.status(400).json({ success: false, code:400, message: 'Payment Condition already exists', data })
    }

    const condition = await prisma.paymentConditions.create({data})

    res.status(201).json({ success: true, code: 200, message: 'Payment condition created successfully', condition })

  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: 'Error creating Payment condition', error })
  }
})

// Editar una condición de pago
router.put('/payment/condition/edit/:id', async (req, res) => {
  try {
  const { id } = req.params
  const data = req.body

  const search = await prisma.paymentConditions.findMany({ where: { id } })
  
  if (search.length == 0) {
    return res.status(404).json({ success: false,  code:404, message: 'Payment condition not found' })
  }

  const condition = await prisma.paymentConditions.update({
    data,
    where: {id}
  })

  res.status(200).json({ success: true, code: 200, message: 'Payment condition updated successfully', condition })

  } catch (error) {
    res.status(500).json({ success: false, code: 500, message: 'Error updating payment condition' })
  }
})

// Eliminar una condición de pago
router.delete('/payment/condition/delete/:id', async (req, res) => {
  try {
    const { id } = req.params

    const search = await prisma.paymentConditions.findUnique({ where: { id } })

    if(search){
      const condition = await prisma.paymentConditions.delete({ where: { id } })

      res.status(200).json({ success: true, code:200, message: 'Payment condition deleted successfully', condition })
    }else{
      res.status(404).json({ success: false, code:404, message: 'Payment condition not found' })
    }

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, code:500, message: 'Error deleting the Payment condition', error })
  }
})

export default router
