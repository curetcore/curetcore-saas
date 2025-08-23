import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWTPayload, AuthResponse } from '../types/user';

// Mock users for testing when database is unavailable
const MOCK_USERS = [
  {
    id: '1',
    email: 'admin@curetcore.com',
    password_hash: '$2a$10$YourHashHere', // Will be set on first use
    first_name: 'Admin',
    last_name: 'User',
    role: 'admin',
    created_at: new Date(),
    updated_at: new Date(),
    last_login: null,
    is_active: true
  }
];

export class MockAuthService {
  static async login(email: string, password: string): Promise<AuthResponse> {
    console.log('⚠️  Using MOCK authentication (database unavailable)');
    
    // Find mock user
    const user = MOCK_USERS.find(u => u.email === email);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // For demo purposes, accept specific passwords
    const validPasswords: Record<string, string> = {
      'admin@curetcore.com': 'CuretAdmin2024!'
    };

    if (validPasswords[email] !== password) {
      throw new Error('Invalid credentials');
    }

    // Generate tokens
    const payload: JWTPayload = {
      userId: user.id,
      email: user.email,
      role: user.role
    };

    const accessToken = jwt.sign(
      payload, 
      process.env.JWT_SECRET as string, 
      {
        expiresIn: process.env.JWT_EXPIRES_IN || '15m'
      } as any
    );

    const refreshToken = jwt.sign(
      payload, 
      process.env.JWT_REFRESH_SECRET as string, 
      {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d'
      } as any
    );

    // Return user without password
    const { password_hash, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      accessToken,
      refreshToken
    };
  }

  static async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as JWTPayload;
      
      const payload: JWTPayload = {
        userId: decoded.userId,
        email: decoded.email,
        role: decoded.role
      };

      const accessToken = jwt.sign(
        payload, 
        process.env.JWT_SECRET as string, 
        {
          expiresIn: process.env.JWT_EXPIRES_IN || '15m'
        } as any
      );

      return { accessToken };
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }
}