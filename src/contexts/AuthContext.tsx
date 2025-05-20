
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { useLanguage } from './LanguageContext';

interface AuthContextProps {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isSupabaseConfigured: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { language } = useLanguage();
  
  // Check if Supabase is properly configured
  const isSupabaseConfigured = Boolean(
    import.meta.env.VITE_SUPABASE_URL && 
    import.meta.env.VITE_SUPABASE_ANON_KEY
  );

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setLoading(false);
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [isSupabaseConfigured]);

  const signIn = async (email: string, password: string) => {
    if (!isSupabaseConfigured) {
      toast({
        variant: "destructive",
        title: language === 'en' ? 'Configuration Error' : 'Error de Configuración',
        description: language === 'en' 
          ? 'Supabase is not properly configured. Please set up environment variables.' 
          : 'Supabase no está configurado correctamente. Configure las variables de entorno.'
      });
      return;
    }
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: language === 'en' ? 'Welcome back!' : '¡Bienvenido de nuevo!',
        description: language === 'en' 
          ? 'You have successfully logged in.' 
          : 'Has iniciado sesión exitosamente.'
      });
      
      navigate('/');
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        variant: "destructive",
        title: language === 'en' ? 'Login Failed' : 'Error de inicio de sesión',
        description: language === 'en' 
          ? 'Invalid email or password. Please try again.' 
          : 'Correo o contraseña incorrectos. Por favor, intente de nuevo.'
      });
    }
  };

  const signUp = async (email: string, password: string) => {
    if (!isSupabaseConfigured) {
      toast({
        variant: "destructive",
        title: language === 'en' ? 'Configuration Error' : 'Error de Configuración',
        description: language === 'en' 
          ? 'Supabase is not properly configured. Please set up environment variables.' 
          : 'Supabase no está configurado correctamente. Configure las variables de entorno.'
      });
      return;
    }
    
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: language === 'en' ? 'Account created!' : '¡Cuenta creada!',
        description: language === 'en' 
          ? 'Please check your email to confirm your account.' 
          : 'Por favor, verifica tu correo para confirmar tu cuenta.'
      });
      
      navigate('/login');
    } catch (error: any) {
      console.error('Signup error:', error);
      toast({
        variant: "destructive",
        title: language === 'en' ? 'Registration Failed' : 'Error de registro',
        description: language === 'en'
          ? 'There was a problem creating your account. Please try again.' 
          : 'Hubo un problema al crear tu cuenta. Por favor, intenta de nuevo.'
      });
    }
  };

  const signOut = async () => {
    if (!isSupabaseConfigured) return;
    
    try {
      await supabase.auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      isSupabaseConfigured,
      signIn,
      signUp,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
