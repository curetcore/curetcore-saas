'use client';

import { useEffect, useState } from 'react';
import { Target } from 'lucide-react';

interface MonthlyProgressData {
  current: number;
  target: number;
  percentage: number;
  daysLeft: number;
}

export function MonthlyProgressWidget() {
  const [data, setData] = useState<MonthlyProgressData>({
    current: 0,
    target: 0,
    percentage: 0,
    daysLeft: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Implementar llamada a API real
    // Simulación de datos
    setTimeout(() => {
      const current = 385000;
      const target = 500000;
      setData({
        current,
        target,
        percentage: (current / target) * 100,
        daysLeft: 8
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
          <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
            <Target className="h-6 w-6 text-green-600 dark:text-green-300" />
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Progreso Mensual
            </h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {data.percentage.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>
      
      <div className="mb-2">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600 dark:text-gray-400">
            ${data.current.toLocaleString('es-ES')}
          </span>
          <span className="text-gray-600 dark:text-gray-400">
            Meta: ${data.target.toLocaleString('es-ES')}
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-green-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(data.percentage, 100)}%` }}
          ></div>
        </div>
      </div>
      
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {data.daysLeft} días restantes
      </p>
    </div>
  );
}