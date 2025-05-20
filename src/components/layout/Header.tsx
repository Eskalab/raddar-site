
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, X, LogIn, UserPlus } from "lucide-react";
import { cn } from '@/lib/utils';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link, useLocation } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

// Navigation menu items
const getNavItems = (translations: Record<string, string>) => [
  { 
    name: translations['nav.products'],
    href: '#',
    dropdownItems: [
      { name: translations['products.propertyManagement'], href: '#' },
      { name: translations['products.accounting'], href: '#' },
      { name: translations['products.maintenance'], href: '#' },
      { name: translations['products.leasing'], href: '#' }
    ]
  },
  { 
    name: translations['nav.solutions'],
    href: '#',
    dropdownItems: [
      { name: translations['solutions.propertyManagers'], href: '#' },
      { name: translations['solutions.landlords'], href: '#' },
      { name: translations['solutions.hoas'], href: '#' }
    ]
  },
  { name: translations['nav.pricing'], href: '#' },
  { 
    name: translations['nav.resources'], 
    href: '#',
    dropdownItems: [
      { name: translations['resources.blog'], href: '#' },
      { name: translations['resources.guides'], href: '#' },
      { name: translations['resources.webinars'], href: '#' },
      { name: translations['resources.caseStudies'], href: '#' }
    ]
  },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { translations, language } = useLanguage();
  const [user, setUser] = useState<any>(null);
  const location = useLocation();
  
  const navItems = getNavItems(translations);

  useEffect(() => {
    // Check current auth status
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data?.session?.user || null);
    };
    
    checkUser();
    
    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    // The onAuthStateChange listener will update the UI
  };

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  // Don't show login/signup buttons on auth pages
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-buildium-blue">Raddar</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <div key={item.name} className="relative group">
              <button 
                className="flex items-center px-1 py-2 text-sm font-medium text-gray-700 hover:text-buildium-blue"
                onClick={() => toggleDropdown(item.name)}
              >
                {item.name}
                {item.dropdownItems && (
                  <ChevronDown className="ml-1 h-4 w-4" />
                )}
              </button>
              
              {item.dropdownItems && (
                <div 
                  className={cn(
                    "absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible transition-all duration-200",
                    (activeDropdown === item.name) && "opacity-100 visible"
                  )}
                >
                  <div className="py-1">
                    {item.dropdownItems.map((dropdownItem) => (
                      <a
                        key={dropdownItem.name}
                        href={dropdownItem.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {dropdownItem.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* CTA Buttons and Language Switcher */}
        <div className="hidden md:flex items-center space-x-2">
          <LanguageSwitcher />
          
          {!isAuthPage && (
            user ? (
              <Button 
                variant="ghost" 
                onClick={handleSignOut}
                className="text-sm font-medium text-buildium-blue hover:underline"
              >
                {language === 'en' ? 'Sign out' : 'Cerrar sesión'}
              </Button>
            ) : (
              <>
                <Button variant="ghost" className="flex items-center gap-1" asChild>
                  <Link to="/login">
                    <LogIn className="w-4 h-4" />
                    {translations['nav.login']}
                  </Link>
                </Button>
                <Button className="bg-buildium-blue hover:bg-blue-700 flex items-center gap-1" asChild>
                  <Link to="/signup">
                    <UserPlus className="w-4 h-4" />
                    {translations['nav.getStarted']}
                  </Link>
                </Button>
              </>
            )
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <LanguageSwitcher />
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 pt-2 pb-4 space-y-1">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                <button 
                  className="w-full flex items-center justify-between px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                  onClick={() => toggleDropdown(item.name)}
                >
                  {item.name}
                  {item.dropdownItems && (
                    <ChevronDown className="ml-1 h-4 w-4" />
                  )}
                </button>
                
                {item.dropdownItems && activeDropdown === item.name && (
                  <div className="pl-4 space-y-1 mt-1">
                    {item.dropdownItems.map((dropdownItem) => (
                      <a
                        key={dropdownItem.name}
                        href={dropdownItem.href}
                        className="block px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 rounded-md"
                      >
                        {dropdownItem.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {!isAuthPage && (
              <div className="pt-4 flex flex-col space-y-3">
                {user ? (
                  <Button 
                    onClick={handleSignOut}
                    className="px-3 py-2 text-base font-medium text-center text-buildium-blue hover:underline"
                  >
                    {language === 'en' ? 'Sign out' : 'Cerrar sesión'}
                  </Button>
                ) : (
                  <>
                    <Button variant="ghost" className="flex items-center justify-center gap-2" asChild>
                      <Link to="/login">
                        <LogIn className="w-4 h-4" />
                        {translations['nav.login']}
                      </Link>
                    </Button>
                    <Button className="bg-buildium-blue hover:bg-blue-700 w-full flex items-center justify-center gap-2" asChild>
                      <Link to="/signup">
                        <UserPlus className="w-4 h-4" />
                        {translations['nav.getStarted']}
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
