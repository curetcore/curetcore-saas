'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authentikService } from '@/services/authentikService';
import { PageLoader } from '@/components/ui/loading-states';

export default function AuthSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Por ahora, simplemente redirigir al dashboard
    // La autenticación real se manejará cuando Authentik esté configurado
    router.push('/dashboard');
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