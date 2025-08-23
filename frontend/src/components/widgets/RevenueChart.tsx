'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Calendar, Filter } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, Legend } from 'recharts';
import { ChartTooltip } from '@/components/ui/chart-tooltip';
import { DateRange } from '@/components/ui/date-filter';
import { cn } from '@/lib/utils';

interface RevenueChartProps {
  dateRange: DateRange | null;
}

interface RevenueData {
  month: string;
  revenue: number;
  lastYear: number;
  profit?: number;
}

export function RevenueChart({ dateRange }: RevenueChartProps) {
  const [data, setData] = useState<RevenueData[]>([]);
  const [selectedMetric, setSelectedMetric] = useState<'all' | 'revenue' | 'lastYear'>('all');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  useEffect(() => {
    // Simular carga de datos según el rango de fechas
    let chartData: RevenueData[] = [];
    
    if (dateRange?.label === 'Este mes') {
      chartData = [
        { month: '1', revenue: 12000, lastYear: 10000, profit: 3200 },
        { month: '5', revenue: 15000, lastYear: 11000, profit: 4100 },
        { month: '10', revenue: 18000, lastYear: 12000, profit: 5200 },
        { month: '15', revenue: 22000, lastYear: 14000, profit: 6800 },
        { month: '20', revenue: 25000, lastYear: 16000, profit: 7500 },
        { month: '25', revenue: 28000, lastYear: 18000, profit: 8400 },
      ];
    } else if (dateRange?.label === 'Últimos 30 días') {
      // Datos diarios para los últimos 30 días
      chartData = Array.from({ length: 6 }, (_, i) => ({
        month: `Día ${(i + 1) * 5}`,
        revenue: 8000 + Math.random() * 4000,
        lastYear: 6000 + Math.random() * 3000,
        profit: 2000 + Math.random() * 1500
      }));
    } else {
      // Datos mensuales por defecto
      chartData = [
        { month: 'Ene', revenue: 65000, lastYear: 55000, profit: 18000 },
        { month: 'Feb', revenue: 72000, lastYear: 58000, profit: 21000 },
        { month: 'Mar', revenue: 78000, lastYear: 61000, profit: 24000 },
        { month: 'Abr', revenue: 85000, lastYear: 65000, profit: 28000 },
        { month: 'May', revenue: 92000, lastYear: 70000, profit: 32000 },
        { month: 'Jun', revenue: 98000, lastYear: 75000, profit: 35000 },
      ];
    }
    
    setData(chartData);
  }, [dateRange]);
  
  const currentTotal = data.reduce((sum, item) => sum + item.revenue, 0);
  const lastYearTotal = data.reduce((sum, item) => sum + item.lastYear, 0);
  const growthPercentage = lastYearTotal > 0 ? ((currentTotal - lastYearTotal) / lastYearTotal * 100).toFixed(1) : '0';

  return (
    <Card className="col-span-2 hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            Ingresos {dateRange ? `(${dateRange.label})` : 'Mensuales'}
            <Calendar className="h-4 w-4 text-gray-400" />
          </CardTitle>
          <CardDescription>Comparación con el período anterior</CardDescription>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setSelectedMetric('all')}
              className={cn(
                "px-3 py-1 rounded text-xs font-medium transition-colors",
                selectedMetric === 'all' 
                  ? "bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-400 shadow-sm" 
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              )}
            >
              Todo
            </button>
            <button
              onClick={() => setSelectedMetric('revenue')}
              className={cn(
                "px-3 py-1 rounded text-xs font-medium transition-colors",
                selectedMetric === 'revenue' 
                  ? "bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-400 shadow-sm" 
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              )}
            >
              Este Año
            </button>
            <button
              onClick={() => setSelectedMetric('lastYear')}
              className={cn(
                "px-3 py-1 rounded text-xs font-medium transition-colors",
                selectedMetric === 'lastYear' 
                  ? "bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-400 shadow-sm" 
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              )}
            >
              Año Anterior
            </button>
          </div>
          <div className="flex items-center space-x-2">
            {Number(growthPercentage) > 0 ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
            <span className={`text-sm font-semibold ${Number(growthPercentage) > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {growthPercentage}%
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
              <XAxis 
                dataKey="month" 
                className="text-xs"
                tick={{ fill: '#666' }}
              />
              <YAxis 
                className="text-xs"
                tick={{ fill: '#666' }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip
                content={<ChartTooltip 
                  labelFormatter={(value) => `Período: ${value}`}
                  showTotal={true}
                />}
              />
              {(selectedMetric === 'all' || selectedMetric === 'lastYear') && (
                <Area
                  type="monotone"
                  dataKey="lastYear"
                  stroke="#e5e7eb"
                  fill="#f3f4f6"
                  strokeWidth={2}
                  name="Año Anterior"
                  opacity={selectedMetric === 'lastYear' ? 1 : 0.6}
                  animationDuration={500}
                />
              )}
              {(selectedMetric === 'all' || selectedMetric === 'revenue') && (
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#8b5cf6"
                  fill="#c084fc"
                  strokeWidth={3}
                  name="Este Año"
                  opacity={selectedMetric === 'revenue' ? 1 : 0.8}
                  animationDuration={500}
                />
              )}
              <Legend 
                verticalAlign="top" 
                height={36}
                iconType="line"
                wrapperStyle={{
                  paddingBottom: '10px',
                  fontSize: '12px'
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-around mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Este período</p>
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              ${(currentTotal / 1000).toFixed(0)}k
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {data.length} {dateRange?.label.includes('día') ? 'datos' : 'meses'}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Período anterior</p>
            <p className="text-2xl font-bold text-gray-500">
              ${(lastYearTotal / 1000).toFixed(0)}k
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Mismo período
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Diferencia</p>
            <p className={cn(
              "text-2xl font-bold",
              Number(growthPercentage) > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
            )}>
              ${((currentTotal - lastYearTotal) / 1000).toFixed(0)}k
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {Number(growthPercentage) > 0 ? '+' : ''}{growthPercentage}%
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}