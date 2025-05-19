
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
    'cta.getStartedFree': 'Get Started Free',

    // Hero Section
    'hero.title': 'Property Management',
    'hero.titleHighlight': 'Software',
    'hero.titleEnd': 'That Simplifies Your Life',
    'hero.subtitle': 'The complete solution to manage rental properties, associations, and portfolios of all sizes.',
    'hero.noCreditCard': 'No credit card required. Free 14-day trial.',
    'hero.imageAlt': 'Property Management Dashboard',
    'hero.trustedBy': 'Trusted by thousands of property managers worldwide',

    // Features Section
    'features.title': 'All-in-one Property Management Platform',
    'features.subtitle': 'Everything you need to efficiently manage your properties, all in one place.',
    'features.propertyManagement': 'Property Management',
    'features.propertyManagementDesc': 'Streamline operations with comprehensive tools for managing rentals, maintenance, and leasing.',
    'features.accounting': 'Accounting Software',
    'features.accountingDesc': 'Simplify your financials with powerful accounting tools built specifically for property managers.',
    'features.maintenance': 'Maintenance Management',
    'features.maintenanceDesc': 'Efficiently track work orders, schedule maintenance, and communicate with vendors.',
    'features.residentPortal': 'Resident Portal',
    'features.residentPortalDesc': 'Provide a convenient platform for residents to pay rent, submit maintenance requests, and more.',
    'features.leasing': 'Leasing & Screening',
    'features.leasingDesc': 'Fill vacancies faster with online applications, screening, and lease signing tools.',
    'features.reporting': 'Reporting & Analytics',
    'features.reportingDesc': 'Make data-driven decisions with customizable reports and real-time insights.',
    'features.simplifyTitle': 'Simplify Your Property Management',
    'features.simplifyDesc': 'Our platform helps you save time and reduce stress by automating routine tasks and giving you powerful tools to manage your properties efficiently.',
    'features.benefit1': 'Save up to 20 hours per week on admin tasks',
    'features.benefit2': 'Reduce payment processing time by 70%',
    'features.benefit3': 'Improve tenant satisfaction by 35%',
    'features.benefit4': 'Get real-time insights into property performance',
    'features.dashboardAlt': 'Property Dashboard',
    'features.moreEfficient': 'more efficient',

    // Testimonials Section
    'testimonials.title': 'What Our Customers Say',
    'testimonials.subtitle': 'Join thousands of property managers who trust Raddar to run their business.',
    'testimonials.quote1': 'Raddar has completely transformed how we manage our properties. The time savings alone has been worth the investment.',
    'testimonials.author1': 'Sarah Johnson',
    'testimonials.position1': 'Property Manager, Rockwell Properties',
    'testimonials.quote2': 'The accounting features are incredibly robust. We\'ve been able to eliminate multiple software subscriptions since switching to Raddar.',
    'testimonials.author2': 'Michael Chen',
    'testimonials.position2': 'Director, Urban Housing Solutions',
    'testimonials.quote3': 'Our residents love the online portal for payments and maintenance requests. It\'s been a game-changer for our customer satisfaction.',
    'testimonials.author3': 'Rebecca Williams',
    'testimonials.position3': 'Owner, Sunset Property Management',
    'testimonials.stat1': 'Customers Worldwide',
    'testimonials.stat2': 'Units Managed',
    'testimonials.stat3': 'Customer Satisfaction',
    'testimonials.stat4': 'Average Time Saved',

    // Pricing Section
    'pricing.title': 'Simple, Transparent Pricing',
    'pricing.subtitle': 'Choose the plan that fits your property management needs',
    'pricing.starter': 'Starter',
    'pricing.starterDesc': 'Perfect for small landlords',
    'pricing.starterFeature1': 'Up to 20 units',
    'pricing.starterFeature2': 'Core property management tools',
    'pricing.starterFeature3': 'Online rent collection',
    'pricing.starterFeature4': 'Basic reports',
    'pricing.starterFeature5': 'Email support',
    'pricing.professional': 'Professional',
    'pricing.professionalDesc': 'For growing property management companies',
    'pricing.proFeature1': 'Up to 100 units',
    'pricing.proFeature2': 'All Starter features',
    'pricing.proFeature3': 'Advanced accounting',
    'pricing.proFeature4': 'Owner portal',
    'pricing.proFeature5': 'Maintenance management',
    'pricing.proFeature6': 'Online applications & leases',
    'pricing.proFeature7': 'Priority support',
    'pricing.enterprise': 'Enterprise',
    'pricing.enterpriseDesc': 'For large portfolio managers',
    'pricing.custom': 'Custom',
    'pricing.entFeature1': 'Unlimited units',
    'pricing.entFeature2': 'All Professional features',
    'pricing.entFeature3': 'API access',
    'pricing.entFeature4': 'Custom integrations',
    'pricing.entFeature5': 'Dedicated account manager',
    'pricing.entFeature6': 'Training & onboarding',
    'pricing.entFeature7': '24/7 premium support',
    'pricing.startTrial': 'Start Free Trial',
    'pricing.contactSales': 'Contact Sales',
    'pricing.mostPopular': 'Most Popular',
    'pricing.perMonth': '/month',
    'pricing.notSure': 'Not sure which plan is right for you?',
    'pricing.helpText': 'Our team can help you find the perfect solution for your property management needs.',
    'pricing.scheduleConsult': 'Schedule a Consultation',

    // Footer
    'footer.products': 'Products',
    'footer.solutions': 'Solutions',
    'footer.resources': 'Resources',
    'footer.company': 'Company',
    'footer.residentPortal': 'Resident Portal',
    'footer.multiFamily': 'For Multi-Family',
    'footer.commercial': 'For Commercial',
    'footer.knowledgeBase': 'Knowledge Base',
    'footer.aboutUs': 'About Us',
    'footer.careers': 'Careers',
    'footer.contactUs': 'Contact Us',
    'footer.privacyPolicy': 'Privacy Policy',
    'footer.termsOfService': 'Terms of Service',
    'footer.tagline': 'Property management software that streamlines your business',
    'footer.copyright': 'Raddar. All rights reserved.'
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
    'cta.getStartedFree': 'Comenzar Gratis',

    // Hero Section
    'hero.title': 'Gestión de',
    'hero.titleHighlight': 'Propiedades',
    'hero.titleEnd': 'que Simplifica su Vida',
    'hero.subtitle': 'La solución completa para administrar propiedades de alquiler, asociaciones y carteras de todos los tamaños.',
    'hero.noCreditCard': 'No se requiere tarjeta de crédito. Prueba gratuita de 14 días.',
    'hero.imageAlt': 'Panel de Gestión de Propiedades',
    'hero.trustedBy': 'De confianza para miles de administradores de propiedades en todo el mundo',

    // Features Section
    'features.title': 'Plataforma Todo-en-uno para Gestión de Propiedades',
    'features.subtitle': 'Todo lo que necesita para administrar eficientemente sus propiedades, todo en un solo lugar.',
    'features.propertyManagement': 'Gestión de Propiedades',
    'features.propertyManagementDesc': 'Optimice las operaciones con herramientas completas para gestionar alquileres, mantenimiento y arrendamiento.',
    'features.accounting': 'Software de Contabilidad',
    'features.accountingDesc': 'Simplifique sus finanzas con potentes herramientas contables creadas específicamente para administradores de propiedades.',
    'features.maintenance': 'Gestión de Mantenimiento',
    'features.maintenanceDesc': 'Siga eficientemente las órdenes de trabajo, programe mantenimiento y comuníquese con proveedores.',
    'features.residentPortal': 'Portal para Residentes',
    'features.residentPortalDesc': 'Proporcione una plataforma conveniente para que los residentes paguen el alquiler, envíen solicitudes de mantenimiento y más.',
    'features.leasing': 'Arrendamiento y Evaluación',
    'features.leasingDesc': 'Llene vacantes más rápido con aplicaciones en línea, evaluación y herramientas para firmar contratos.',
    'features.reporting': 'Informes y Análisis',
    'features.reportingDesc': 'Tome decisiones basadas en datos con informes personalizables e información en tiempo real.',
    'features.simplifyTitle': 'Simplifique su Gestión de Propiedades',
    'features.simplifyDesc': 'Nuestra plataforma le ayuda a ahorrar tiempo y reducir el estrés automatizando tareas rutinarias y proporcionándole herramientas poderosas para administrar sus propiedades de manera eficiente.',
    'features.benefit1': 'Ahorre hasta 20 horas por semana en tareas administrativas',
    'features.benefit2': 'Reduzca el tiempo de procesamiento de pagos en un 70%',
    'features.benefit3': 'Mejore la satisfacción del inquilino en un 35%',
    'features.benefit4': 'Obtenga información en tiempo real sobre el rendimiento de la propiedad',
    'features.dashboardAlt': 'Panel de Propiedades',
    'features.moreEfficient': 'más eficiente',

    // Testimonials Section
    'testimonials.title': 'Lo que Dicen Nuestros Clientes',
    'testimonials.subtitle': 'Únase a miles de administradores de propiedades que confían en Raddar para dirigir su negocio.',
    'testimonials.quote1': 'Raddar ha transformado completamente la forma en que administramos nuestras propiedades. El ahorro de tiempo por sí solo ha valido la inversión.',
    'testimonials.author1': 'Sarah Johnson',
    'testimonials.position1': 'Administradora de Propiedades, Rockwell Properties',
    'testimonials.quote2': 'Las funciones contables son increíblemente robustas. Hemos podido eliminar múltiples suscripciones de software desde que cambiamos a Raddar.',
    'testimonials.author2': 'Michael Chen',
    'testimonials.position2': 'Director, Urban Housing Solutions',
    'testimonials.quote3': 'A nuestros residentes les encanta el portal en línea para pagos y solicitudes de mantenimiento. Ha sido un cambio radical para nuestra satisfacción del cliente.',
    'testimonials.author3': 'Rebecca Williams',
    'testimonials.position3': 'Propietaria, Sunset Property Management',
    'testimonials.stat1': 'Clientes a Nivel Mundial',
    'testimonials.stat2': 'Unidades Administradas',
    'testimonials.stat3': 'Satisfacción del Cliente',
    'testimonials.stat4': 'Tiempo Promedio Ahorrado',

    // Pricing Section
    'pricing.title': 'Precios Simples y Transparentes',
    'pricing.subtitle': 'Elija el plan que se adapte a sus necesidades de gestión de propiedades',
    'pricing.starter': 'Inicial',
    'pricing.starterDesc': 'Perfecto para pequeños propietarios',
    'pricing.starterFeature1': 'Hasta 20 unidades',
    'pricing.starterFeature2': 'Herramientas básicas de gestión',
    'pricing.starterFeature3': 'Cobro de alquiler en línea',
    'pricing.starterFeature4': 'Informes básicos',
    'pricing.starterFeature5': 'Soporte por correo electrónico',
    'pricing.professional': 'Profesional',
    'pricing.professionalDesc': 'Para empresas de gestión en crecimiento',
    'pricing.proFeature1': 'Hasta 100 unidades',
    'pricing.proFeature2': 'Todas las funciones del plan Inicial',
    'pricing.proFeature3': 'Contabilidad avanzada',
    'pricing.proFeature4': 'Portal del propietario',
    'pricing.proFeature5': 'Gestión de mantenimiento',
    'pricing.proFeature6': 'Solicitudes y contratos en línea',
    'pricing.proFeature7': 'Soporte prioritario',
    'pricing.enterprise': 'Empresarial',
    'pricing.enterpriseDesc': 'Para gestores de grandes carteras',
    'pricing.custom': 'Personalizado',
    'pricing.entFeature1': 'Unidades ilimitadas',
    'pricing.entFeature2': 'Todas las funciones del plan Profesional',
    'pricing.entFeature3': 'Acceso a API',
    'pricing.entFeature4': 'Integraciones personalizadas',
    'pricing.entFeature5': 'Gerente de cuenta dedicado',
    'pricing.entFeature6': 'Capacitación e incorporación',
    'pricing.entFeature7': 'Soporte premium 24/7',
    'pricing.startTrial': 'Iniciar Prueba Gratuita',
    'pricing.contactSales': 'Contactar a Ventas',
    'pricing.mostPopular': 'Más Popular',
    'pricing.perMonth': '/mes',
    'pricing.notSure': '¿No está seguro de qué plan es adecuado para usted?',
    'pricing.helpText': 'Nuestro equipo puede ayudarle a encontrar la solución perfecta para sus necesidades de gestión de propiedades.',
    'pricing.scheduleConsult': 'Programar una Consulta',

    // Footer
    'footer.products': 'Productos',
    'footer.solutions': 'Soluciones',
    'footer.resources': 'Recursos',
    'footer.company': 'Empresa',
    'footer.residentPortal': 'Portal para Residentes',
    'footer.multiFamily': 'Para Multi-Familiar',
    'footer.commercial': 'Para Comercial',
    'footer.knowledgeBase': 'Base de Conocimiento',
    'footer.aboutUs': 'Sobre Nosotros',
    'footer.careers': 'Carreras',
    'footer.contactUs': 'Contáctenos',
    'footer.privacyPolicy': 'Política de Privacidad',
    'footer.termsOfService': 'Términos de Servicio',
    'footer.tagline': 'Software de gestión de propiedades que optimiza su negocio',
    'footer.copyright': 'Raddar. Todos los derechos reservados.'
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
