import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const authentikService = {
  // Obtener URL de login de Authentik
  async getLoginUrl(): Promise<string> {
    try {
      const response = await axios.get(`${API_URL}/api/authentik/login`);
      return response.data.loginUrl;
    } catch (error) {
      console.error('Error obteniendo URL de login:', error);
      throw error;
    }
  },

  // Obtener URL de logout de Authentik
  async getLogoutUrl(idToken?: string): Promise<string> {
    try {
      const response = await axios.post(`${API_URL}/api/authentik/logout`, { idToken });
      return response.data.logoutUrl;
    } catch (error) {
      console.error('Error obteniendo URL de logout:', error);
      throw error;
    }
  },

  // Validar token de Authentik
  async validateToken(token: string): Promise<{ valid: boolean; user?: any }> {
    try {
      const response = await axios.post(`${API_URL}/api/authentik/validate`, { token });
      return response.data;
    } catch (error) {
      console.error('Error validando token:', error);
      return { valid: false };
    }
  },

  // Manejar callback de Authentik
  handleCallback(): { token?: string; refresh?: string; error?: string } {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const refresh = urlParams.get('refresh');
    const error = urlParams.get('error');

    if (error) {
      return { error };
    }

    if (token && refresh) {
      // Guardar tokens
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refresh);
      return { token, refresh };
    }

    return { error: 'No se encontraron tokens' };
  },
};