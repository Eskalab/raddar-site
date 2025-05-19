
import React from 'react';
import { Calendar, Home, Settings, Users, Check, Search, Key, File } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Features = () => {
  const { translations } = useLanguage();
  
  const featureItems = [
    {
      title: translations['features.propertyManagement'] || 'Property Management',
      description: translations['features.propertyManagementDesc'] || 'Streamline operations with comprehensive tools for managing rentals, maintenance, and leasing.',
      icon: Home,
    },
    {
      title: translations['features.accounting'] || 'Accounting Software',
      description: translations['features.accountingDesc'] || 'Simplify your financials with powerful accounting tools built specifically for property managers.',
      icon: File,
    },
    {
      title: translations['features.maintenance'] || 'Maintenance Management',
      description: translations['features.maintenanceDesc'] || 'Efficiently track work orders, schedule maintenance, and communicate with vendors.',
      icon: Settings,
    },
    {
      title: translations['features.residentPortal'] || 'Resident Portal',
      description: translations['features.residentPortalDesc'] || 'Provide a convenient platform for residents to pay rent, submit maintenance requests, and more.',
      icon: Users,
    },
    {
      title: translations['features.leasing'] || 'Leasing & Screening',
      description: translations['features.leasingDesc'] || 'Fill vacancies faster with online applications, screening, and lease signing tools.',
      icon: Key,
    },
    {
      title: translations['features.reporting'] || 'Reporting & Analytics',
      description: translations['features.reportingDesc'] || 'Make data-driven decisions with customizable reports and real-time insights.',
      icon: Search,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">{translations['features.title'] || 'All-in-one Property Management Platform'}</h2>
          <p className="text-lg text-gray-600">
            {translations['features.subtitle'] || 'Everything you need to efficiently manage your properties, all in one place.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureItems.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="inline-flex items-center justify-center p-3 bg-buildium-blue/10 rounded-lg mb-4">
                <feature.icon className="h-6 w-6 text-buildium-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-buildium-lightGray rounded-xl p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">{translations['features.simplifyTitle'] || 'Simplify Your Property Management'}</h3>
              <p className="text-gray-600 mb-6">
                {translations['features.simplifyDesc'] || 'Our platform helps you save time and reduce stress by automating routine tasks and giving you powerful tools to manage your properties efficiently.'}
              </p>
              
              <ul className="space-y-3">
                {[
                  translations['features.benefit1'] || 'Save up to 20 hours per week on admin tasks',
                  translations['features.benefit2'] || 'Reduce payment processing time by 70%',
                  translations['features.benefit3'] || 'Improve tenant satisfaction by 35%',
                  translations['features.benefit4'] || 'Get real-time insights into property performance'
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-buildium-blue mt-0.5 mr-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&h=600"
                alt={translations['features.dashboardAlt'] || 'Property Dashboard'} 
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -top-4 -right-4 bg-buildium-purple text-white py-2 px-4 rounded-lg shadow-md">
                <span className="font-semibold">35%</span> {translations['features.moreEfficient'] || 'more efficient'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
