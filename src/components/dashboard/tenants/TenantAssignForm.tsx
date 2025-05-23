
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { User } from 'lucide-react';

const tenantSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  fullName: z.string().min(2, { message: "Full name is required" }),
  createAccount: z.enum(['yes', 'no']).default('yes'),
});

type TenantFormValues = z.infer<typeof tenantSchema>;

interface TenantAssignFormProps {
  propertyId: string;
}

const TenantAssignForm = ({ propertyId }: TenantAssignFormProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [existingTenants, setExistingTenants] = useState<any[]>([]);
  const [searchEmail, setSearchEmail] = useState('');

  const form = useForm<TenantFormValues>({
    resolver: zodResolver(tenantSchema),
    defaultValues: {
      email: '',
      password: '',
      fullName: '',
      createAccount: 'yes',
    },
  });

  const searchTenants = async (email: string) => {
    if (!email) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'renter')
        .ilike('username', `%${email}%`)
        .limit(5);
      
      if (error) throw error;
      setExistingTenants(data || []);
    } catch (error) {
      console.error('Error searching tenants:', error);
    }
  };

  const assignExistingTenant = async (tenantId: string) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('properties')
        .update({ tenant_id: tenantId })
        .eq('id', propertyId);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Tenant assigned to property",
      });
      
      queryClient.invalidateQueries({ queryKey: ['property', propertyId] });
    } catch (error) {
      console.error('Error assigning tenant:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to assign tenant to property",
      });
    } finally {
      setLoading(false);
    }
  };

  const createTenant = async (data: TenantFormValues) => {
    setLoading(true);
    try {
      // First, create the Supabase auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
          },
        },
      });

      if (authError) throw authError;
      
      if (!authData.user) {
        throw new Error("Failed to create user account");
      }
      
      // Update the profile to set as renter
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ role: 'renter', full_name: data.fullName })
        .eq('id', authData.user.id);
        
      if (profileError) throw profileError;
      
      // Assign tenant to property
      const { error: assignError } = await supabase
        .from('properties')
        .update({ tenant_id: authData.user.id })
        .eq('id', propertyId);
      
      if (assignError) throw assignError;
      
      toast({
        title: "Success",
        description: "Tenant account created and assigned to property",
      });
      
      queryClient.invalidateQueries({ queryKey: ['property', propertyId] });
      form.reset();
    } catch (error: any) {
      console.error('Error creating tenant:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to create tenant account",
      });
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: TenantFormValues) => {
    if (data.createAccount === 'yes') {
      await createTenant(data);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Assign Existing Tenant</h3>
        <div className="space-y-4">
          <Input
            placeholder="Search tenant by email"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            onKeyUp={() => searchTenants(searchEmail)}
          />
          
          {existingTenants.length > 0 ? (
            <div className="space-y-2">
              {existingTenants.map(tenant => (
                <div
                  key={tenant.id}
                  className="flex items-center justify-between p-3 border rounded-md hover:bg-secondary/20"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                      {tenant.avatar_url ? (
                        <img src={tenant.avatar_url} alt="Tenant avatar" className="w-full h-full rounded-full object-cover" />
                      ) : (
                        <User size={20} />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{tenant.full_name || 'Unnamed'}</p>
                      <p className="text-sm text-muted-foreground">{tenant.username}</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={loading}
                    onClick={() => assignExistingTenant(tenant.id)}
                  >
                    Assign
                  </Button>
                </div>
              ))}
            </div>
          ) : searchEmail ? (
            <p className="text-muted-foreground">No tenants found with that email</p>
          ) : null}
        </div>
      </div>
      
      <div className="border-t pt-6">
        <h3 className="text-lg font-medium mb-4">Create New Tenant</h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="createAccount"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Create tenant account?</FormLabel>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-4"
                  >
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Yes, create account
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        No, I'll invite them manually
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {form.watch('createAccount') === 'yes' && (
              <>
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="John Doe" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="tenant@example.com" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" disabled={loading}>
                  Create Tenant & Assign
                </Button>
              </>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default TenantAssignForm;
