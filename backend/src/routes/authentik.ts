import { Router, Request, Response } from 'express';
import { 
  getAuthentikClient, 
  generateLoginUrl, 
  generateLogoutUrl,
  validateAuthentikToken 
} from '../config/authentik';
import jwt from 'jsonwebtoken';
import pool from '../config/database';

const router = Router();

// Estado temporal para CSRF protection
const stateStore = new Map<string, { nonce: string; timestamp: number }>();

// Limpiar estados antiguos cada 5 minutos
setInterval(() => {
  const now = Date.now();
  for (const [state, data] of stateStore.entries()) {
    if (now - data.timestamp > 600000) { // 10 minutos
      stateStore.delete(state);
    }
  }
}, 300000);

// Iniciar login con Authentik
router.get('/login', (_req: Request, res: Response) => {
  try {
    const { url, state, nonce } = generateLoginUrl();
    
    // Guardar state y nonce para validación
    stateStore.set(state, { nonce, timestamp: Date.now() });
    
    res.json({ loginUrl: url });
  } catch (error) {
    console.error('Error generando URL de login:', error);
    res.status(500).json({ error: 'Error al iniciar login' });
  }
});

// Callback de Authentik
router.get('/callback', async (req: Request, res: Response): Promise<void> => {
  try {
    const { code, state } = req.query;
    
    if (!code || !state) {
      res.status(400).json({ error: 'Código o estado faltante' });
      return;
    }
    
    // Validar state
    const stateData = stateStore.get(state as string);
    if (!stateData) {
      res.status(400).json({ error: 'Estado inválido' });
      return;
    }
    stateStore.delete(state as string);
    
    // Intercambiar código por tokens
    const client = await getAuthentikClient();
    const tokenSet = await client.callback(
      process.env.AUTHENTIK_REDIRECT_URI || 'http://localhost:3000/auth/callback',
      { code, state },
      { nonce: stateData.nonce }
    );
    
    // Obtener información del usuario
    const userinfo = await client.userinfo(tokenSet.access_token);
    
    // Buscar o crear usuario en nuestra base de datos
    let user;
    try {
      const result = await pool.query(
        'SELECT * FROM curetcore.users WHERE email = $1',
        [userinfo.email]
      );
      
      if (result.rows.length === 0) {
        // Crear nuevo usuario
        const createResult = await pool.query(
          `INSERT INTO curetcore.users 
           (email, first_name, last_name, role, is_active, authentik_id) 
           VALUES ($1, $2, $3, $4, true, $5) 
           RETURNING id, email, first_name, last_name, role, created_at`,
          [
            userinfo.email,
            userinfo.given_name || userinfo.name?.split(' ')[0] || '',
            userinfo.family_name || userinfo.name?.split(' ')[1] || '',
            'viewer', // Rol por defecto
            userinfo.sub
          ]
        );
        user = createResult.rows[0];
      } else {
        user = result.rows[0];
        // Actualizar último login
        await pool.query(
          'UPDATE curetcore.users SET last_login = NOW() WHERE id = $1',
          [user.id]
        );
      }
    } catch (dbError) {
      console.error('Error de base de datos, usando datos de Authentik:', dbError);
      // Si no hay DB, usar datos de Authentik directamente
      user = {
        id: userinfo.sub,
        email: userinfo.email,
        first_name: userinfo.given_name || '',
        last_name: userinfo.family_name || '',
        role: 'viewer',
      };
    }
    
    // Generar nuestros propios tokens JWT
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      authentikId: userinfo.sub,
    };
    
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_SECRET as string,
      { expiresIn: '15m' }
    );
    
    const refreshToken = jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET as string,
      { expiresIn: '7d' }
    );
    
    // Redirigir al frontend con tokens
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const redirectUrl = new URL('/auth/success', frontendUrl);
    redirectUrl.searchParams.append('token', accessToken);
    redirectUrl.searchParams.append('refresh', refreshToken);
    
    res.redirect(redirectUrl.toString());
  } catch (error) {
    console.error('Error en callback de Authentik:', error);
    res.status(500).json({ error: 'Error procesando autenticación' });
  }
});

// Logout
router.post('/logout', async (req: Request, res: Response) => {
  try {
    const idToken = req.body.idToken;
    const logoutUrl = generateLogoutUrl(idToken);
    
    res.json({ logoutUrl });
  } catch (error) {
    console.error('Error en logout:', error);
    res.status(500).json({ error: 'Error al cerrar sesión' });
  }
});

// Validar token de Authentik
router.post('/validate', async (req: Request, res: Response): Promise<void> => {
  try {
    const { token } = req.body;
    
    if (!token) {
      res.status(400).json({ error: 'Token requerido' });
      return;
    }
    
    const decoded = await validateAuthentikToken(token);
    res.json({ valid: true, user: decoded });
  } catch (error) {
    console.error('Error validando token:', error);
    res.status(401).json({ valid: false, error: 'Token inválido' });
  }
});

export default router;