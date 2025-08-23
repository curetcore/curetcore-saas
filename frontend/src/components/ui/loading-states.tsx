'use client';

import { Skeleton } from './skeleton';
import { Loader2 } from 'lucide-react';

// Widget Loading State
export function WidgetSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-12 w-12 rounded-lg" />
        <Skeleton className="h-6 w-20" />
      </div>
      <Skeleton className="h-4 w-32 mb-2" />
      <Skeleton className="h-8 w-40 mb-4" />
      <Skeleton className="h-2 w-full" />
    </div>
  );
}

// Table Loading State
export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <Skeleton className="h-6 w-48" />
      </div>
      <div className="p-6">
        <div className="space-y-3">
          {[...Array(rows)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
              <Skeleton className="h-8 w-20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Chart Loading State
export function ChartSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="mb-4">
        <Skeleton className="h-6 w-48 mb-2" />
        <Skeleton className="h-4 w-32" />
      </div>
      <div className="h-64 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500 dark:text-gray-400">Cargando gráfico...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Page Loading State
export function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-purple-600 dark:text-purple-400 mx-auto mb-4" />
        <p className="text-lg text-gray-600 dark:text-gray-400">Cargando...</p>
      </div>
    </div>
  );
}

// Inline Loading State
export function InlineLoader({ text = "Cargando..." }: { text?: string }) {
  return (
    <div className="flex items-center space-x-2">
      <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
      <span className="text-sm text-gray-500 dark:text-gray-400">{text}</span>
    </div>
  );
}