
import React from 'react';
import { Flag } from 'lucide-react';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-1.5">
          <Flag className="h-4 w-4" />
          <span className="text-xs font-medium uppercase">{language}</span>
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleLanguageChange('en')} className={language === 'en' ? 'bg-muted' : ''}>
          <Flag className="mr-2 h-4 w-4" />
          <span className="flex items-center gap-1.5">
            <span className="uppercase font-semibold">EN</span>
            <span>English</span>
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange('es')} className={language === 'es' ? 'bg-muted' : ''}>
          <Flag className="mr-2 h-4 w-4" />
          <span className="flex items-center gap-1.5">
            <span className="uppercase font-semibold">ES</span>
            <span>Español</span>
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
