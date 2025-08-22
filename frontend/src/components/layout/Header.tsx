'use client';

import { Bell, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export function Header() {
  const { user } = useAuth();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="px-6 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Dashboard
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {new Date().toLocaleDateString('es-ES', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
            <Bell className="h-5 w-5" />
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {user?.first_name} {user?.last_name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {user?.role}
              </p>
            </div>
            <div className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full">
              <User className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}