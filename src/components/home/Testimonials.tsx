
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    quote: "Buildium has completely transformed how we manage our properties. The time savings alone has been worth the investment.",
    author: "Sarah Johnson",
    position: "Property Manager, Rockwell Properties",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100"
  },
  {
    quote: "The accounting features are incredibly robust. We've been able to eliminate multiple software subscriptions since switching to Buildium.",
    author: "Michael Chen",
    position: "Director, Urban Housing Solutions",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100&h=100"
  },
  {
    quote: "Our residents love the online portal for payments and maintenance requests. It's been a game-changer for our customer satisfaction.",
    author: "Rebecca Williams",
    position: "Owner, Sunset Property Management",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=100&h=100"
  }
];

const stats = [
  { value: '16,000+', label: 'Customers Worldwide' },
  { value: '2.5M+', label: 'Units Managed' },
  { value: '95%', label: 'Customer Satisfaction' },
  { value: '30%', label: 'Average Time Saved' }
];

const Testimonials = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-lg text-gray-600">
            Join thousands of property managers who trust Buildium to run their business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white border border-gray-100 overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col h-full">
                  <div className="mb-4 text-lg text-gray-600 flex-grow">
                    <svg className="h-8 w-8 text-buildium-purple mb-2 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.039 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                    </svg>
                    <p>{testimonial.quote}</p>
                  </div>
                  
                  <div className="flex items-center mt-4">
                    <img 
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <p className="font-medium text-buildium-navy">{testimonial.author}</p>
                      <p className="text-sm text-gray-500">{testimonial.position}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats section */}
        <div className="bg-buildium-blue/5 rounded-xl p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="p-4">
                <p className="text-3xl md:text-4xl font-bold text-buildium-blue mb-2">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
