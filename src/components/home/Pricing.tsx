
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Pricing = () => {
  const { translations } = useLanguage();
  
  const pricingPlans = [
    {
      name: translations['pricing.starter'] || 'Starter',
      price: '$50',
      description: translations['pricing.starterDesc'] || 'Perfect for small landlords',
      features: [
        translations['pricing.starterFeature1'] || 'Up to 20 units',
        translations['pricing.starterFeature2'] || 'Core property management tools',
        translations['pricing.starterFeature3'] || 'Online rent collection',
        translations['pricing.starterFeature4'] || 'Basic reports',
        translations['pricing.starterFeature5'] || 'Email support'
      ],
      cta: translations['pricing.startTrial'] || 'Start Free Trial',
      popular: false
    },
    {
      name: translations['pricing.professional'] || 'Professional',
      price: '$150',
      description: translations['pricing.professionalDesc'] || 'For growing property management companies',
      features: [
        translations['pricing.proFeature1'] || 'Up to 100 units',
        translations['pricing.proFeature2'] || 'All Starter features',
        translations['pricing.proFeature3'] || 'Advanced accounting',
        translations['pricing.proFeature4'] || 'Owner portal',
        translations['pricing.proFeature5'] || 'Maintenance management',
        translations['pricing.proFeature6'] || 'Online applications & leases',
        translations['pricing.proFeature7'] || 'Priority support'
      ],
      cta: translations['pricing.startTrial'] || 'Start Free Trial',
      popular: true
    },
    {
      name: translations['pricing.enterprise'] || 'Enterprise',
      price: translations['pricing.custom'] || 'Custom',
      description: translations['pricing.enterpriseDesc'] || 'For large portfolio managers',
      features: [
        translations['pricing.entFeature1'] || 'Unlimited units',
        translations['pricing.entFeature2'] || 'All Professional features',
        translations['pricing.entFeature3'] || 'API access',
        translations['pricing.entFeature4'] || 'Custom integrations',
        translations['pricing.entFeature5'] || 'Dedicated account manager',
        translations['pricing.entFeature6'] || 'Training & onboarding',
        translations['pricing.entFeature7'] || '24/7 premium support'
      ],
      cta: translations['pricing.contactSales'] || 'Contact Sales',
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">{translations['pricing.title'] || 'Simple, Transparent Pricing'}</h2>
          <p className="text-lg text-gray-600">
            {translations['pricing.subtitle'] || 'Choose the plan that fits your property management needs'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative rounded-xl border ${
                plan.popular ? 'border-buildium-purple shadow-lg' : 'border-gray-200'
              } overflow-hidden`}
            >
              {plan.popular && (
                <div className="bg-buildium-purple text-white text-xs font-semibold py-1 px-3 absolute top-0 right-0 rounded-bl-lg">
                  {translations['pricing.mostPopular'] || 'Most Popular'}
                </div>
              )}
              
              <div className="p-6 md:p-8">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== translations['pricing.custom'] && plan.price !== 'Custom' && <span className="text-gray-500 ml-1">{translations['pricing.perMonth'] || '/month'}</span>}
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <Button 
                  className={`w-full mb-6 ${
                    plan.popular 
                      ? 'bg-buildium-purple hover:bg-purple-700' 
                      : 'bg-buildium-blue hover:bg-blue-700'
                  }`}
                >
                  {plan.cta}
                </Button>
                
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold mb-3">{translations['pricing.notSure'] || 'Not sure which plan is right for you?'}</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            {translations['pricing.helpText'] || 'Our team can help you find the perfect solution for your property management needs.'}
          </p>
          <Button variant="outline" className="border-buildium-blue text-buildium-blue hover:bg-blue-50">
            {translations['pricing.scheduleConsult'] || 'Schedule a Consultation'}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
