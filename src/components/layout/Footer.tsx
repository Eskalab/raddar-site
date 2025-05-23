
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { translations } = useLanguage();
  
  const getFooterLinks = () => [
    {
      title: translations['footer.products'] || "Products",
      links: [
        { name: translations['products.propertyManagement'] || "Property Management", href: "#" },
        { name: translations['products.accounting'] || "Accounting", href: "#" },
        { name: translations['products.maintenance'] || "Maintenance", href: "#" },
        { name: translations['products.leasing'] || "Leasing", href: "#" },
        { name: translations['footer.residentPortal'] || "Resident Portal", href: "#" },
      ],
    },
    {
      title: translations['footer.solutions'] || "Solutions",
      links: [
        { name: translations['solutions.propertyManagers'] || "For Property Managers", href: "#" },
        { name: translations['solutions.landlords'] || "For Landlords", href: "#" },
        { name: translations['solutions.hoas'] || "For HOAs", href: "#" },
        { name: translations['footer.multiFamily'] || "For Multi-Family", href: "#" },
        { name: translations['footer.commercial'] || "For Commercial", href: "#" },
      ],
    },
    {
      title: translations['footer.resources'] || "Resources",
      links: [
        { name: translations['resources.blog'] || "Blog", href: "#" },
        { name: translations['resources.guides'] || "Guides", href: "#" },
        { name: translations['resources.webinars'] || "Webinars", href: "#" },
        { name: translations['resources.caseStudies'] || "Case Studies", href: "#" },
        { name: translations['footer.knowledgeBase'] || "Knowledge Base", href: "#" },
      ],
    },
    {
      title: translations['footer.company'] || "Company",
      links: [
        { name: translations['footer.aboutUs'] || "About Us", href: "#" },
        { name: translations['footer.careers'] || "Careers", href: "#" },
        { name: translations['footer.contactUs'] || "Contact Us", href: "#" },
        { name: translations['footer.privacyPolicy'] || "Privacy Policy", href: "#" },
        { name: translations['footer.termsOfService'] || "Terms of Service", href: "#" },
      ],
    },
  ];

  const footerLinks = getFooterLinks();

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex-shrink-0 mb-6">
              <a href="/" className="flex items-center">
                <span className="text-xl font-bold text-buildium-blue">Raddar</span>
              </a>
            </div>
            <p className="text-gray-600 mb-6">
              {translations['footer.tagline'] || 'Property management software that streamlines your business'}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-buildium-blue">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-buildium-blue">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-buildium-blue">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Footer Links */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold text-gray-800 tracking-wider uppercase mb-4">
                {group.title}
              </h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-gray-600 hover:text-buildium-blue flex items-center"
                    >
                      <ChevronRight className="h-3 w-3 mr-1" />
                      <span>{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} {translations['footer.copyright'] || 'Raddar Clone. All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
