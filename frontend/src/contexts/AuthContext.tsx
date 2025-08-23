'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { authService, User } from '@/services/authService';
import { authentikService } from '@/services/authentikService';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithAuthentik: () => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const checkAuth = async () => {
    try {
      if (authService.isAuthenticated()) {
        const userData = await authService.getCurrentUser();
        setUser(userData);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await authService.login({ email, password });
    setUser(response.user);
  };

  const loginWithAuthentik = async () => {
    try {
      const loginUrl = await authentikService.getLoginUrl();
      window.location.href = loginUrl;
    } catch (error) {
      console.error('Error iniciando login con Authentik:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Primero logout local
      await authService.logout();
      setUser(null);
      
      // Si hay token de Authentik, hacer logout allá también
      const idToken = localStorage.getItem('idToken');
      if (idToken) {
        const logoutUrl = await authentikService.getLogoutUrl(idToken);
        window.location.href = logoutUrl;
      } else {
        router.push('/login');
      }
    } catch (error) {
      console.error('Error en logout:', error);
      router.push('/login');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, loginWithAuthentik, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}