'use client';

import { useEffect, useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { WidgetSkeleton } from '@/components/ui/loading-states';
import { SimpleTooltip } from '@/components/ui/tooltip';

interface DailySalesData {
  total: number;
  count: number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
}

export function DailySalesWidget() {
  const [data, setData] = useState<DailySalesData>({
    total: 0,
    count: 0,
    change: 0,
    trend: 'neutral'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Implementar llamada a API real
    // Simulación de datos
    setTimeout(() => {
      setData({
        total: 15750.50,
        count: 127,
        change: 12.5,
        trend: 'up'
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <WidgetSkeleton />;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <SimpleTooltip content="Ventas totales del día">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg">
            <DollarSign className="h-6 w-6 text-white" />
          </div>
        </SimpleTooltip>
        <SimpleTooltip content={`${data.trend === 'up' ? 'Incremento' : 'Disminución'} vs. ayer`}>
          <div className={`flex items-center space-x-1 text-sm font-medium ${
            data.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
          }`}>
            {data.trend === 'up' ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            <span>{data.change}%</span>
          </div>
        </SimpleTooltip>
      </div>
      
      <div className="mt-4">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
          Ventas del Día
        </p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
          ${data.total.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
        </p>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <span className="font-medium text-gray-900 dark:text-white">{data.count}</span> ventas realizadas
        </p>
      </div>
    </div>
  );
}