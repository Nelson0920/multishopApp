import express from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../config/prisma.js';

const router = express.Router();

// --- Cuentas Contables ---

// Obtener todas las cuentas contables
router.get('/accounting/', async (req, res) => {
  try {
    const accounting = await prisma.accountingAccounts.findMany();
    if (accounting.length > 0) {
      return res.status(200).json({ success: true, code: 200, accounting });
    } else {
      return res.status(404).json({ success: false, code: 404, message: 'No accounting accounts found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching accounting accounts' });
  }
});

// Crear una nueva cuenta contable
router.post('/accounting/register', async (req, res) => {
  try {
    const data = req.body;

    const search = await prisma.accountingAccounts.findMany({ where: { codigo: data.codigo } });

    if (search.length > 0) {
      res.status(400).json({ success: false, message: 'This account already exists', account: search[0].name });
    } else {
      const account = await prisma.accountingAccounts.create({ data });
      res.status(201).json({ success: true, message: 'Accounting account created successfully', account });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error creating the accounting account', error });
  }
});

// Actualizar una cuenta contable
router.put('/accounting/edit/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = req.body;

    const search = await prisma.accountingAccounts.findUnique({ where: { id } });

    if (search) {
      const account = await prisma.accountingAccounts.update({
        where: { id },
        data,
      });
      res.status(200).json({ success: true, message: 'Accounting account updated successfully', account });
    } else {
      res.status(404).json({ success: false, message: 'No accounting account found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error updating the accounting account', error });
  }
});

// Eliminar una cuenta contable
router.delete('/accounting/delete/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const account = await prisma.accountingAccounts.delete({ where: { id } });
    res.status(200).json({ success: true, message: 'Accounting account successfully deleted', account });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error deleting the accounting account' });
  }
});

// --- Cuentas Auxiliares ---


export default router;
