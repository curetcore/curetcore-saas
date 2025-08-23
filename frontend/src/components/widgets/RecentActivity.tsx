'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, Package, DollarSign, Users, TrendingUp, AlertCircle } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'sale',
    icon: ShoppingCart,
    title: 'Nueva venta realizada',
    description: 'Orden #12345 - $1,250.00',
    time: 'Hace 5 minutos',
    color: 'text-green-600 bg-green-100',
  },
  {
    id: 2,
    type: 'customer',
    icon: Users,
    title: 'Nuevo cliente registrado',
    description: 'María García se unió a la plataforma',
    time: 'Hace 15 minutos',
    color: 'text-blue-600 bg-blue-100',
  },
  {
    id: 3,
    type: 'inventory',
    icon: Package,
    title: 'Stock bajo detectado',
    description: 'Producto: Laptop Dell XPS - 3 unidades restantes',
    time: 'Hace 30 minutos',
    color: 'text-yellow-600 bg-yellow-100',
  },
  {
    id: 4,
    type: 'revenue',
    icon: TrendingUp,
    title: 'Meta diaria alcanzada',
    description: 'Has superado la meta de ventas en un 15%',
    time: 'Hace 1 hora',
    color: 'text-purple-600 bg-purple-100',
  },
  {
    id: 5,
    type: 'alert',
    icon: AlertCircle,
    title: 'Pago pendiente',
    description: 'Factura #8901 vence mañana',
    time: 'Hace 2 horas',
    color: 'text-red-600 bg-red-100',
  },
];

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Actividad Reciente</CardTitle>
        <CardDescription>Últimas actualizaciones de tu negocio</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activity.icon;
            return (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`p-2 rounded-full ${activity.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.title}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {activity.description}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    {activity.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        
        <button className="mt-6 w-full py-2 text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors">
          Ver toda la actividad →
        </button>
      </CardContent>
    </Card>
  );
}