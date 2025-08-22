import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { AuthService } from '../services/authService';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = Router();

// Login
router.post('/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      
      res.json({
        success: true,
        data: result
      });
    } catch (error: any) {
      res.status(401).json({
        success: false,
        error: error.message
      });
    }
  }
);

// Refresh token
router.post('/refresh',
  [body('refreshToken').notEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { refreshToken } = req.body;
      const result = await AuthService.refreshToken(refreshToken);
      
      res.json({
        success: true,
        data: result
      });
    } catch (error: any) {
      res.status(401).json({
        success: false,
        error: error.message
      });
    }
  }
);

// Get current user
router.get('/me', authenticateToken, async (req: AuthRequest, res) => {
  try {
    res.json({
      success: true,
      data: req.user
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Logout (cliente debe eliminar tokens)
router.post('/logout', authenticateToken, (req: AuthRequest, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

export default router;