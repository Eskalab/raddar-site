
import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Property {
  id: string;
  owner_id: string;
  tenant_id?: string | null;
  name: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  bedrooms: number;
  bathrooms: number;
  square_feet: number;
  monthly_rent: number;
  security_deposit: number;
  available_from: string;
  description: string;
  amenities: string[];
  created_at?: string;
  updated_at?: string;
  tenant_profile?: {
    id: string;
    full_name: string | null;
    username: string | null;
    avatar_url: string | null;
  };
}

export const useProperties = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const fetchProperties = async () => {
    if (!user) throw new Error('No authenticated user');
    
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Property[];
  };

  const fetchProperty = async (id: string) => {
    if (!user) throw new Error('No authenticated user');
    
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as Property;
  };

  const { data: properties, isLoading, error } = useQuery({
    queryKey: ['properties'],
    queryFn: fetchProperties,
    enabled: !!user,
  });

  const getProperty = async (id: string) => {
    return queryClient.fetchQuery({
      queryKey: ['property', id],
      queryFn: () => fetchProperty(id),
    });
  };

  const addProperty = async (propertyData: Omit<Property, 'id' | 'owner_id'>) => {
    if (!user) throw new Error('No authenticated user');
    setLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('properties')
        .insert([{ ...propertyData, owner_id: user.id }])
        .select();
      
      if (error) throw error;
      
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      return data[0] as Property;
    } finally {
      setLoading(false);
    }
  };

  const updateProperty = async (id: string, propertyData: Partial<Property>) => {
    if (!user) throw new Error('No authenticated user');
    setLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('properties')
        .update(propertyData)
        .eq('id', id)
        .select();
      
      if (error) throw error;
      
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      queryClient.invalidateQueries({ queryKey: ['property', id] });
      return data[0] as Property;
    } finally {
      setLoading(false);
    }
  };

  const deleteProperty = async (id: string) => {
    if (!user) throw new Error('No authenticated user');
    setLoading(true);
    
    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    } finally {
      setLoading(false);
    }
  };
  
  return {
    properties,
    isLoading,
    error,
    loading,
    getProperty,
    addProperty,
    updateProperty,
    deleteProperty,
  };
};
