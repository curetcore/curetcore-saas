'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  DollarSign, 
  Users, 
  FileText,
  Settings,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/sales', label: 'Ventas', icon: ShoppingCart },
  { href: '/dashboard/inventory', label: 'Inventario', icon: Package },
  { href: '/dashboard/finance', label: 'Finanzas', icon: DollarSign },
  { href: '/dashboard/employees', label: 'Empleados', icon: Users },
  { href: '/dashboard/reports', label: 'Reportes', icon: FileText },
];

export function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <div className="flex flex-col w-64 bg-gray-900 h-screen">
      <div className="flex items-center justify-center h-16 bg-gray-800">
        <h1 className="text-white text-xl font-bold">CuretCore</h1>
      </div>
      
      <nav className="flex-1 px-2 py-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors",
                isActive
                  ? "bg-gray-800 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              )}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-gray-700">
        <Link
          href="/dashboard/settings"
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
        >
          <Settings className="mr-3 h-5 w-5" />
          Configuración
        </Link>
        <button
          onClick={logout}
          className="flex items-center w-full px-4 py-2 mt-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}