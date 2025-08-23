'use client';

import { useEffect, useState } from 'react';
import { ShoppingBag, Users, Package, TrendingUp } from 'lucide-react';
import { DateRange } from '@/components/ui/date-filter';

interface QuickStatsProps {
  dateRange: DateRange | null;
}

interface StatItem {
  id: number;
  name: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: any;
  color: string;
}

export function QuickStats({ dateRange }: QuickStatsProps) {
  const [stats, setStats] = useState<StatItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setLoading(true);
    // Simular carga de datos según el rango
    setTimeout(() => {
      let statsData: StatItem[] = [];
      
      if (dateRange?.label === 'Hoy') {
        statsData = [
          {
            id: 1,
            name: 'Nuevos Clientes',
            value: '89',
            change: '+23%',
            changeType: 'positive',
            icon: Users,
            color: 'from-blue-500 to-blue-600',
          },
          {
            id: 2,
            name: 'Órdenes Pendientes',
            value: '12',
            change: '-5%',
            changeType: 'negative',
            icon: ShoppingBag,
            color: 'from-purple-500 to-purple-600',
          },
          {
            id: 3,
            name: 'Productos Vendidos',
            value: '342',
            change: '+15%',
            changeType: 'positive',
            icon: Package,
            color: 'from-yellow-500 to-yellow-600',
          },
          {
            id: 4,
            name: 'Tasa Conversión',
            value: '4.2%',
            change: '+0.8%',
            changeType: 'positive',
            icon: TrendingUp,
            color: 'from-green-500 to-green-600',
          },
        ];
      } else if (dateRange?.label === 'Últimos 30 días') {
        statsData = [
          {
            id: 1,
            name: 'Nuevos Clientes',
            value: '3,247',
            change: '+18.2%',
            changeType: 'positive',
            icon: Users,
            color: 'from-blue-500 to-blue-600',
          },
          {
            id: 2,
            name: 'Órdenes Completadas',
            value: '892',
            change: '+22.1%',
            changeType: 'positive',
            icon: ShoppingBag,
            color: 'from-purple-500 to-purple-600',
          },
          {
            id: 3,
            name: 'Productos Activos',
            value: '1,287',
            change: '+3.2%',
            changeType: 'positive',
            icon: Package,
            color: 'from-yellow-500 to-yellow-600',
          },
          {
            id: 4,
            name: 'Tasa Conversión',
            value: '3.48%',
            change: '+0.32%',
            changeType: 'positive',
            icon: TrendingUp,
            color: 'from-green-500 to-green-600',
          },
        ];
      } else {
        // Datos por defecto
        statsData = [
          {
            id: 1,
            name: 'Nuevos Clientes',
            value: '2,651',
            change: '+12.5%',
            changeType: 'positive',
            icon: Users,
            color: 'from-blue-500 to-blue-600',
          },
          {
            id: 2,
            name: 'Órdenes Pendientes',
            value: '45',
            change: '-8.1%',
            changeType: 'negative',
            icon: ShoppingBag,
            color: 'from-purple-500 to-purple-600',
          },
          {
            id: 3,
            name: 'Productos Activos',
            value: '1,287',
            change: '+3.2%',
            changeType: 'positive',
            icon: Package,
            color: 'from-yellow-500 to-yellow-600',
          },
          {
            id: 4,
            name: 'Tasa Conversión',
            value: '3.48%',
            change: '+0.32%',
            changeType: 'positive',
            icon: TrendingUp,
            color: 'from-green-500 to-green-600',
          },
        ];
      }
      
      setStats(statsData);
      setLoading(false);
    }, 600);
  }, [dateRange]);
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 animate-pulse">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              <div className="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
            <div className="mt-4">
              <div className="w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="w-20 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all duration-300 hover:scale-105"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between">
              <div className={`p-3 bg-gradient-to-br ${stat.color} rounded-lg shadow-lg transform transition-transform hover:rotate-3`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              <span
                className={`text-sm font-medium ${
                  stat.changeType === 'positive'
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}
              >
                {stat.change}
              </span>
            </div>
            
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {stat.name}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {stat.value}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}