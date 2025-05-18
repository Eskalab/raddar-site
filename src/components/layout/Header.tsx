
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from '@/lib/utils';

// Navigation menu items
const navItems = [
  { 
    name: 'Products',
    href: '#',
    dropdownItems: [
      { name: 'Property Management', href: '#' },
      { name: 'Accounting', href: '#' },
      { name: 'Maintenance', href: '#' },
      { name: 'Leasing', href: '#' }
    ]
  },
  { 
    name: 'Solutions',
    href: '#',
    dropdownItems: [
      { name: 'For Property Managers', href: '#' },
      { name: 'For Landlords', href: '#' },
      { name: 'For HOAs', href: '#' }
    ]
  },
  { name: 'Pricing', href: '#' },
  { 
    name: 'Resources', 
    href: '#',
    dropdownItems: [
      { name: 'Blog', href: '#' },
      { name: 'Guides', href: '#' },
      { name: 'Webinars', href: '#' },
      { name: 'Case Studies', href: '#' }
    ]
  },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex-shrink-0">
          <a href="/" className="flex items-center">
            <span className="text-xl font-bold text-buildium-blue">Buildium</span>
          </a>
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

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center space-x-2">
          <a href="#" className="text-sm font-medium text-buildium-blue hover:underline">
            Log In
          </a>
          <Button className="bg-buildium-blue hover:bg-blue-700">
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
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
            <div className="pt-4 flex flex-col space-y-3">
              <a
                href="#"
                className="px-3 py-2 text-base font-medium text-center text-buildium-blue hover:underline"
              >
                Log In
              </a>
              <Button className="bg-buildium-blue hover:bg-blue-700 w-full">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
