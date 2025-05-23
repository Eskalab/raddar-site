
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Calendar, FileText, Home, MessageSquare, User, Wallet } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import DocumentUpload from '@/components/dashboard/documents/DocumentUpload';
import TenantAssignForm from '@/components/dashboard/tenants/TenantAssignForm';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useProperties } from '@/hooks/useProperties';

const PropertyDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const { updateProperty } = useProperties();

  const { data: property, isLoading, error } = useQuery({
    queryKey: ['property', id],
    queryFn: async () => {
      if (!id) throw new Error('Property ID is required');
      
      // Fetch property details
      const { data: propertyData, error: propertyError } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single();
      
      if (propertyError) throw propertyError;
      
      // If there's a tenant, fetch their profile separately
      if (propertyData.tenant_id) {
        const { data: tenantProfile, error: tenantError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', propertyData.tenant_id)
          .single();
        
        if (!tenantError && tenantProfile) {
          // Add tenant profile data to the property object
          propertyData.tenant_profile = tenantProfile;
        }
      }
      
      return propertyData;
    },
    enabled: !!id,
  });

  const removeTenant = async () => {
    if (!id || !property) return;
    
    try {
      await updateProperty(id, { tenant_id: null });
      toast({
        title: "Success",
        description: "Tenant removed successfully",
      });
    } catch (error) {
      console.error("Error removing tenant:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to remove tenant. Please try again.",
      });
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-12">Loading property details...</div>;
  }

  if (error || !property) {
    return <div className="text-red-500 p-12">Error loading property details</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          className="flex items-center gap-2 mb-4"
          onClick={() => navigate('/dashboard/properties')}
        >
          <ArrowLeft size={16} />
          Back to Properties
        </Button>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">{property.name}</h1>
            <p className="text-muted-foreground">
              {property.address}, {property.city}, {property.state} {property.zip_code}
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => navigate(`/dashboard/properties/edit/${id}`)}
            >
              Edit Property
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-5 md:w-fit">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Home size={16} />
            <span className="hidden md:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="tenant" className="flex items-center gap-2">
            <User size={16} />
            <span className="hidden md:inline">Tenant</span>
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <FileText size={16} />
            <span className="hidden md:inline">Documents</span>
          </TabsTrigger>
          <TabsTrigger value="payments" className="flex items-center gap-2">
            <Wallet size={16} />
            <span className="hidden md:inline">Payments</span>
          </TabsTrigger>
          <TabsTrigger value="maintenance" className="flex items-center gap-2">
            <Calendar size={16} />
            <span className="hidden md:inline">Maintenance</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Property Details</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <dt className="text-muted-foreground">Size:</dt>
                    <dd>{property.square_feet} sq ft</dd>
                    
                    <dt className="text-muted-foreground">Bedrooms:</dt>
                    <dd>{property.bedrooms}</dd>
                    
                    <dt className="text-muted-foreground">Bathrooms:</dt>
                    <dd>{property.bathrooms}</dd>
                    
                    <dt className="text-muted-foreground">Monthly Rent:</dt>
                    <dd>${property.monthly_rent}</dd>
                    
                    <dt className="text-muted-foreground">Security Deposit:</dt>
                    <dd>${property.security_deposit}</dd>
                    
                    <dt className="text-muted-foreground">Available From:</dt>
                    <dd>{format(new Date(property.available_from), 'MMM d, yyyy')}</dd>
                    
                    <dt className="text-muted-foreground">Status:</dt>
                    <dd>{property.tenant_id ? 'Occupied' : 'Vacant'}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{property.description || 'No description available'}</p>
                
                {property.amenities && property.amenities.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Amenities</h4>
                    <div className="flex flex-wrap gap-2">
                      {property.amenities.map((amenity, index) => (
                        <span 
                          key={index} 
                          className="bg-secondary text-secondary-foreground px-2 py-1 text-sm rounded-md"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="tenant">
          <Card>
            <CardHeader>
              <CardTitle>Tenant Management</CardTitle>
            </CardHeader>
            <CardContent>
              {property.tenant_id ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      {property.tenant_profile?.avatar_url ? (
                        <AvatarImage src={property.tenant_profile.avatar_url} alt="Tenant" />
                      ) : (
                        <AvatarFallback>
                          <User size={24} className="text-gray-400" />
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{property.tenant_profile?.full_name || 'Unnamed Tenant'}</h3>
                      <p className="text-sm text-muted-foreground">{property.tenant_profile?.username || 'No username'}</p>
                    </div>
                  </div>
                  
                  <Button 
                    variant="destructive" 
                    onClick={() => {
                      if (window.confirm('Are you sure you want to remove this tenant from the property?')) {
                        removeTenant();
                      }
                    }}
                  >
                    Remove Tenant
                  </Button>
                </div>
              ) : (
                <TenantAssignForm propertyId={id!} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documents">
          <DocumentUpload propertyId={id!} />
        </TabsContent>
        
        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>Payment Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Payment functionality will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="maintenance">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Maintenance request functionality will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PropertyDetailsPage;
