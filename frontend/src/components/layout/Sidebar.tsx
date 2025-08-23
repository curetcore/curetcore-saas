'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  DollarSign, 
  Users, 
  FileText,
  Settings,
  ChevronDown,
  TrendingUp,
  Store,
  BarChart3,
  PieChart,
  Calendar,
  Bell,
  HelpCircle,
  Menu,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { 
    href: '/dashboard', 
    label: 'Dashboard', 
    icon: LayoutDashboard,
    badge: null 
  },
  { 
    href: '/dashboard/sales', 
    label: 'Ventas', 
    icon: ShoppingCart,
    badge: 'nuevo',
    submenu: [
      { href: '/dashboard/sales/orders', label: 'Órdenes', icon: FileText },
      { href: '/dashboard/sales/customers', label: 'Clientes', icon: Users },
      { href: '/dashboard/sales/products', label: 'Productos', icon: Package },
    ]
  },
  { 
    href: '/dashboard/inventory', 
    label: 'Inventario', 
    icon: Package,
    badge: '12' 
  },
  { 
    href: '/dashboard/finance', 
    label: 'Finanzas', 
    icon: DollarSign,
    submenu: [
      { href: '/dashboard/finance/income', label: 'Ingresos', icon: TrendingUp },
      { href: '/dashboard/finance/expenses', label: 'Gastos', icon: BarChart3 },
      { href: '/dashboard/finance/reports', label: 'Reportes', icon: PieChart },
    ]
  },
  { 
    href: '/dashboard/employees', 
    label: 'Empleados', 
    icon: Users,
    badge: null 
  },
  { 
    href: '/dashboard/reports', 
    label: 'Reportes', 
    icon: FileText,
    badge: null 
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSubmenu = (href: string) => {
    setExpandedMenus(prev => 
      prev.includes(href) 
        ? prev.filter(item => item !== href)
        : [...prev, href]
    );
  };

  const isMenuExpanded = (href: string) => expandedMenus.includes(href);

  return (
    <div className={cn(
      "flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 h-screen transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Logo Section */}
      <div className="flex items-center justify-between h-16 px-4 bg-gray-900/50 backdrop-blur-sm border-b border-gray-700/50">
        <Link href="/dashboard" className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl">C</span>
          </div>
          {!isCollapsed && (
            <span className="text-xl font-bold text-white">CuretCore</span>
          )}
        </Link>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 hover:bg-gray-700 rounded-lg transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronLeft className="h-5 w-5 text-gray-400" />
          )}
        </button>
      </div>
      
      
      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          const hasSubmenu = item.submenu && item.submenu.length > 0;
          const isExpanded = isMenuExpanded(item.href);
          
          return (
            <div key={item.href}>
              <div className="relative">
                <Link
                  href={item.href}
                  onClick={(e) => {
                    if (hasSubmenu) {
                      e.preventDefault();
                      toggleSubmenu(item.href);
                    }
                  }}
                  className={cn(
                    "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group",
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
                  )}
                >
                  <Icon className={cn(
                    "h-5 w-5 transition-all",
                    isCollapsed ? "mr-0" : "mr-3"
                  )} />
                  {!isCollapsed && (
                    <>
                      <span className="flex-1">{item.label}</span>
                      {item.badge && (
                        <span className={cn(
                          "px-2 py-0.5 text-xs rounded-full",
                          item.badge === 'nuevo' 
                            ? "bg-green-500 text-white" 
                            : "bg-gray-600 text-gray-200"
                        )}>
                          {item.badge}
                        </span>
                      )}
                      {hasSubmenu && (
                        <ChevronDown className={cn(
                          "h-4 w-4 transition-transform",
                          isExpanded ? "rotate-180" : ""
                        )} />
                      )}
                    </>
                  )}
                </Link>
                
                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </div>
              
              {/* Submenu */}
              {hasSubmenu && isExpanded && !isCollapsed && (
                <div className="mt-1 ml-8 space-y-1">
                  {item.submenu?.map((subItem) => {
                    const SubIcon = subItem.icon;
                    const isSubActive = pathname === subItem.href;
                    
                    return (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className={cn(
                          "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
                          isSubActive
                            ? "bg-gray-700 text-white"
                            : "text-gray-400 hover:bg-gray-700/50 hover:text-white"
                        )}
                      >
                        <SubIcon className="mr-2 h-4 w-4" />
                        {subItem.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
      
      {/* Bottom Section */}
      <div className={cn(
        "mt-auto border-t border-gray-700/50",
        isCollapsed ? "p-2" : "p-4"
      )}>
        <Link
          href="/dashboard/help"
          className={cn(
            "flex items-center mb-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white transition-colors",
            isCollapsed ? "justify-center p-2" : "px-3 py-2"
          )}
        >
          <HelpCircle className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
          {!isCollapsed && "Ayuda y Soporte"}
        </Link>
        <Link
          href="/dashboard/settings"
          className={cn(
            "flex items-center text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white transition-colors",
            isCollapsed ? "justify-center p-2" : "px-3 py-2"
          )}
        >
          <Settings className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
          {!isCollapsed && "Configuración"}
        </Link>
      </div>
    </div>
  );
}