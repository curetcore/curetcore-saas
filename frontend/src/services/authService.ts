import api from '@/lib/axios';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  is_active: boolean;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post('/api/auth/login', credentials);
    const data = response.data.data;
    
    // Store tokens
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    
    return data;
  },

  async logout(): Promise<void> {
    try {
      await api.post('/api/auth/logout');
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  },

  async getCurrentUser(): Promise<User> {
    const response = await api.get('/api/auth/me');
    return response.data.data;
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
  }
};