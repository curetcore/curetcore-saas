'use client';

import { ShoppingBag, Users, Package, TrendingUp } from 'lucide-react';

const stats = [
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

export function QuickStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className={`p-3 bg-gradient-to-br ${stat.color} rounded-lg shadow-lg`}>
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