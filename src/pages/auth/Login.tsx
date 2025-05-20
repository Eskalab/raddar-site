
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { UserRound, AlertTriangle } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Alert, AlertDescription } from "@/components/ui/alert";

// Define form schema
const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const Login = () => {
  const { language } = useLanguage();
  const { signIn, isSupabaseConfigured } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    await signIn(values.email, values.password);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 rounded-full bg-buildium-blue/10 flex items-center justify-center">
              <UserRound className="h-6 w-6 text-buildium-blue" />
            </div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              {language === 'en' ? 'Sign in to your account' : 'Inicia sesión en tu cuenta'}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {language === 'en' ? 'Enter your details below' : 'Ingresa tus datos a continuación'}
            </p>
          </div>
          
          {!isSupabaseConfigured && (
            <Alert variant="destructive" className="mb-6">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                {language === 'en' 
                  ? 'Supabase environment variables are not configured. Authentication will not work.'
                  : 'Las variables de entorno de Supabase no están configuradas. La autenticación no funcionará.'}
              </AlertDescription>
            </Alert>
          )}
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{language === 'en' ? 'Email address' : 'Correo electrónico'}</FormLabel>
                    <FormControl>
                      <Input placeholder={language === 'en' ? "name@example.com" : "nombre@ejemplo.com"} {...field} />
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
                    <FormLabel>{language === 'en' ? 'Password' : 'Contraseña'}</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full bg-buildium-blue hover:bg-blue-700"
                disabled={isLoading || !isSupabaseConfigured}
              >
                {isLoading 
                  ? (language === 'en' ? 'Signing in...' : 'Iniciando sesión...') 
                  : (language === 'en' ? 'Sign in' : 'Iniciar sesión')}
              </Button>
            </form>
          </Form>
          
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              {language === 'en' ? 'Not registered yet?' : '¿No estás registrado?'}{' '}
              <Link to="/signup" className="font-medium text-buildium-blue hover:text-blue-700">
                {language === 'en' ? 'Sign up here' : 'Regístrate aquí'}
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
