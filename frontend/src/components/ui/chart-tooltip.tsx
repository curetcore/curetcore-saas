'use client';

import { TooltipProps } from 'recharts';

interface ChartTooltipProps extends TooltipProps<number, string> {
  labelFormatter?: (value: string) => string;
  valueFormatter?: (value: number) => string;
  showTotal?: boolean;
}

export function ChartTooltip({ 
  active, 
  payload, 
  label,
  labelFormatter = (value) => value,
  valueFormatter = (value) => `$${value.toLocaleString('es-ES')}`,
  showTotal = false
}: ChartTooltipProps) {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const total = showTotal ? payload.reduce((sum, entry) => sum + (entry.value || 0), 0) : 0;

  return (
    <div className="bg-gray-900 dark:bg-gray-800 text-white p-3 rounded-lg shadow-xl border border-gray-700">
      <p className="text-sm font-medium mb-2 text-gray-300">
        {labelFormatter(label || '')}
      </p>
      
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center space-x-2 mb-1">
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-gray-300">{entry.name}:</span>
          <span className="text-sm font-semibold">
            {valueFormatter(entry.value as number)}
          </span>
        </div>
      ))}
      
      {showTotal && payload.length > 1 && (
        <div className="border-t border-gray-700 mt-2 pt-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-300">Total:</span>
            <span className="text-sm font-bold">
              {valueFormatter(total)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}