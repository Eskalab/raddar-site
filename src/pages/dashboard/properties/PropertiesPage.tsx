
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProperties } from '@/hooks/useProperties';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Home, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import PropertyForm from '@/components/dashboard/properties/PropertyForm';
import { ScrollArea } from '@/components/ui/scroll-area';

const PropertiesPage = () => {
  const { properties, isLoading, error, deleteProperty } = useProperties();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddProperty = () => {
    setShowAddForm(!showAddForm);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await deleteProperty(id);
        toast({
          title: "Success",
          description: "Property deleted successfully",
        });
      } catch (error) {
        console.error('Error deleting property:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to delete property",
        });
      }
    }
  };

  const handleViewDetails = (id: string) => {
    navigate(`/dashboard/properties/${id}`);
  };

  if (isLoading) {
    return <div className="flex justify-center p-12">Loading properties...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-12">Error loading properties</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Properties</h1>
        <Button onClick={handleAddProperty} className="flex items-center gap-2">
          <Plus size={16} />
          {showAddForm ? 'Cancel' : 'Add Property'}
        </Button>
      </div>

      {showAddForm && (
        <div className="mb-8">
          <PropertyForm onSuccess={() => setShowAddForm(false)} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties && properties.length > 0 ? (
          properties.map((property) => (
            <Card key={property.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle>{property.name}</CardTitle>
                <CardDescription>
                  {property.address}, {property.city}, {property.state} {property.zip_code}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Bedrooms:</span>
                    <span className="font-medium">{property.bedrooms}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Bathrooms:</span>
                    <span className="font-medium">{property.bathrooms}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Size:</span>
                    <span className="font-medium">{property.square_feet} sq ft</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Rent:</span>
                    <span className="font-medium">${property.monthly_rent}/month</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Status:</span>
                    <span className="font-medium">
                      {property.tenant_id ? 'Occupied' : 'Vacant'}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-2"
                  onClick={() => handleViewDetails(property.id)}
                >
                  <Home size={16} />
                  Details
                </Button>
                <div className="flex space-x-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => navigate(`/dashboard/properties/edit/${property.id}`)}
                  >
                    <Edit size={16} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleDelete(property.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center p-8 bg-muted/50 rounded-lg">
            <Home className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
            <h3 className="text-lg font-medium mb-1">No properties found</h3>
            <p className="text-muted-foreground mb-4">
              You haven't added any properties yet.
            </p>
            <Button onClick={() => setShowAddForm(true)}>
              Add Your First Property
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertiesPage;
