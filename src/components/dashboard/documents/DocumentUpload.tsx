
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { FileText, Trash2, Upload } from 'lucide-react';

const documentTypes = [
  { value: 'lease', label: 'Lease Agreement' },
  { value: 'inspection', label: 'Inspection Report' },
  { value: 'receipt', label: 'Receipt' },
  { value: 'maintenance', label: 'Maintenance Record' },
  { value: 'insurance', label: 'Insurance Document' },
  { value: 'other', label: 'Other' },
];

const documentSchema = z.object({
  name: z.string().min(1, { message: "Document name is required" }),
  document_type: z.string().min(1, { message: "Document type is required" }),
  file: z.any()
    .refine(file => file?.length > 0, "File is required")
    .transform(file => file[0]),
});

type DocumentFormValues = z.infer<typeof documentSchema>;

interface DocumentUploadProps {
  propertyId: string;
}

const DocumentUpload = ({ propertyId }: DocumentUploadProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [documents, setDocuments] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<DocumentFormValues>({
    resolver: zodResolver(documentSchema),
    defaultValues: {
      name: '',
      document_type: '',
    },
  });

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('documents')
        .select('*, profiles:uploaded_by (username, full_name)')
        .eq('property_id', propertyId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setDocuments(data || []);
    } catch (error) {
      console.error('Error fetching documents:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load documents",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (propertyId) {
      fetchDocuments();
    }
  }, [propertyId]);

  const onSubmit = async (data: DocumentFormValues) => {
    if (!user) return;
    
    try {
      setUploading(true);
      
      // Upload file to Supabase Storage
      const file = data.file;
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `${propertyId}/${fileName}`;
      
      const { error: uploadError, data: uploadData } = await supabase.storage
        .from('property_assets')
        .upload(filePath, file);
      
      if (uploadError) throw uploadError;
      
      // Get public URL for the file
      const { data: urlData } = supabase.storage
        .from('property_assets')
        .getPublicUrl(filePath);
      
      if (!urlData?.publicUrl) throw new Error("Failed to get file URL");
      
      // Create document record in database
      const { error: dbError } = await supabase
        .from('documents')
        .insert({
          property_id: propertyId,
          name: data.name,
          document_type: data.document_type,
          file_url: urlData.publicUrl,
          uploaded_by: user.id,
        });
      
      if (dbError) throw dbError;
      
      toast({
        title: "Success",
        description: "Document uploaded successfully",
      });
      
      // Reset form and refresh documents list
      form.reset();
      fetchDocuments();
    } catch (error: any) {
      console.error('Error uploading document:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to upload document",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (documentId: string, fileUrl: string) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      try {
        setLoading(true);
        
        // Extract the path from the URL
        const filePath = fileUrl.split('/').slice(-2).join('/');
        
        // Delete from storage first
        const { error: storageError } = await supabase.storage
          .from('property_assets')
          .remove([filePath]);
        
        if (storageError) throw storageError;
        
        // Delete record from database
        const { error: dbError } = await supabase
          .from('documents')
          .delete()
          .eq('id', documentId);
        
        if (dbError) throw dbError;
        
        toast({
          title: "Success",
          description: "Document deleted successfully",
        });
        
        // Refresh documents list
        fetchDocuments();
      } catch (error: any) {
        console.error('Error deleting document:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message || "Failed to delete document",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload Document</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Document Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter document name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="document_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Document Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select document type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {documentTypes.map(type => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="file"
                render={({ field: { onChange, value, ...rest } }) => (
                  <FormItem>
                    <FormLabel>Document File</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onChange={(e) => onChange(e.target.files)}
                        {...rest}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full" disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload Document'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Property Documents</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center p-4">Loading documents...</div>
          ) : documents.length > 0 ? (
            <div className="space-y-2">
              {documents.map(doc => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50"
                >
                  <div className="flex items-center space-x-3">
                    <FileText size={24} className="text-blue-500" />
                    <div>
                      <p className="font-medium">{doc.name}</p>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <span>{documentTypes.find(t => t.value === doc.document_type)?.label || doc.document_type}</span>
                        <span>•</span>
                        <span>
                          Uploaded by {doc.profiles?.full_name || doc.profiles?.username || 'Unknown'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => window.open(doc.file_url, '_blank')}
                    >
                      <Upload size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDelete(doc.id, doc.file_url)}
                      disabled={loading}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-6">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
              <h3 className="text-lg font-medium mb-1">No documents</h3>
              <p className="text-muted-foreground">
                Upload your first document using the form above.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentUpload;
