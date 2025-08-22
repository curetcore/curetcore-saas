'use client';

import { useEffect, useState } from 'react';
import { BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface HourlyData {
  hour: string;
  sales: number;
}

export function HourlySalesChart() {
  const [data, setData] = useState<HourlyData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Implementar llamada a API real
    // Simulación de datos
    setTimeout(() => {
      setData([
        { hour: '9:00', sales: 1200 },
        { hour: '10:00', sales: 1800 },
        { hour: '11:00', sales: 2400 },
        { hour: '12:00', sales: 3200 },
        { hour: '13:00', sales: 2800 },
        { hour: '14:00', sales: 2200 },
        { hour: '15:00', sales: 2600 },
        { hour: '16:00', sales: 3000 },
        { hour: '17:00', sales: 2400 },
        { hour: '18:00', sales: 1600 },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 animate-pulse">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
        <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center mb-6">
        <BarChart3 className="h-6 w-6 text-purple-600 dark:text-purple-400 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Ventas por Hora
        </h3>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="hour" 
              tick={{ fill: '#9CA3AF' }}
              axisLine={{ stroke: '#E5E7EB' }}
            />
            <YAxis 
              tick={{ fill: '#9CA3AF' }}
              axisLine={{ stroke: '#E5E7EB' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937',
                border: 'none',
                borderRadius: '8px',
                color: '#F3F4F6'
              }}
              formatter={(value: number) => [`$${value.toLocaleString('es-ES')}`, 'Ventas']}
            />
            <Bar 
              dataKey="sales" 
              fill="#8B5CF6" 
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}