'use client';

import { DailySalesWidget } from '@/components/widgets/DailySalesWidget';
import { MonthlyProgressWidget } from '@/components/widgets/MonthlyProgressWidget';
import { TopProductsWidget } from '@/components/widgets/TopProductsWidget';
import { HourlySalesChart } from '@/components/widgets/HourlySalesChart';

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-800 dark:text-white mb-8">
        Dashboard Principal
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DailySalesWidget />
        <MonthlyProgressWidget />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopProductsWidget />
        <HourlySalesChart />
      </div>
    </div>
  );
}