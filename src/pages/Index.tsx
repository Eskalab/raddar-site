
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import Testimonials from '@/components/home/Testimonials';
import Pricing from '@/components/home/Pricing';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

const Index = () => {
  const { translations } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <Hero />
        <Features />
        <Testimonials />
        <Pricing />
        
        {/* CTA Section - Updated colors for better visibility */}
        <section className="py-16 md:py-20 bg-buildium-blue text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">{translations['cta.title']}</h2>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-white">
              {translations['cta.subtitle']}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-buildium-purple text-white hover:bg-buildium-purple/90" asChild>
                <Link to="/signup">{translations['cta.trial']}</Link>
              </Button>
              <Button size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white/10" asChild>
                <Link to="/signup">{translations['cta.demo']}</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
