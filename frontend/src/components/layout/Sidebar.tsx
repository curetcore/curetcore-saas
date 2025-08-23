'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText,
  Settings,
  ChevronDown
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface MenuItem {
  href: string;
  label: string;
  icon: any;
  badge: string | null;
  submenu?: MenuItem[];
}

const menuItems: MenuItem[] = [
  { 
    href: '/dashboard', 
    label: 'Dashboard', 
    icon: LayoutDashboard,
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

  const toggleSubmenu = (href: string) => {
    setExpandedMenus(prev => 
      prev.includes(href) 
        ? prev.filter(item => item !== href)
        : [...prev, href]
    );
  };

  const isMenuExpanded = (href: string) => expandedMenus.includes(href);

  return (
    <div className="relative flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 h-screen transition-all duration-300 w-64">
      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
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
                  <Icon className="h-5 w-5 transition-all mr-3" />
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
                </Link>
              </div>
              
              {/* Submenu */}
              {hasSubmenu && isExpanded && (
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
      
      {/* Bottom Section - Configuración */}
      <div className="mt-auto border-t border-gray-700/50 mb-2 px-3 py-3">
        <Link
          href="/dashboard/settings"
          className="flex items-center text-sm font-medium text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-colors group px-3 py-2.5"
        >
          <Settings className="h-5 w-5 transition-transform group-hover:rotate-45 mr-3" />
          <span>Configuración</span>
        </Link>
      </div>
    </div>
  );
}