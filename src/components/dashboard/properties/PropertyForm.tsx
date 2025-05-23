import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useProperties, Property } from '@/hooks/useProperties';
import { useLanguage } from '@/contexts/LanguageContext';

const propertySchema = z.object({
  name: z.string().min(2, { message: "Property name is required" }),
  address: z.string().min(5, { message: "Address is required" }),
  city: z.string().min(2, { message: "City is required" }),
  state: z.string().min(2, { message: "State is required" }),
  zip_code: z.string().min(5, { message: "Valid ZIP code is required" }),
  bedrooms: z.coerce.number().min(0, { message: "Enter valid number of bedrooms" }),
  bathrooms: z.coerce.number().min(0, { message: "Enter valid number of bathrooms" }),
  square_feet: z.coerce.number().min(1, { message: "Valid square footage is required" }),
  monthly_rent: z.coerce.number().min(0, { message: "Valid monthly rent is required" }),
  security_deposit: z.coerce.number().min(0, { message: "Valid security deposit is required" }),
  available_from: z.string().min(1, { message: "Available date is required" }),
  description: z.string().optional(),
  amenities: z.array(z.string()).default([]),
});

type PropertyFormValues = z.infer<typeof propertySchema>;

interface PropertyFormProps {
  onSuccess?: () => void;
  property?: Property;
}

const PropertyForm = ({ onSuccess, property }: PropertyFormProps) => {
  const { toast } = useToast();
  const { language } = useLanguage();
  const { addProperty, updateProperty, loading } = useProperties();
  const [amenitiesInput, setAmenitiesInput] = useState('');
  
  const isEditing = !!property;

  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      name: property?.name || '',
      address: property?.address || '',
      city: property?.city || '',
      state: property?.state || '',
      zip_code: property?.zip_code || '',
      bedrooms: property?.bedrooms || 0,
      bathrooms: property?.bathrooms || 0,
      square_feet: property?.square_feet || 0,
      monthly_rent: property?.monthly_rent || 0,
      security_deposit: property?.security_deposit || 0,
      available_from: property?.available_from ? new Date(property.available_from).toISOString().split('T')[0] : '',
      description: property?.description || '',
      amenities: property?.amenities || [],
    },
  });

  const handleAmenitiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmenitiesInput(e.target.value);
  };

  const addAmenity = () => {
    if (!amenitiesInput.trim()) return;
    
    const currentAmenities = form.getValues('amenities') || [];
    form.setValue('amenities', [...currentAmenities, amenitiesInput.trim()]);
    setAmenitiesInput('');
  };

  const removeAmenity = (index: number) => {
    const currentAmenities = form.getValues('amenities');
    form.setValue('amenities', currentAmenities.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: PropertyFormValues) => {
    try {
      if (isEditing) {
        await updateProperty(property.id, data);
        toast({
          title: "Success",
          description: "Property updated successfully",
        });
      } else {
        // Create a proper non-optional object that satisfies the Property type requirements
        const propertyData: Omit<Property, 'id' | 'owner_id'> = {
          name: data.name,
          address: data.address,
          city: data.city,
          state: data.state,
          zip_code: data.zip_code,
          bedrooms: data.bedrooms,
          bathrooms: data.bathrooms,
          square_feet: data.square_feet,
          monthly_rent: data.monthly_rent,
          security_deposit: data.security_deposit,
          available_from: data.available_from,
          description: data.description || '',
          amenities: data.amenities || [],
        };
        
        await addProperty(propertyData);
        toast({
          title: "Success",
          description: "Property added successfully",
        });
        form.reset();
      }
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error saving property:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save property. Please try again.",
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{isEditing ? 'Update Property' : 'Add New Property'}</CardTitle>
        <CardDescription>
          {isEditing ? 'Edit the details of your property' : 'Enter the details of your new property'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Property name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Street address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="City" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input placeholder="State" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="zip_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ZIP Code</FormLabel>
                    <FormControl>
                      <Input placeholder="ZIP Code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bedrooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bedrooms</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Number of bedrooms" 
                        {...field} 
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bathrooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bathrooms</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.5"
                        placeholder="Number of bathrooms" 
                        {...field} 
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="square_feet"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Square Feet</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Square footage" 
                        {...field} 
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="monthly_rent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Rent</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Monthly rent amount" 
                        {...field} 
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="security_deposit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Security Deposit</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Security deposit amount" 
                        {...field} 
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="available_from"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Available From</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Property description" 
                      className="min-h-[120px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amenities"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amenities</FormLabel>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Add amenity (e.g., Pool, Gym)" 
                      value={amenitiesInput} 
                      onChange={handleAmenitiesChange} 
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={addAmenity}
                    >
                      Add
                    </Button>
                  </div>
                  {field.value?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {field.value.map((amenity, index) => (
                        <div key={index} className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md flex items-center gap-1">
                          <span>{amenity}</span>
                          <button
                            type="button"
                            onClick={() => removeAmenity(index)}
                            className="text-xs hover:text-destructive"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2">
              <Button type="submit" disabled={loading}>
                {isEditing ? 'Update Property' : 'Add Property'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default PropertyForm;
