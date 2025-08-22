export interface User {
  id: string;
  email: string;
  password_hash?: string;
  first_name: string;
  last_name: string;
  role: 'super_admin' | 'admin' | 'manager' | 'supervisor' | 'employee' | 'viewer';
  created_at: Date;
  updated_at: Date;
  last_login?: Date;
  is_active: boolean;
}

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: Omit<User, 'password_hash'>;
  accessToken: string;
  refreshToken: string;
}