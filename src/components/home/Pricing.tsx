
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const pricingPlans = [
  {
    name: 'Starter',
    price: '$50',
    description: 'Perfect for small landlords',
    features: [
      'Up to 20 units',
      'Core property management tools',
      'Online rent collection',
      'Basic reports',
      'Email support'
    ],
    cta: 'Start Free Trial',
    popular: false
  },
  {
    name: 'Professional',
    price: '$150',
    description: 'For growing property management companies',
    features: [
      'Up to 100 units',
      'All Starter features',
      'Advanced accounting',
      'Owner portal',
      'Maintenance management',
      'Online applications & leases',
      'Priority support'
    ],
    cta: 'Start Free Trial',
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large portfolio managers',
    features: [
      'Unlimited units',
      'All Professional features',
      'API access',
      'Custom integrations',
      'Dedicated account manager',
      'Training & onboarding',
      '24/7 premium support'
    ],
    cta: 'Contact Sales',
    popular: false
  }
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-gray-600">
            Choose the plan that fits your property management needs
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
                  Most Popular
                </div>
              )}
              
              <div className="p-6 md:p-8">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== 'Custom' && <span className="text-gray-500 ml-1">/month</span>}
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
          <h3 className="text-xl font-semibold mb-3">Not sure which plan is right for you?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our team can help you find the perfect solution for your property management needs.
          </p>
          <Button variant="outline" className="border-buildium-blue text-buildium-blue hover:bg-blue-50">
            Schedule a Consultation
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
