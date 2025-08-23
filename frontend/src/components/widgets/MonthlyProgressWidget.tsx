'use client';

import { useEffect, useState } from 'react';
import { Target } from 'lucide-react';
import { DateRange } from '@/components/ui/date-filter';

interface MonthlyProgressData {
  current: number;
  target: number;
  percentage: number;
  daysLeft: number;
}

interface MonthlyProgressWidgetProps {
  dateRange: DateRange | null;
}

export function MonthlyProgressWidget({ dateRange }: MonthlyProgressWidgetProps) {
  const [data, setData] = useState<MonthlyProgressData>({
    current: 0,
    target: 0,
    percentage: 0,
    daysLeft: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // TODO: Implementar llamada a API real con dateRange
    // Simulación de datos según el rango de fechas
    setTimeout(() => {
      let progressData = {
        current: 385000,
        target: 500000,
        percentage: 77,
        daysLeft: 8
      };
      
      if (dateRange) {
        switch (dateRange.label) {
          case 'Hoy':
            progressData = {
              current: 8432,
              target: 15000,
              percentage: 56.2,
              daysLeft: 0
            };
            break;
          case 'Este mes':
            progressData = {
              current: 385000,
              target: 500000,
              percentage: 77,
              daysLeft: 8
            };
            break;
          case 'Mes pasado':
            progressData = {
              current: 478923,
              target: 450000,
              percentage: 106.4,
              daysLeft: 0
            };
            break;
          case 'Últimos 30 días':
            progressData = {
              current: 425000,
              target: 480000,
              percentage: 88.5,
              daysLeft: 0
            };
            break;
        }
      }
      
      progressData.percentage = (progressData.current / progressData.target) * 100;
      setData(progressData);
      setLoading(false);
    }, 800);
  }, [dateRange]);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 animate-pulse">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg">
          <Target className="h-6 w-6 text-white" />
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {data.percentage.toFixed(1)}%
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            completado
          </p>
        </div>
      </div>
      
      <div className="mt-4">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
          Progreso {dateRange ? `(${dateRange.label})` : 'Mensual'}
        </p>
        <div className="mt-2">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-gray-900 dark:text-white">
              ${data.current.toLocaleString('es-ES')}
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              ${data.target.toLocaleString('es-ES')}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500 relative"
              style={{ width: `${Math.min(data.percentage, 100)}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {data.daysLeft > 0 ? (
            <><span className="font-medium text-gray-900 dark:text-white">{data.daysLeft}</span> días restantes</>
          ) : (
            <span className="font-medium text-gray-900 dark:text-white">Período completado</span>
          )}
        </p>
      </div>
    </div>
  );
}