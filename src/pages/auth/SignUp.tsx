
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useLanguage } from '@/contexts/LanguageContext';
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
import { toast } from '@/hooks/use-toast';
import { UserPlus } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Define the form schema
const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

const SignUp = () => {
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });

      if (error) {
        throw error;
      }

      toast({
        title: language === 'en' ? 'Account created!' : '¡Cuenta creada!',
        description: language === 'en'
          ? 'Please check your email to confirm your account.'
          : 'Por favor, verifica tu correo para confirmar tu cuenta.'
      });

      // Navigate to login page after successful signup
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        variant: "destructive",
        title: language === 'en' ? 'Registration Failed' : 'Error de registro',
        description: language === 'en'
          ? 'There was a problem creating your account. Please try again.'
          : 'Hubo un problema al crear tu cuenta. Por favor, intenta de nuevo.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 rounded-full bg-buildium-blue/10 flex items-center justify-center">
              <UserPlus className="h-6 w-6 text-buildium-blue" />
            </div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              {language === 'en' ? 'Create an account' : 'Crea una cuenta'}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {language === 'en' ? 'Sign up to get started' : 'Regístrate para comenzar'}
            </p>
          </div>
          
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
              
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{language === 'en' ? 'Confirm Password' : 'Confirmar Contraseña'}</FormLabel>
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
                disabled={isLoading}
              >
                {isLoading 
                  ? (language === 'en' ? 'Creating account...' : 'Creando cuenta...') 
                  : (language === 'en' ? 'Create account' : 'Crear cuenta')}
              </Button>
            </form>
          </Form>
          
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              {language === 'en' ? 'Already have an account?' : '¿Ya tienes una cuenta?'}{' '}
              <Link to="/login" className="font-medium text-buildium-blue hover:text-blue-700">
                {language === 'en' ? 'Log in here' : 'Inicia sesión aquí'}
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SignUp;
