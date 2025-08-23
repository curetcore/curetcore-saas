'use client';

import { DailySalesWidget } from '@/components/widgets/DailySalesWidget';
import { MonthlyProgressWidget } from '@/components/widgets/MonthlyProgressWidget';
import { TopProductsWidget } from '@/components/widgets/TopProductsWidget';
import { HourlySalesChart } from '@/components/widgets/HourlySalesChart';
import { RevenueChart } from '@/components/widgets/RevenueChart';
import { CustomerSatisfaction } from '@/components/widgets/CustomerSatisfaction';
import { RecentActivity } from '@/components/widgets/RecentActivity';
import { QuickStats } from '@/components/widgets/QuickStats';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard Principal
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Resumen completo de tu negocio
        </p>
      </div>
      
      {/* Estadísticas rápidas */}
      <QuickStats />
      
      {/* KPIs principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DailySalesWidget />
        <MonthlyProgressWidget />
        <div className="lg:col-span-2">
          <HourlySalesChart />
        </div>
      </div>
      
      {/* Gráficos y análisis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RevenueChart />
        <CustomerSatisfaction />
      </div>
      
      {/* Productos y actividad */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <TopProductsWidget />
        </div>
        <RecentActivity />
      </div>
    </div>
  );
}