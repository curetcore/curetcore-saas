'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/authService';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (authService.isAuthenticated()) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  }, [router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </main>
  )
}