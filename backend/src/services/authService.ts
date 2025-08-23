import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import pool from '../config/database';
import { User, JWTPayload, AuthResponse } from '../types/user';

export class AuthService {
  static async login(email: string, password: string): Promise<AuthResponse> {
    try {
      // Buscar usuario por email
      const result = await pool.query(
        'SELECT * FROM curetcore.users WHERE email = $1 AND is_active = true',
        [email]
      );

      if (result.rows.length === 0) {
        throw new Error('Invalid credentials');
      }

      const user: User = result.rows[0];

      // Verificar contraseña
      const isValidPassword = await bcrypt.compare(password, user.password_hash!);
      if (!isValidPassword) {
        throw new Error('Invalid credentials');
      }

      // Actualizar último login
      await pool.query(
        'UPDATE curetcore.users SET last_login = NOW() WHERE id = $1',
        [user.id]
      );

      // Generar tokens
      const payload: JWTPayload = {
        userId: user.id,
        email: user.email,
        role: user.role
      };

      const accessTokenOptions: SignOptions = {
        expiresIn: process.env.JWT_EXPIRES_IN || '15m'
      };

      const refreshTokenOptions: SignOptions = {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d'
      };

      const accessToken = jwt.sign(
        payload, 
        process.env.JWT_SECRET as string, 
        accessTokenOptions
      );

      const refreshToken = jwt.sign(
        payload, 
        process.env.JWT_REFRESH_SECRET as string, 
        refreshTokenOptions
      );

      // Eliminar password_hash del objeto usuario
      const { password_hash, ...userWithoutPassword } = user;

      return {
        user: userWithoutPassword,
        accessToken,
        refreshToken
      };
    } catch (error) {
      throw error;
    }
  }

  static async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as JWTPayload;
      
      const payload: JWTPayload = {
        userId: decoded.userId,
        email: decoded.email,
        role: decoded.role
      };

      const accessTokenOptions: SignOptions = {
        expiresIn: process.env.JWT_EXPIRES_IN || '15m'
      };

      const accessToken = jwt.sign(
        payload, 
        process.env.JWT_SECRET as string, 
        accessTokenOptions
      );

      return { accessToken };
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }

  static async createUser(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    role: string
  ): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const result = await pool.query(
        `INSERT INTO curetcore.users 
         (email, password_hash, first_name, last_name, role, is_active) 
         VALUES ($1, $2, $3, $4, $5, true) 
         RETURNING id, email, first_name, last_name, role, created_at, is_active`,
        [email, hashedPassword, firstName, lastName, role]
      );

      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
}