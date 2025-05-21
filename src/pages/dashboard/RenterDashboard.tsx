
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard, 
  Home, 
  File, 
  Calendar, 
  MessageSquare,
  Wallet,
  Settings 
} from "lucide-react";

// Mock data for the renter dashboard
const recentPayments = [
  { date: "05/01/2024", amount: 1200.00, status: "paid" },
  { date: "04/01/2024", amount: 1200.00, status: "paid" },
  { date: "03/01/2024", amount: 1200.00, status: "paid" },
];

const maintenanceRequests = [
  { 
    id: 1,
    title: "Leaky Faucet",
    submitted: "05/10/2024",
    status: "in progress" 
  },
  { 
    id: 2,
    title: "Broken Window",
    submitted: "04/25/2024",
    status: "completed" 
  },
  { 
    id: 3,
    title: "AC Not Working",
    submitted: "05/15/2024",
    status: "new" 
  }
];

const upcomingPayments = [
  { 
    description: "June Rent", 
    dueDate: "06/01/2024", 
    amount: 1200.00 
  }
];

const documents = [
  { name: "Lease Agreement", type: "PDF", date: "01/15/2024" },
  { name: "Building Rules", type: "PDF", date: "01/15/2024" },
  { name: "Move-in Inspection", type: "PDF", date: "01/15/2024" }
];

const RenterDashboard = () => {
  const { user, signOut, profile } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null; // Don't render anything while checking auth status
  }

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'new':
        return <Badge variant="default">New</Badge>;
      case 'in progress':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">In Progress</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex flex-1">
        <DashboardSidebar />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Dashboard Content */}
          <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-800">
                {language === 'en' ? 'Renter Dashboard' : 'Panel de Inquilino'}
              </h1>
              <p className="text-gray-600">
                {language === 'en' 
                  ? `Welcome back, ${profile?.full_name || user.email?.split('@')[0]}!` 
                  : `¡Bienvenido de nuevo, ${profile?.full_name || user.email?.split('@')[0]}!`}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Rent Information */}
              <Card className="col-span-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">
                    {language === 'en' ? 'Current Rent Details' : 'Detalles del Alquiler Actual'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-2xl font-bold">$1,200.00</p>
                      <p className="text-sm text-muted-foreground">
                        {language === 'en' ? 'Monthly Rent' : 'Alquiler Mensual'}
                      </p>
                    </div>
                    <div className="pt-2 border-t">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{language === 'en' ? 'Next Payment Due' : 'Próximo Pago'}</span>
                        <span className="text-sm">06/01/2024</span>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm font-medium">{language === 'en' ? 'Lease End Date' : 'Fin del Contrato'}</span>
                        <span className="text-sm">12/31/2024</span>
                      </div>
                    </div>
                    <Button className="w-full bg-buildium-blue">
                      {language === 'en' ? 'Make a Payment' : 'Realizar un Pago'}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Maintenance Requests */}
              <Card className="col-span-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">
                    {language === 'en' ? 'Maintenance Requests' : 'Solicitudes de Mantenimiento'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {maintenanceRequests.map((request) => (
                      <div key={request.id} className="border-b pb-2 last:border-none">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{request.title}</h4>
                          {getStatusBadge(request.status)}
                        </div>
                        <p className="text-xs text-muted-foreground">Submitted: {request.submitted}</p>
                      </div>
                    ))}
                    <Button className="w-full">
                      {language === 'en' ? 'Create New Request' : 'Crear Nueva Solicitud'}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Documents */}
              <Card className="col-span-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">
                    {language === 'en' ? 'Documents' : 'Documentos'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {documents.map((doc, i) => (
                      <div key={i} className="flex justify-between items-center py-2 border-t border-gray-100">
                        <div>
                          <span className="font-medium">{doc.name}</span>
                          <p className="text-xs text-muted-foreground">{doc.date}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          {language === 'en' ? 'View' : 'Ver'}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Payments */}
              <Card className="col-span-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">
                    {language === 'en' ? 'Recent Payments' : 'Pagos Recientes'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="payments" className="w-full">
                    <TabsList className="mb-4">
                      <TabsTrigger value="payments">
                        {language === 'en' ? 'Payments' : 'Pagos'}
                      </TabsTrigger>
                      <TabsTrigger value="history">
                        {language === 'en' ? 'History' : 'Historial'}
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="payments" className="space-y-4">
                      {recentPayments.map((payment, i) => (
                        <div key={i} className="border-b pb-3 last:border-none">
                          <div className="flex justify-between">
                            <h4 className="font-medium">{payment.date}</h4>
                            <span className="font-medium">${payment.amount.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <p className="text-xs text-muted-foreground">Rent Payment</p>
                            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                              {payment.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                    <TabsContent value="history">
                      <div className="text-center py-6 text-muted-foreground">
                        {language === 'en' ? 'View your complete payment history here' : 'Ver historial completo de pagos aquí'}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Announcements */}
              <Card className="col-span-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">
                    {language === 'en' ? 'Building Announcements' : 'Anuncios del Edificio'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-b pb-3">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Water Shutoff Notice</h4>
                        <span className="text-xs text-muted-foreground">05/25/2024</span>
                      </div>
                      <p className="text-sm mt-1">
                        Water will be shut off from 10am-2pm for scheduled maintenance.
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between">
                        <h4 className="font-medium">Pool Opening</h4>
                        <span className="text-xs text-muted-foreground">05/20/2024</span>
                      </div>
                      <p className="text-sm mt-1">
                        The pool will be opening for the season on Memorial Day weekend.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Property Manager */}
              <Card className="col-span-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">
                    {language === 'en' ? 'Contact Property Manager' : 'Contactar al Administrador'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-b pb-3">
                      <h4 className="font-medium">Main Office</h4>
                      <p className="text-sm mt-1">(555) 123-4567</p>
                      <p className="text-sm">office@buildingname.com</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Emergency Contact</h4>
                      <p className="text-sm mt-1">(555) 987-6543</p>
                      <p className="text-sm text-muted-foreground">Available 24/7</p>
                    </div>
                    <Button className="w-full">
                      {language === 'en' ? 'Send Message' : 'Enviar Mensaje'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default RenterDashboard;
