'use client';

import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { ErrorBoundary } from '@/components/error-boundary';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <ErrorBoundary>
        <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
          <Header />
          <div className="flex flex-1 overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
              <div className="container mx-auto px-6 py-8">
                <ErrorBoundary>
                  {children}
                </ErrorBoundary>
              </div>
            </main>
          </div>
        </div>
      </ErrorBoundary>
    </ProtectedRoute>
  );
}