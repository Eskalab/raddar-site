
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Home, 
  FileText, 
  Users, 
  Calendar, 
  Clock,
  PieChart,
  Settings 
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

const DashboardSidebar = ({ className = "" }: SidebarProps) => {
  const { language } = useLanguage();
  const { signOut } = useAuth();

  const sidebarItems = [
    {
      name: language === 'en' ? 'Dashboard' : 'Tablero',
      href: '/dashboard',
      icon: <LayoutDashboard className="mr-3 h-5 w-5" />,
    },
    {
      name: language === 'en' ? 'Rentals' : 'Alquileres',
      href: '/dashboard/rentals',
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
      icon: <PieChart className="mr-3 h-5 w-5" />,
    },
    {
      name: language === 'en' ? 'Maintenance' : 'Mantenimiento',
      href: '/dashboard/maintenance',
      icon: <Users className="mr-3 h-5 w-5" />,
    },
    {
      name: language === 'en' ? 'Tasks' : 'Tareas',
      href: '/dashboard/tasks',
      icon: <Clock className="mr-3 h-5 w-5" />,
    },
  ];

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
                className="flex items-center px-4 py-2 hover:bg-buildium-navy/90 text-white"
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 mt-auto">
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
