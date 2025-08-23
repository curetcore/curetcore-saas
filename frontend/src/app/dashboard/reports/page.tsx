'use client';

import { useState } from 'react';
import { FileText, Download, Calendar, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { NoReportsEmpty } from '@/components/ui/empty-states';

export default function ReportsPage() {
  const [reports] = useState([]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Reportes
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Genera y descarga reportes de tu negocio
          </p>
        </div>
        
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </button>
          <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            <FileText className="h-4 w-4 mr-2" />
            Generar Reporte
          </button>
        </div>
      </div>

      {reports.length === 0 ? (
        <Card>
          <CardContent className="py-12">
            <NoReportsEmpty />
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Los reportes aparecerán aquí cuando se implementen */}
        </div>
      )}

      {/* Tipos de reportes disponibles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <div className="flex items-center justify-between">
              <FileText className="h-8 w-8 text-purple-600" />
              <span className="text-xs text-gray-500 dark:text-gray-400">Diario</span>
            </div>
            <CardTitle className="text-lg">Reporte de Ventas</CardTitle>
            <CardDescription>
              Resumen detallado de ventas por período
            </CardDescription>
          </CardHeader>
          <CardContent>
            <button className="w-full flex items-center justify-center py-2 text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300">
              <Download className="h-4 w-4 mr-1" />
              Generar
            </button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Calendar className="h-8 w-8 text-blue-600" />
              <span className="text-xs text-gray-500 dark:text-gray-400">Mensual</span>
            </div>
            <CardTitle className="text-lg">Reporte Financiero</CardTitle>
            <CardDescription>
              Estado financiero completo del mes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <button className="w-full flex items-center justify-center py-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
              <Download className="h-4 w-4 mr-1" />
              Generar
            </button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <div className="flex items-center justify-between">
              <FileText className="h-8 w-8 text-green-600" />
              <span className="text-xs text-gray-500 dark:text-gray-400">Personalizado</span>
            </div>
            <CardTitle className="text-lg">Reporte Personalizado</CardTitle>
            <CardDescription>
              Crea un reporte con métricas específicas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <button className="w-full flex items-center justify-center py-2 text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300">
              <Download className="h-4 w-4 mr-1" />
              Configurar
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}