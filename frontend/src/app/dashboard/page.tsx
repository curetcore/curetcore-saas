'use client';

import { useState } from 'react';
import { DailySalesWidget } from '@/components/widgets/DailySalesWidget';
import { MonthlyProgressWidget } from '@/components/widgets/MonthlyProgressWidget';
import { TopProductsWidget } from '@/components/widgets/TopProductsWidget';
import { HourlySalesChart } from '@/components/widgets/HourlySalesChart';
import { RevenueChart } from '@/components/widgets/RevenueChart';
import { CustomerSatisfaction } from '@/components/widgets/CustomerSatisfaction';
import { RecentActivity } from '@/components/widgets/RecentActivity';
import { QuickStats } from '@/components/widgets/QuickStats';
import { DateFilter, DateRange } from '@/components/ui/date-filter';
import { Download, RefreshCw } from 'lucide-react';
import { useToast } from '@/components/ui/toast';
import { cn } from '@/lib/utils';
import { exportToCSV, collectDashboardData } from '@/lib/export-utils';

export default function DashboardPage() {
  const [dateRange, setDateRange] = useState<DateRange | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { addToast } = useToast();

  const handleDateChange = (range: DateRange) => {
    setDateRange(range);
    addToast({
      type: 'info',
      title: 'Filtro aplicado',
      description: `Mostrando datos de: ${range.label}`,
    });
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simular actualización de datos
    setTimeout(() => {
      setIsRefreshing(false);
      addToast({
        type: 'success',
        title: 'Datos actualizados',
        description: 'Los widgets han sido actualizados con los últimos datos.',
      });
    }, 2000);
  };

  const handleExport = () => {
    try {
      addToast({
        type: 'info',
        title: 'Exportando dashboard',
        description: 'Tu reporte está siendo generado...',
      });
      
      // Recopilar datos del dashboard
      const dashboardData = collectDashboardData();
      
      // Generar nombre de archivo con fecha y rango
      const date = new Date().toISOString().split('T')[0];
      const rangeLabel = dateRange ? `_${dateRange.label.replace(/ /g, '_')}` : '';
      const filename = `dashboard_curetcore_${date}${rangeLabel}.csv`;
      
      // Exportar a CSV
      exportToCSV(dashboardData, filename);
      
      // Mostrar notificación de éxito
      setTimeout(() => {
        addToast({
          type: 'success',
          title: 'Exportación completada',
          description: `El archivo ${filename} ha sido descargado.`,
        });
      }, 500);
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Error al exportar',
        description: 'No se pudo generar el archivo de exportación.',
      });
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 animate-in">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard Principal
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Resumen completo de tu negocio
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <DateFilter onDateChange={handleDateChange} />
          
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
            title="Actualizar datos"
          >
            <RefreshCw className={cn("h-4 w-4 text-gray-600 dark:text-gray-400", isRefreshing && "animate-spin")} />
          </button>
          
          <button
            onClick={handleExport}
            className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </button>
        </div>
      </div>
      
      {/* Estadísticas rápidas */}
      <QuickStats dateRange={dateRange} />
      
      {/* KPIs principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DailySalesWidget dateRange={dateRange} />
        <MonthlyProgressWidget dateRange={dateRange} />
        <div className="lg:col-span-2">
          <HourlySalesChart dateRange={dateRange} />
        </div>
      </div>
      
      {/* Gráficos y análisis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RevenueChart dateRange={dateRange} />
        <CustomerSatisfaction dateRange={dateRange} />
      </div>
      
      {/* Productos y actividad */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <TopProductsWidget dateRange={dateRange} />
        </div>
        <RecentActivity dateRange={dateRange} />
      </div>
    </div>
  );
}