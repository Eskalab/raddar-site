
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define available languages
export type Language = 'en' | 'es';

// Define the context type
type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  translations: Record<string, string>;
};

// Create the context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations
const translationsData: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.products': 'Products',
    'nav.solutions': 'Solutions',
    'nav.pricing': 'Pricing',
    'nav.resources': 'Resources',
    'nav.login': 'Log In',
    'nav.getStarted': 'Get Started',
    
    // Product dropdown
    'products.propertyManagement': 'Property Management',
    'products.accounting': 'Accounting',
    'products.maintenance': 'Maintenance',
    'products.leasing': 'Leasing',
    
    // Solutions dropdown
    'solutions.propertyManagers': 'For Property Managers',
    'solutions.landlords': 'For Landlords',
    'solutions.hoas': 'For HOAs',
    
    // Resources dropdown
    'resources.blog': 'Blog',
    'resources.guides': 'Guides',
    'resources.webinars': 'Webinars',
    'resources.caseStudies': 'Case Studies',
    
    // CTA Section
    'cta.title': 'Ready to simplify your property management?',
    'cta.subtitle': 'Join thousands of property managers who are growing their business with Raddar',
    'cta.trial': 'Start Your Free Trial',
    'cta.demo': 'Schedule a Demo',
  },
  es: {
    // Navigation
    'nav.products': 'Productos',
    'nav.solutions': 'Soluciones',
    'nav.pricing': 'Precios',
    'nav.resources': 'Recursos',
    'nav.login': 'Iniciar Sesión',
    'nav.getStarted': 'Comenzar',
    
    // Product dropdown
    'products.propertyManagement': 'Gestión de Propiedades',
    'products.accounting': 'Contabilidad',
    'products.maintenance': 'Mantenimiento',
    'products.leasing': 'Arrendamiento',
    
    // Solutions dropdown
    'solutions.propertyManagers': 'Para Administradores',
    'solutions.landlords': 'Para Propietarios',
    'solutions.hoas': 'Para Comunidades',
    
    // Resources dropdown
    'resources.blog': 'Blog',
    'resources.guides': 'Guías',
    'resources.webinars': 'Webinars',
    'resources.caseStudies': 'Casos de Estudio',
    
    // CTA Section
    'cta.title': '¿Listo para simplificar la gestión de propiedades?',
    'cta.subtitle': 'Únase a miles de administradores que hacen crecer su negocio con Raddar',
    'cta.trial': 'Comience su Prueba Gratuita',
    'cta.demo': 'Agende una Demostración',
  }
};

// Create the provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Get browser language and default to English if not Spanish
  const getBrowserLanguage = (): Language => {
    const browserLang = navigator.language.split('-')[0];
    return browserLang === 'es' ? 'es' : 'en';
  };

  const [language, setLanguage] = useState<Language>('en'); // Default to English
  const [translations, setTranslations] = useState(translationsData.en);

  useEffect(() => {
    // Set initial language based on browser preference
    const defaultLanguage = getBrowserLanguage();
    setLanguage(defaultLanguage);
    setTranslations(translationsData[defaultLanguage]);
  }, []);

  // Update translations when language changes
  useEffect(() => {
    setTranslations(translationsData[language]);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Translation helper function
export const t = (key: string, context?: LanguageContextType) => {
  if (context) {
    return context.translations[key] || key;
  }
  
  // Fallback when context is not provided (rare case)
  const fallbackContext = useLanguage();
  return fallbackContext.translations[key] || key;
};
