'use client';

import { useEffect, useState } from 'react';
import { BarChart3, TrendingUp, TrendingDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { DateRange } from '@/components/ui/date-filter';

interface HourlyData {
  hour: string;
  sales: number;
  isHighlight?: boolean;
}

interface HourlySalesChartProps {
  dateRange: DateRange | null;
}

export function HourlySalesChart({ dateRange }: HourlySalesChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [data, setData] = useState<HourlyData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // TODO: Implementar llamada a API real con dateRange
    // Simulación de datos según el rango de fechas
    setTimeout(() => {
      let chartData: HourlyData[] = [];
      
      if (dateRange?.label === 'Hoy') {
        // Datos para hoy (hasta la hora actual)
        const currentHour = new Date().getHours();
        chartData = [
          { hour: '9:00', sales: 1200 },
          { hour: '10:00', sales: 1800 },
          { hour: '11:00', sales: 2400 },
          { hour: '12:00', sales: 3200, isHighlight: true },
          { hour: '13:00', sales: 2800 },
          { hour: '14:00', sales: 2200 },
          { hour: '15:00', sales: currentHour >= 15 ? 2600 : 0 },
          { hour: '16:00', sales: currentHour >= 16 ? 3000 : 0 },
          { hour: '17:00', sales: currentHour >= 17 ? 2400 : 0 },
          { hour: '18:00', sales: currentHour >= 18 ? 1600 : 0 },
        ];
      } else {
        // Datos completos para otros rangos
        chartData = [
          { hour: '9:00', sales: 1200 },
          { hour: '10:00', sales: 1800 },
          { hour: '11:00', sales: 2400 },
          { hour: '12:00', sales: 3200, isHighlight: true },
          { hour: '13:00', sales: 2800 },
          { hour: '14:00', sales: 2200 },
          { hour: '15:00', sales: 2600 },
          { hour: '16:00', sales: 3000 },
          { hour: '17:00', sales: 2400 },
          { hour: '18:00', sales: 1600 },
        ];
      }
      
      setData(chartData);
      setLoading(false);
    }, 800);
  }, [dateRange]);
  
  const handleMouseEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };
  
  const handleMouseLeave = () => {
    setActiveIndex(null);
  };
  
  const totalSales = data.reduce((sum, item) => sum + item.sales, 0);
  const avgSales = totalSales / data.filter(item => item.sales > 0).length || 0;

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 animate-pulse">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
        <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <BarChart3 className="h-6 w-6 text-purple-600 dark:text-purple-400 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Ventas por Hora {dateRange ? `(${dateRange.label})` : ''}
          </h3>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center">
            <span className="text-gray-500 dark:text-gray-400">Total:</span>
            <span className="ml-1 font-semibold text-gray-900 dark:text-white">
              ${totalSales.toLocaleString('es-ES')}
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-500 dark:text-gray-400">Promedio:</span>
            <span className="ml-1 font-semibold text-gray-900 dark:text-white">
              ${avgSales.toFixed(0)}
            </span>
          </div>
        </div>
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
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={
                    entry.isHighlight 
                      ? '#7C3AED' 
                      : activeIndex === index 
                        ? '#9333EA' 
                        : '#8B5CF6'
                  }
                  style={{
                    filter: activeIndex === index ? 'brightness(1.1)' : 'none',
                    cursor: 'pointer'
                  }}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}