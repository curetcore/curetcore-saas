'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { authService } from '@/services/authService';
import axios from 'axios';

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { checkAuth } = useAuth();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Obtener parámetros de la URL
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        const error = searchParams.get('error');
        const errorDescription = searchParams.get('error_description');

        // Si hay un error de Authentik
        if (error) {
          setError(errorDescription || 'Error durante la autenticación');
          setLoading(false);
          setTimeout(() => router.push('/login'), 3000);
          return;
        }

        // Si no hay código o state, es un callback inválido
        if (!code || !state) {
          setError('Parámetros de autenticación faltantes');
          setLoading(false);
          setTimeout(() => router.push('/login'), 3000);
          return;
        }

        // Enviar código al backend para intercambiar por tokens
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/authentik/callback`,
          {
            params: { code, state },
            maxRedirects: 0, // No seguir redirecciones automáticamente
            validateStatus: (status) => status >= 200 && status < 400, // Aceptar redirecciones como válidas
          }
        );

        // Si el backend responde con una redirección
        if (response.status >= 300 && response.status < 400) {
          // Extraer tokens de la URL de redirección
          const redirectUrl = response.headers.location;
          if (redirectUrl) {
            const url = new URL(redirectUrl, window.location.origin);
            const token = url.searchParams.get('token');
            const refresh = url.searchParams.get('refresh');

            if (token && refresh) {
              // Guardar tokens
              localStorage.setItem('accessToken', token);
              localStorage.setItem('refreshToken', refresh);
              
              // Actualizar contexto de autenticación
              await checkAuth();
              
              // Redirigir al dashboard
              router.push('/dashboard');
              return;
            }
          }
        }

        // Si llegamos aquí, algo salió mal
        setError('No se pudieron obtener los tokens de autenticación');
        setTimeout(() => router.push('/login'), 3000);

      } catch (error: any) {
        console.error('Error en callback:', error);
        
        // Si es un error de red o el backend no responde
        if (error.code === 'ERR_NETWORK') {
          setError('No se pudo conectar con el servidor. Por favor, intenta de nuevo.');
        } else {
          setError(error.response?.data?.error || 'Error durante la autenticación');
        }
        
        setLoading(false);
        setTimeout(() => router.push('/login'), 3000);
      }
    };

    handleCallback();
  }, [searchParams, router, checkAuth]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <img
            className="mx-auto h-12 w-auto dark:hidden"
            src="/logo-black.png"
            alt="CuretCore"
          />
          <img
            className="mx-auto h-12 w-auto hidden dark:block"
            src="/logo-white.png"
            alt="CuretCore"
          />
          
          {loading && !error && (
            <>
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
                Completando autenticación
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Por favor espera mientras verificamos tu identidad...
              </p>
              <div className="mt-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
              </div>
            </>
          )}
          
          {error && (
            <>
              <h2 className="mt-6 text-3xl font-extrabold text-red-600 dark:text-red-400">
                Error de autenticación
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {error}
              </p>
              <p className="mt-4 text-xs text-gray-500 dark:text-gray-500">
                Serás redirigido al login en unos segundos...
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    }>
      <AuthCallbackContent />
    </Suspense>
  );
}