
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

const Hero = () => {
  const { translations } = useLanguage();
  
  return (
    <section className="relative bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col space-y-6 animate-fade-in">
            <h1 className="font-bold text-buildium-navy leading-tight">
              {translations['hero.title'] || 'Property Management'} <span className="text-buildium-blue">{translations['hero.titleHighlight'] || 'Software'}</span> {translations['hero.titleEnd'] || 'That Simplifies Your Life'}
            </h1>
            <p className="text-lg md:text-xl text-buildium-darkGray">
              {translations['hero.subtitle'] || 'The complete solution to manage rental properties, associations, and portfolios of all sizes.'}
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="lg" className="bg-buildium-blue hover:bg-blue-700 text-white" asChild>
                <Link to="/signup">
                  {translations['cta.getStartedFree'] || 'Get Started Free'}
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-buildium-blue text-buildium-blue hover:bg-blue-50" asChild>
                <Link to="/signup">
                  {translations['cta.demo'] || 'Schedule a Demo'}
                </Link>
              </Button>
            </div>
            <p className="text-sm text-gray-500">
              {translations['hero.noCreditCard'] || 'No credit card required. Free 14-day trial.'}
            </p>
          </div>
          
          <div className="relative lg:ml-auto max-w-lg lg:max-w-xl animate-fade-in">
            <div className="rounded-xl shadow-2xl overflow-hidden bg-white border border-gray-100">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&h=500"
                alt={translations['hero.imageAlt'] || 'Property Management Dashboard'}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-buildium-purple/10 to-buildium-blue/5 rounded-xl"></div>
            </div>
            <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-gradient-to-r from-buildium-purple to-buildium-blue rounded-full blur-2xl opacity-20"></div>
            <div className="absolute -left-8 -top-8 w-48 h-48 bg-buildium-blue rounded-full blur-3xl opacity-10"></div>
          </div>
        </div>
      </div>
      
      {/* Trusted by brands */}
      <div className="container mx-auto px-4 py-8 pb-16">
        <p className="text-center text-sm font-medium text-gray-500 uppercase tracking-wider mb-6">
          {translations['hero.trustedBy'] || 'Trusted by thousands of property managers worldwide'}
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {['Remax', 'Century 21', 'Keller Williams', 'Coldwell Banker', 'Sotheby\'s'].map((brand) => (
            <div key={brand} className="text-gray-400 font-semibold text-xl">
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
