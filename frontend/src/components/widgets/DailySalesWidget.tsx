'use client';

import { useEffect, useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

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
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 animate-pulse">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <DollarSign className="h-6 w-6 text-blue-600 dark:text-blue-300" />
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Ventas del Día
            </h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              ${data.total.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600 dark:text-gray-400">
          {data.count} ventas
        </span>
        <div className={`flex items-center ${
          data.trend === 'up' ? 'text-green-600' : 'text-red-600'
        }`}>
          {data.trend === 'up' ? (
            <TrendingUp className="h-4 w-4 mr-1" />
          ) : (
            <TrendingDown className="h-4 w-4 mr-1" />
          )}
          {data.change}%
        </div>
      </div>
    </div>
  );
}