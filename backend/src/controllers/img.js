import express from 'express';
import prisma from '../config/prisma.js';

const router = express.Router();

// Obtener todas las imágenes
router.get('/', async (req, res) => {
  try {
    const images = await prisma.images.findMany();
    res.json({ success: true, images });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener las imágenes', 
      error: error.message,
    });
  }
});

// Obtener una imagen por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const image = await prisma.images.findUnique({ where: { id } });
    if (!image) {
      return res.status(404).json({ success: false, message: 'Imagen no encontrada' });
    }
    res.json({ success: true, image });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener la imagen', error: error.message });
  }
});

// Crear una nueva imagen
router.post('/', async (req, res) => {
  const { id_product, imageBase64 } = req.body;

  if (!id_product || !imageBase64) {
    return res.status(400).json({ success: false, message: 'Faltan campos requeridos' });
  }

  try {
    const buffer = Buffer.from(imageBase64, 'base64');
    const newImage = await prisma.images.create({
      data: {
        id_product,
        image: buffer,
      },
    });
    res.status(201).json({ success: true, message: 'Imagen creada', image: newImage });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al crear la imagen', error: error.message });
  }
});

// Actualizar una imagen
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { id_product, imageBase64 } = req.body;

  try {
    const existing = await prisma.images.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Imagen no encontrada' });
    }

    const data = {};
    if (id_product) data.id_product = id_product;
    if (imageBase64) data.image = Buffer.from(imageBase64, 'base64');

    const updatedImage = await prisma.images.update({
      where: { id },
      data,
    });

    res.json({ success: true, message: 'Imagen actualizada', image: updatedImage });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al actualizar la imagen', error: error.message });
  }
});

// Eliminar una imagen
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const existing = await prisma.images.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Imagen no encontrada' });
    }

    await prisma.images.delete({ where: { id } });
    res.json({ success: true, message: 'Imagen eliminada' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al eliminar la imagen', error: error.message });
  }
});

export default router;
