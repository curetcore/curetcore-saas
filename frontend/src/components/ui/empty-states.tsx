'use client';

import { Package, Users, ShoppingCart, BarChart3, FileText, Search, Database } from 'lucide-react';

interface EmptyStateProps {
  icon?: React.ElementType;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon: Icon = Package, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-full">
        <Icon className="h-12 w-12 text-gray-400 dark:text-gray-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mb-6">
        {description}
      </p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

// Empty states predefinidos
export function NoDataEmpty() {
  return (
    <EmptyState
      icon={Database}
      title="No hay datos disponibles"
      description="Aún no hay información para mostrar. Los datos aparecerán aquí cuando estén disponibles."
    />
  );
}

export function NoProductsEmpty({ onAdd }: { onAdd?: () => void }) {
  return (
    <EmptyState
      icon={Package}
      title="No hay productos"
      description="Comienza agregando tu primer producto al inventario."
      action={onAdd ? { label: "Agregar producto", onClick: onAdd } : undefined}
    />
  );
}

export function NoCustomersEmpty() {
  return (
    <EmptyState
      icon={Users}
      title="No hay clientes"
      description="Los clientes aparecerán aquí cuando realicen su primera compra."
    />
  );
}

export function NoOrdersEmpty() {
  return (
    <EmptyState
      icon={ShoppingCart}
      title="No hay órdenes"
      description="Las órdenes de tus clientes aparecerán aquí."
    />
  );
}

export function NoResultsEmpty({ onClear }: { onClear?: () => void }) {
  return (
    <EmptyState
      icon={Search}
      title="No se encontraron resultados"
      description="Intenta ajustar los filtros o términos de búsqueda."
      action={onClear ? { label: "Limpiar filtros", onClick: onClear } : undefined}
    />
  );
}

export function NoReportsEmpty() {
  return (
    <EmptyState
      icon={FileText}
      title="No hay reportes"
      description="Genera tu primer reporte para ver el análisis de tu negocio."
      action={{ label: "Generar reporte", onClick: () => {} }}
    />
  );
}

export function NoChartDataEmpty() {
  return (
    <EmptyState
      icon={BarChart3}
      title="Sin datos para graficar"
      description="No hay suficientes datos para mostrar el gráfico."
    />
  );
}