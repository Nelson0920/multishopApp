import express from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../config/prisma.js';

const router = express.Router()

// Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener usuarios', 
      error: error.message,
    });
  }
});


// Obtener un usuario por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return res.status(404).json({ success: false, message: 'Usuario no encontrado' });

    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener el usuario' });
  }
});


// Crear un nuevo usuario
router.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    res.status(201).json({ success: true, message: 'Usuario creado', user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al crear el usuario' });
  }
});


// Actualizar un usuario
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { name, email, password: hashedPassword },
    });

    res.json({ success: true, message: 'Usuario actualizado', updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al actualizar el usuario' });
  }
});


// Eliminar un usuario
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({ where: { id } });
    res.json({ success: true, message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al eliminar el usuario' });
  }
});

export default router