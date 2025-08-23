'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const data = [
  { month: 'Ene', revenue: 65000, lastYear: 55000 },
  { month: 'Feb', revenue: 72000, lastYear: 58000 },
  { month: 'Mar', revenue: 78000, lastYear: 61000 },
  { month: 'Abr', revenue: 85000, lastYear: 65000 },
  { month: 'May', revenue: 92000, lastYear: 70000 },
  { month: 'Jun', revenue: 98000, lastYear: 75000 },
];

export function RevenueChart() {
  const currentTotal = data.reduce((sum, item) => sum + item.revenue, 0);
  const lastYearTotal = data.reduce((sum, item) => sum + item.lastYear, 0);
  const growthPercentage = ((currentTotal - lastYearTotal) / lastYearTotal * 100).toFixed(1);

  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Ingresos Mensuales</CardTitle>
          <CardDescription>Comparación con el año anterior</CardDescription>
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
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                }}
                labelStyle={{ color: '#111827', fontWeight: 600 }}
                formatter={(value: any) => [`$${value.toLocaleString()}`, '']}
              />
              <Area
                type="monotone"
                dataKey="lastYear"
                stroke="#e5e7eb"
                fill="#f3f4f6"
                strokeWidth={2}
                name="Año Anterior"
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#8b5cf6"
                fill="#c084fc"
                strokeWidth={3}
                name="Este Año"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-around mt-6 pt-6 border-t">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Este año</p>
            <p className="text-2xl font-bold text-purple-600">${(currentTotal / 1000).toFixed(0)}k</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Año anterior</p>
            <p className="text-2xl font-bold text-gray-500">${(lastYearTotal / 1000).toFixed(0)}k</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}