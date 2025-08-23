interface ExportData {
  headers: string[];
  rows: (string | number)[][];
}

export function exportToCSV(data: ExportData, filename: string) {
  // Crear el contenido CSV
  const csvContent = [
    // Headers
    data.headers.join(','),
    // Rows
    ...data.rows.map(row => 
      row.map(cell => {
        // Escapar comillas y envolver en comillas si contiene comas
        const cellStr = String(cell);
        if (cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n')) {
          return `"${cellStr.replace(/"/g, '""')}"`;
        }
        return cellStr;
      }).join(',')
    )
  ].join('\n');

  // Crear blob y descargar
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  // Crear URL del blob y descargar
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Limpiar la URL del objeto
  URL.revokeObjectURL(link.href);
}

export function collectDashboardData(): ExportData {
  // En un caso real, esto recopilaría datos de todos los widgets
  // Por ahora, retornamos datos de ejemplo
  const today = new Date().toLocaleDateString('es-ES');
  
  return {
    headers: [
      'Métrica',
      'Valor',
      'Cambio (%)',
      'Tendencia',
      'Fecha'
    ],
    rows: [
      ['Ventas del Día', 15750.50, 12.5, 'Subida', today],
      ['Progreso Mensual', 68, 8.2, 'Subida', today],
      ['Satisfacción Cliente', 4.7, 0.3, 'Subida', today],
      ['Productos Vendidos', 127, 15, 'Subida', today],
      ['Ingresos Mensuales', 287543.90, 15.7, 'Subida', today],
      ['Clientes Nuevos', 89, 23, 'Subida', today],
      ['Tasa de Conversión', 3.2, -0.5, 'Bajada', today],
      ['Tiempo Promedio Sesión', 12.5, 2.1, 'Subida', today],
    ]
  };
}