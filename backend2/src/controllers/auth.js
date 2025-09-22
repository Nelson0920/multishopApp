import express from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../config/prisma.js';
import { generateToken } from '../config/jwt.js';
import { Users } from './helpers/users.js'


const router = express.Router()

// Register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'El correo ya está registrado',
      });
    }

    let passMayus = password.toUpperCase()

    const hashedPassword = await bcrypt.hash(passMayus, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const token = generateToken(user);

    res.status(201).json({
      success: true,
      message: 'Usuario registrado exitosamente',
      // token,
      data: user,
    });

  } catch (error) {
    console.error('🔥 Error en el registro:', error);
    res.status(500).json({
      success: false,
      message: 'Error al registrar el usuario',
      error: error.message,
    });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    const token = generateToken(user);

    res.cookie('token', token)
    res.status(200).json({ 
      success: true,
      code: 200,
      message: 'Inicio de sesión exitoso',
    })

  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al iniciar sesión' });
  }
});

// Verify
router.get('/verify', async (req, res) => {
  try {    
    const {token} = req.cookies

    const filterKeys = Object.keys(req.cookies)
  
    if (filterKeys.length < 1 || !token ) {      
      return res.status(400).json({ error: "Token no autorizado, acceso denegado" })
    }else{
      const user = await Users.verifyToken(token)
      res.json(user)
    }
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
});

export default router