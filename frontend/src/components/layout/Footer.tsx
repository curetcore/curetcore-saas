'use client';

import { Github, Twitter, Linkedin } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <img 
                src="/logo-black.png" 
                alt="Curet Logo" 
                className="h-12 w-auto dark:hidden"
              />
              <img 
                src="/logo-white.png" 
                alt="Curet Logo" 
                className="h-12 w-auto hidden dark:block"
              />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Plataforma de inteligencia de negocios que centraliza todos tus datos para tomar decisiones más inteligentes.
            </p>
            <div className="flex items-center space-x-4">
              <Link href="https://github.com" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="https://twitter.com" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="https://linkedin.com" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard" className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/dashboard/reports" className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Reportes
                </Link>
              </li>
              <li>
                <Link href="/dashboard/settings" className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Configuración
                </Link>
              </li>
              <li>
                <Link href="/dashboard/help" className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Ayuda
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Stats */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Volumen del Proyecto</h3>
            <div className="space-y-3">
              <div>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">2.5M+</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Transacciones procesadas</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">15K+</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Usuarios activos</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">99.9%</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Tiempo de actividad</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {currentYear} CuretCore. Todos los derechos reservados.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 md:mt-0">
              Hecho por Ronaldo Paulino
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}