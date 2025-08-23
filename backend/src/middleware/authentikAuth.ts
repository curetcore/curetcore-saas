import { Request, Response, NextFunction } from 'express';
import { validateAuthentikToken } from '../config/authentik';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: any;
}

export async function authentikAuth(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Token de autorización requerido' });
      return;
    }
    
    const token = authHeader.substring(7);
    
    try {
      // Primero intentar validar como token de Authentik
      const authentikUser = await validateAuthentikToken(token);
      req.user = {
        id: authentikUser.sub,
        email: authentikUser.email,
        role: authentikUser.role || 'viewer',
        authentikId: authentikUser.sub,
      };
      next();
    } catch (authentikError) {
      // Si falla, intentar como token JWT propio
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
        req.user = {
          id: decoded.userId,
          email: decoded.email,
          role: decoded.role,
          authentikId: decoded.authentikId,
        };
        next();
      } catch (jwtError) {
        res.status(401).json({ error: 'Token inválido' });
        return;
      }
    }
  } catch (error) {
    console.error('Error en autenticación:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}