import { JWT } from '../global/_var.js'
import jwt from 'jsonwebtoken'

export const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    JWT,
    { expiresIn: '7d' }
  );
};

