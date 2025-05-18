
import React from 'react';
import { FlagTriangleLeft, FlagTriangleRight } from 'lucide-react';
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
        <Button variant="ghost" size="icon" className="w-9 px-0">
          {language === 'en' ? (
            <FlagTriangleLeft className="h-5 w-5" />
          ) : (
            <FlagTriangleRight className="h-5 w-5" />
          )}
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleLanguageChange('en')} className={language === 'en' ? 'bg-muted' : ''}>
          <FlagTriangleLeft className="mr-2 h-4 w-4" />
          <span>English</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange('es')} className={language === 'es' ? 'bg-muted' : ''}>
          <FlagTriangleRight className="mr-2 h-4 w-4" />
          <span>Español</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
