
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Home, 
  FileText, 
  Users, 
  Calendar, 
  MessageSquare,
  Wallet,
  Settings 
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

const DashboardSidebar = ({ className = "" }: SidebarProps) => {
  const { language } = useLanguage();
  const { signOut, profile } = useAuth();
  const location = useLocation();
  
  const isRenter = profile?.role === 'renter';

  // Different sidebar items based on user role
  const tenantSidebarItems = [
    {
      name: language === 'en' ? 'Dashboard' : 'Tablero',
      href: '/dashboard',
      icon: <LayoutDashboard className="mr-3 h-5 w-5" />,
    },
    {
      name: language === 'en' ? 'Properties' : 'Propiedades',
      href: '/dashboard/properties',
      icon: <Home className="mr-3 h-5 w-5" />,
    },
    {
      name: language === 'en' ? 'Leasing' : 'Arrendamiento',
      href: '/dashboard/leasing',
      icon: <FileText className="mr-3 h-5 w-5" />,
    },
    {
      name: language === 'en' ? 'Accounting' : 'Contabilidad',
      href: '/dashboard/accounting',
      icon: <Wallet className="mr-3 h-5 w-5" />,
    },
    {
      name: language === 'en' ? 'Maintenance' : 'Mantenimiento',
      href: '/dashboard/maintenance',
      icon: <Users className="mr-3 h-5 w-5" />,
    },
    {
      name: language === 'en' ? 'Tasks' : 'Tareas',
      href: '/dashboard/tasks',
      icon: <Calendar className="mr-3 h-5 w-5" />,
    },
  ];

  const renterSidebarItems = [
    {
      name: language === 'en' ? 'Dashboard' : 'Tablero',
      href: '/dashboard',
      icon: <LayoutDashboard className="mr-3 h-5 w-5" />,
    },
    {
      name: language === 'en' ? 'Payments' : 'Pagos',
      href: '/dashboard/payments',
      icon: <Wallet className="mr-3 h-5 w-5" />,
    },
    {
      name: language === 'en' ? 'Maintenance' : 'Mantenimiento',
      href: '/dashboard/maintenance',
      icon: <Users className="mr-3 h-5 w-5" />,
    },
    {
      name: language === 'en' ? 'Documents' : 'Documentos',
      href: '/dashboard/documents',
      icon: <FileText className="mr-3 h-5 w-5" />,
    },
    {
      name: language === 'en' ? 'Messages' : 'Mensajes',
      href: '/dashboard/messages',
      icon: <MessageSquare className="mr-3 h-5 w-5" />,
    },
    {
      name: language === 'en' ? 'Settings' : 'Ajustes',
      href: '/dashboard/settings',
      icon: <Settings className="mr-3 h-5 w-5" />,
    },
  ];

  const sidebarItems = isRenter ? renterSidebarItems : tenantSidebarItems;

  // Check if current route is active or is a child of the current route
  const isActiveRoute = (href: string) => {
    if (href === '/dashboard' && location.pathname === '/dashboard') {
      return true;
    }
    return location.pathname.startsWith(href) && href !== '/dashboard';
  };

  return (
    <div className={`w-64 bg-buildium-navy text-white flex flex-col h-screen ${className}`}>
      <div className="p-4 border-b border-slate-700">
        <Link to="/" className="text-xl font-bold text-white">Raddar</Link>
      </div>
      
      <nav className="flex-grow py-4">
        <ul className="space-y-1">
          {sidebarItems.map((item) => (
            <li key={item.name}>
              <Link 
                to={item.href} 
                className={`flex items-center px-4 py-2 ${
                  isActiveRoute(item.href) 
                    ? 'bg-buildium-navy-light text-white' 
                    : 'hover:bg-buildium-navy/90 text-white'
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 mt-auto">
        <p className="text-sm text-gray-400 mb-2">
          {isRenter 
            ? (language === 'en' ? 'Logged in as Renter' : 'Conectado como Inquilino')
            : (language === 'en' ? 'Logged in as Tenant' : 'Conectado como Propietario')
          }
        </p>
        <Button 
          variant="outline" 
          className="w-full text-white border-white hover:bg-white hover:text-buildium-navy"
          onClick={() => signOut()}
        >
          {language === 'en' ? 'Sign Out' : 'Cerrar Sesión'}
        </Button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
