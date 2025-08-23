'use client';

import { HelpCircle, Book, MessageCircle, Mail, Phone } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function HelpPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Ayuda y Soporte
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          ¿Necesitas ayuda? Estamos aquí para asistirte
        </p>
      </div>

      {/* Opciones de ayuda */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Book className="h-8 w-8 text-purple-600" />
            </div>
            <CardTitle>Documentación</CardTitle>
            <CardDescription>
              Guías detalladas y tutoriales para usar la plataforma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <button className="w-full py-2 text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300">
              Ver documentación →
            </button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <MessageCircle className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle>Chat en Vivo</CardTitle>
            <CardDescription>
              Habla con nuestro equipo de soporte en tiempo real
            </CardDescription>
          </CardHeader>
          <CardContent>
            <button className="w-full py-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
              Iniciar chat →
            </button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Mail className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle>Soporte por Email</CardTitle>
            <CardDescription>
              Envíanos un email y te responderemos pronto
            </CardDescription>
          </CardHeader>
          <CardContent>
            <button className="w-full py-2 text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300">
              Enviar email →
            </button>
          </CardContent>
        </Card>
      </div>

      {/* Preguntas frecuentes */}
      <Card>
        <CardHeader>
          <CardTitle>Preguntas Frecuentes</CardTitle>
          <CardDescription>
            Respuestas a las preguntas más comunes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              ¿Cómo puedo cambiar mi contraseña?
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Ve a Configuración → Cuenta → Seguridad y selecciona "Cambiar contraseña".
            </p>
          </div>
          
          <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              ¿Cómo exporto mis datos?
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              En la sección de Reportes, selecciona el tipo de reporte y haz clic en "Exportar".
            </p>
          </div>
          
          <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              ¿Cuándo se actualizan los datos?
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Los datos se sincronizan automáticamente cada 5 minutos con Airbyte.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Información de contacto */}
      <Card>
        <CardHeader>
          <CardTitle>Contacto Directo</CardTitle>
          <CardDescription>
            Otras formas de contactarnos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-3">
            <Phone className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              +1 (555) 123-4567
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <Mail className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              soporte@curetcore.com
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}