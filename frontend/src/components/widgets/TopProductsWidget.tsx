'use client';

import { useEffect, useState } from 'react';
import { Package } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  sales: number;
  revenue: number;
}

export function TopProductsWidget() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Implementar llamada a API real
    // Simulación de datos
    setTimeout(() => {
      setProducts([
        { id: '1', name: 'Producto Premium A', sales: 45, revenue: 4500 },
        { id: '2', name: 'Servicio Estándar B', sales: 38, revenue: 3200 },
        { id: '3', name: 'Kit Completo C', sales: 32, revenue: 2800 },
        { id: '4', name: 'Accesorio D', sales: 28, revenue: 1400 },
        { id: '5', name: 'Plan Mensual E', sales: 24, revenue: 2400 }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 animate-pulse">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center mb-6">
        <Package className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Top 5 Productos
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