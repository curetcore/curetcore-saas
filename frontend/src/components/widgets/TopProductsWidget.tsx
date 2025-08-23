'use client';

import { useEffect, useState } from 'react';
import { Package } from 'lucide-react';
import { TableSkeleton } from '@/components/ui/loading-states';
import { NoProductsEmpty } from '@/components/ui/empty-states';
import { DateRange } from '@/components/ui/date-filter';

interface Product {
  id: string;
  name: string;
  sales: number;
  revenue: number;
}

interface TopProductsWidgetProps {
  dateRange: DateRange | null;
}

export function TopProductsWidget({ dateRange }: TopProductsWidgetProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // TODO: Implementar llamada a API real con dateRange
    // Simulación de datos según el rango
    setTimeout(() => {
      let productsData: Product[] = [];
      
      if (dateRange?.label === 'Hoy') {
        productsData = [
          { id: '1', name: 'Producto Premium A', sales: 12, revenue: 1200 },
          { id: '2', name: 'Kit Completo C', sales: 8, revenue: 700 },
          { id: '3', name: 'Servicio Estándar B', sales: 7, revenue: 590 },
          { id: '4', name: 'Accesorio D', sales: 5, revenue: 250 },
          { id: '5', name: 'Plan Diário F', sales: 3, revenue: 90 }
        ];
      } else if (dateRange?.label === 'Últimos 30 días') {
        productsData = [
          { id: '1', name: 'Producto Premium A', sales: 156, revenue: 15600 },
          { id: '2', name: 'Servicio Estándar B', sales: 142, revenue: 11970 },
          { id: '3', name: 'Kit Completo C', sales: 128, revenue: 11200 },
          { id: '4', name: 'Plan Mensual E', sales: 98, revenue: 9800 },
          { id: '5', name: 'Accesorio D', sales: 87, revenue: 4350 }
        ];
      } else {
        // Datos por defecto
        productsData = [
          { id: '1', name: 'Producto Premium A', sales: 45, revenue: 4500 },
          { id: '2', name: 'Servicio Estándar B', sales: 38, revenue: 3200 },
          { id: '3', name: 'Kit Completo C', sales: 32, revenue: 2800 },
          { id: '4', name: 'Accesorio D', sales: 28, revenue: 1400 },
          { id: '5', name: 'Plan Mensual E', sales: 24, revenue: 2400 }
        ];
      }
      
      setProducts(productsData);
      setLoading(false);
    }, 800);
  }, [dateRange]);

  if (loading) {
    return <TableSkeleton rows={5} />;
  }

  if (products.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <NoProductsEmpty onAdd={() => console.log('Add product')} />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center mb-6">
        <Package className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Top 5 Productos {dateRange ? `(${dateRange.label})` : ''}
        </h3>
      </div>
      
      <div className="space-y-4">
        {products.map((product, index) => (
          <div key={product.id} className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-6">
                {index + 1}.
              </span>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {product.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {product.sales} ventas
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                ${product.revenue.toLocaleString('es-ES')}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}