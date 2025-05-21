
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { useLanguage } from './LanguageContext';

interface UserProfile {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  role: 'tenant' | 'renter';
}

interface AuthContextProps {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  loading: boolean;
  isSupabaseConfigured: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, role?: 'tenant' | 'renter') => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { language } = useLanguage();
  
  // Check if Supabase is properly configured
  const isSupabaseConfigured = Boolean(
    import.meta.env.VITE_SUPABASE_URL && 
    import.meta.env.VITE_SUPABASE_ANON_KEY
  );

  // Fetch user profile
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, username, full_name, avatar_url, role')
        .eq('id', userId)
        .single();

      if (error) throw error;
      setProfile(data as UserProfile);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

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
        
        if (currentSession?.user) {
          // Use setTimeout to avoid Supabase auth callbacks deadlocks
          setTimeout(() => {
            fetchUserProfile(currentSession.user.id);
          }, 0);
        } else {
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        fetchUserProfile(currentSession.user.id);
      }
      
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
      
      navigate('/dashboard');
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

  const signUp = async (email: string, password: string, role: 'tenant' | 'renter' = 'tenant') => {
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
      // First, sign up the user
      const { error: signUpError, data } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) throw signUpError;

      // If successful, update the user's role in the profiles table
      if (data.user) {
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ role })
          .eq('id', data.user.id);

        if (updateError) {
          console.error('Error updating user role:', updateError);
        }
      }

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
      profile,
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
