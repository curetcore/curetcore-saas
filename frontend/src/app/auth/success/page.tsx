'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authentikService } from '@/services/authentikService';
import { PageLoader } from '@/components/ui/loading-states';

export default function AuthSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = () => {
      const result = authentikService.handleCallback();
      
      if (result.error) {
        console.error('Error en autenticación:', result.error);
        router.push('/login?error=auth_failed');
      } else if (result.token && result.refresh) {
        // Tokens guardados, redirigir al dashboard
        router.push('/dashboard');
      } else {
        router.push('/login');
      }
    };

    handleCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <PageLoader />
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Completando autenticación...
        </p>
      </div>
    </div>
  );
}