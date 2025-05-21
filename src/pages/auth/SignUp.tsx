
// src/pages/auth/SignUp.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'tenant' | 'renter'>('tenant');
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const { translations, language } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert(language === 'en' ? 'Passwords do not match' : 'Las contraseñas no coinciden');
      return;
    }
    
    setIsLoading(true);
    try {
      await signUp(email, password, role);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              {translations['signup.title'] || 'Create an account'}
            </CardTitle>
            <CardDescription className="text-center">
              {translations['signup.description'] || 'Enter your email and password to sign up'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{translations['form.email'] || 'Email'}</Label>
                <Input 
                  id="email"
                  type="email"
                  placeholder={translations['form.emailPlaceholder'] || 'name@example.com'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{translations['form.password'] || 'Password'}</Label>
                <Input 
                  id="password"
                  type="password"
                  placeholder={translations['form.passwordPlaceholder'] || '••••••••'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">
                  {translations['form.confirmPassword'] || 'Confirm Password'}
                </Label>
                <Input 
                  id="confirmPassword"
                  type="password"
                  placeholder={translations['form.confirmPasswordPlaceholder'] || '••••••••'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label>
                  {language === 'en' ? 'I am a:' : 'Soy un:'}
                </Label>
                <RadioGroup defaultValue="tenant" value={role} onValueChange={(value) => setRole(value as 'tenant' | 'renter')}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="tenant" id="tenant" />
                    <Label htmlFor="tenant">{language === 'en' ? 'Property Owner/Manager' : 'Propietario/Administrador'}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="renter" id="renter" />
                    <Label htmlFor="renter">{language === 'en' ? 'Renter/Tenant' : 'Inquilino/Arrendatario'}</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <Button type="submit" className="w-full bg-buildium-blue" disabled={isLoading}>
                {isLoading ? (
                  <span>{translations['signup.loading'] || 'Signing up...'}</span>
                ) : (
                  <span>{translations['signup.submit'] || 'Sign Up'}</span>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <div className="text-sm text-gray-500">
              {translations['signup.haveAccount'] || 'Already have an account?'}{' '}
              <Link to="/login" className="text-buildium-blue hover:underline">
                {translations['signup.login'] || 'Login'}
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
