import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.SECRET;

export const adminMiddleware = (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: "Usuario no autenticado" });

  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Acceso denegado: solo admin" });
  }

  next(); // usuario es admin, puede continuar
};

export const authMiddleware = (req, res, next) => {

  const authHeader = req.headers['authorization']; 
  if (!authHeader) return res.status(401).json({ message: 'Token requerido' });

  const token = authHeader.split(' ')[1]; 
  if (!token) return res.status(401).json({ message: 'Token inválido' });

  try {
    //Verificar token
    const userData = jwt.verify(token, JWT_SECRET);

    //Guardar info del usuario en la request para usarla en los endpoints
    req.user = userData;

    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token inválido o expirado' });
  }
};
