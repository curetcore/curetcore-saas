'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, Package, DollarSign, Users, TrendingUp, AlertCircle } from 'lucide-react';
import { DateRange } from '@/components/ui/date-filter';

interface RecentActivityProps {
  dateRange: DateRange | null;
}

interface Activity {
  id: number;
  type: string;
  icon: any;
  title: string;
  description: string;
  time: string;
  color: string;
}

export function RecentActivity({ dateRange }: RecentActivityProps) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setLoading(true);
    // Simular carga de datos según el rango
    setTimeout(() => {
      let activityData: Activity[] = [];
      
      if (dateRange?.label === 'Hoy') {
        activityData = [
          {
            id: 1,
            type: 'sale',
            icon: ShoppingCart,
            title: 'Nueva venta realizada',
            description: 'Orden #12890 - $890.00',
            time: 'Hace 10 minutos',
            color: 'text-green-600 bg-green-100',
          },
          {
            id: 2,
            type: 'customer',
            icon: Users,
            title: 'Nuevo cliente registrado',
            description: 'Pedro Martínez se unió a la plataforma',
            time: 'Hace 25 minutos',
            color: 'text-blue-600 bg-blue-100',
          },
          {
            id: 3,
            type: 'sale',
            icon: ShoppingCart,
            title: 'Venta completada',
            description: 'Orden #12889 - $456.50',
            time: 'Hace 45 minutos',
            color: 'text-green-600 bg-green-100',
          },
        ];
      } else if (dateRange?.label === 'Últimos 30 días') {
        activityData = [
          {
            id: 1,
            type: 'revenue',
            icon: TrendingUp,
            title: 'Nuevo récord de ventas mensual',
            description: 'Has alcanzado $287,543 en ventas este mes',
            time: 'Hace 1 día',
            color: 'text-purple-600 bg-purple-100',
          },
          {
            id: 2,
            type: 'inventory',
            icon: Package,
            title: 'Reabastecimiento completado',
            description: '500 productos añadidos al inventario',
            time: 'Hace 2 días',
            color: 'text-yellow-600 bg-yellow-100',
          },
          {
            id: 3,
            type: 'customer',
            icon: Users,
            title: 'Hito de clientes alcanzado',
            description: 'Tienes más de 3,000 clientes activos',
            time: 'Hace 3 días',
            color: 'text-blue-600 bg-blue-100',
          },
          {
            id: 4,
            type: 'alert',
            icon: AlertCircle,
            title: 'Actualización del sistema completada',
            description: 'Todas las funciones están operativas',
            time: 'Hace 5 días',
            color: 'text-red-600 bg-red-100',
          },
        ];
      } else {
        // Datos por defecto
        activityData = [
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
      }
      
      setActivities(activityData);
      setLoading(false);
    }, 600);
  }, [dateRange]);
  
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse"></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Actividad Reciente {dateRange ? `(${dateRange.label})` : ''}</CardTitle>
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