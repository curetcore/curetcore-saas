'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { ErrorBoundary } from '@/components/error-boundary';
import { cn } from '@/lib/utils';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };
  
  return (
    <ProtectedRoute>
      <ErrorBoundary>
        <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
          <Header onToggleSidebar={toggleSidebar} isSidebarCollapsed={isSidebarCollapsed} />
          <div className="flex flex-1 overflow-hidden">
            <Sidebar isCollapsed={isSidebarCollapsed} />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
              <div className="flex flex-col min-h-full">
                <div className="flex-1 container mx-auto px-6 py-8">
                  <ErrorBoundary>
                    {children}
                  </ErrorBoundary>
                </div>
                <Footer />
              </div>
            </main>
          </div>
        </div>
      </ErrorBoundary>
    </ProtectedRoute>
  );
}