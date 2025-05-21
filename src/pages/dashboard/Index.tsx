
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard, 
  Home, 
  FileText, 
  Users, 
  Calendar, 
  Clock,
  PieChart,
  Info 
} from "lucide-react";

// Mock data for the dashboard
const outstandingBalances = [
  { property: "Garden Row (multi-building complex) - 28", amount: 250.00 },
  { property: "100 Main Ave (Studio) - 8", amount: 275.00 },
  { property: "Garden Row (multi-building complex) - 33", amount: 500.00 },
  { property: "160 East End Avenue (condo/townhouse) - 1", amount: 200.00 },
  { property: "100 Main Ave (blueprint) - 2", amount: 175.00 },
];

const taskData = [
  { 
    title: "Hole in Bathroom Screen", 
    description: "1 day ago · Resident request · 100 Main Ave (condo) - 4", 
    priority: "high" 
  },
  { 
    title: "Broken Mirror - Bathroom", 
    description: "1 day ago · Resident request · 100 Main Ave (studio) - A", 
    priority: "medium" 
  },
  { 
    title: "Leaky Faucet in Kitchen", 
    description: "3 days ago · Resident request · Garden Row (multi-building complex) - C", 
    priority: "low" 
  }
];

const overdueTasks = [
  {
    title: "There's a mouse in the house!",
    property: "Garden Row (multi-building complex) - 38",
    date: "5/12/2024",
  },
  {
    title: "Can I get a copy of my lease?",
    property: "14 Green Street (Studio suite) rental - 1",
    date: "5/8/2024",
  }
];

const rentalApplications = [
  { name: "Orlando Lambert", unit: "1", status: "new" },
  { name: "Carrie Wells", unit: "2D", status: "new" },
  { name: "Dustin Miller", unit: "3B", status: "new" },
  { name: "Robbie Williams", unit: "4C", status: "new" },
];

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("incoming");

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null; // Don't render anything while checking auth status
  }

  const totalOutstanding = outstandingBalances.reduce((sum, item) => sum + item.amount, 0).toFixed(2);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-buildium-navy text-white flex flex-col">
        <div className="p-4 border-b border-slate-700">
          <span className="text-xl font-bold text-white">Raddar</span>
        </div>
        
        <nav className="flex-grow py-4">
          <ul className="space-y-1">
            <li>
              <a href="#" className="flex items-center px-4 py-2 bg-buildium-navy/90 text-white font-medium">
                <LayoutDashboard className="mr-3 h-5 w-5" />
                <span>{language === 'en' ? 'Dashboard' : 'Tablero'}</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-4 py-2 hover:bg-buildium-navy/90 text-white">
                <Home className="mr-3 h-5 w-5" />
                <span>{language === 'en' ? 'Rentals' : 'Alquileres'}</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-4 py-2 hover:bg-buildium-navy/90 text-white">
                <FileText className="mr-3 h-5 w-5" />
                <span>{language === 'en' ? 'Leasing' : 'Arrendamiento'}</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-4 py-2 hover:bg-buildium-navy/90 text-white">
                <PieChart className="mr-3 h-5 w-5" />
                <span>{language === 'en' ? 'Accounting' : 'Contabilidad'}</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-4 py-2 hover:bg-buildium-navy/90 text-white">
                <Users className="mr-3 h-5 w-5" />
                <span>{language === 'en' ? 'Maintenance' : 'Mantenimiento'}</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-4 py-2 hover:bg-buildium-navy/90 text-white">
                <Clock className="mr-3 h-5 w-5" />
                <span>{language === 'en' ? 'Tasks' : 'Tareas'}</span>
              </a>
            </li>
          </ul>
        </nav>

        <div className="p-4 mt-auto">
          <Button 
            variant="outline" 
            className="w-full text-white border-white hover:bg-white hover:text-buildium-navy"
            onClick={() => signOut()}
          >
            {language === 'en' ? 'Sign Out' : 'Cerrar Sesión'}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="px-6 py-4 flex items-center justify-between">
            <h1 className="text-xl font-medium">
              {language === 'en' ? `Good evening, ${user.email?.split('@')[0]}!` : `Buenas tardes, ${user.email?.split('@')[0]}!`}
            </h1>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                {language === 'en' ? 'Customize dashboard' : 'Personalizar tablero'}
              </Button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Outstanding Balances */}
            <Card className="col-span-1">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">
                  {language === 'en' ? 'Outstanding Balances - Rentals' : 'Balances Pendientes - Alquileres'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <p className="text-2xl font-bold">${totalOutstanding}</p>
                  <p className="text-sm text-muted-foreground">
                    {language === 'en' ? 'Outstanding balances' : 'Saldos pendientes'}
                  </p>
                </div>
                <div className="space-y-2">
                  {outstandingBalances.map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-t border-gray-100">
                      <span className="text-sm">{item.property}</span>
                      <span className="font-medium">${item.amount.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tasks */}
            <Card className="col-span-1">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">
                  {language === 'en' ? 'Tasks' : 'Tareas'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="incoming" className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="incoming">
                      {language === 'en' ? 'Incoming requests' : 'Solicitudes entrantes'}
                    </TabsTrigger>
                    <TabsTrigger value="assigned">
                      {language === 'en' ? 'Assigned to me' : 'Asignadas a mí'}
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="incoming" className="space-y-4">
                    {taskData.map((task, i) => (
                      <div key={i} className="border-b pb-3 last:border-none">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{task.title}</h4>
                          <Badge 
                            variant={task.priority === 'high' ? 'destructive' : 
                                   task.priority === 'medium' ? 'default' : 'outline'}
                          >
                            {task.priority}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{task.description}</p>
                      </div>
                    ))}
                  </TabsContent>
                  <TabsContent value="assigned">
                    <div className="text-center py-6 text-muted-foreground">
                      {language === 'en' ? 'No tasks assigned to you' : 'No hay tareas asignadas a ti'}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Renters Insurance */}
            <Card className="col-span-1">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">
                  {language === 'en' ? 'Renters Insurance' : 'Seguro de Inquilinos'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center mb-4">
                  <div className="relative h-36 w-36">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-2xl font-bold">24</p>
                        <p className="text-xs">Total</p>
                      </div>
                    </div>
                    <div className="h-full w-full rounded-full border-8 border-buildium-purple"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-buildium-blue mr-2"></div>
                    <span className="text-sm">{language === 'en' ? '0 HO5 policy' : '0 póliza HO5'}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-amber-400 mr-2"></div>
                    <span className="text-sm">{language === 'en' ? '0 Third Party' : '0 Terceros'}</span>
                  </div>
                  <div className="mt-4">
                    <h4 className="text-sm font-medium">
                      {language === 'en' ? 'Uninsured' : 'Sin seguro'}
                    </h4>
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-rose-500 mr-2"></div>
                      <span className="text-sm">24 {language === 'en' ? 'Not insured' : 'Sin asegurar'}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Overdue Tasks */}
            <Card className="col-span-1">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">
                  {language === 'en' ? 'Overdue Tasks' : 'Tareas Vencidas'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="my" className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="my">
                      {language === 'en' ? 'My overdue tasks' : 'Mis tareas vencidas'}
                    </TabsTrigger>
                    <TabsTrigger value="all">
                      {language === 'en' ? 'All overdue tasks' : 'Todas las tareas vencidas'}
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="my" className="space-y-4">
                    {overdueTasks.map((task, i) => (
                      <div key={i} className="border-b pb-3 last:border-none">
                        <h4 className="font-medium">{task.title}</h4>
                        <p className="text-xs text-muted-foreground">{task.date} · {task.property}</p>
                      </div>
                    ))}
                  </TabsContent>
                  <TabsContent value="all">
                    <div className="text-center py-6 text-muted-foreground">
                      {language === 'en' ? 'Loading all tasks...' : 'Cargando todas las tareas...'}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Expiring Leases */}
            <Card className="col-span-1">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">
                  {language === 'en' ? 'Expiring Leases' : 'Contratos por Vencer'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="30" className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="30">0-30 {language === 'en' ? 'days' : 'días'}</TabsTrigger>
                    <TabsTrigger value="60">31-60 {language === 'en' ? 'days' : 'días'}</TabsTrigger>
                    <TabsTrigger value="90">61-90 {language === 'en' ? 'days' : 'días'}</TabsTrigger>
                    <TabsTrigger value="all">{language === 'en' ? 'All' : 'Todos'}</TabsTrigger>
                  </TabsList>
                  <TabsContent value="30">
                    <div className="flex items-center justify-center py-8">
                      <div className="text-center">
                        <p className="text-3xl font-bold mb-2">3</p>
                        <p className="text-sm text-muted-foreground">{language === 'en' ? 'leases' : 'contratos'}</p>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="60">
                    <div className="flex items-center justify-center py-8">
                      <div className="text-center">
                        <p className="text-3xl font-bold mb-2">0</p>
                        <p className="text-sm text-muted-foreground">{language === 'en' ? 'leases' : 'contratos'}</p>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="90">
                    <div className="flex items-center justify-center py-8">
                      <div className="text-center">
                        <p className="text-3xl font-bold mb-2">0</p>
                        <p className="text-sm text-muted-foreground">{language === 'en' ? 'leases' : 'contratos'}</p>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="all">
                    <div className="flex items-center justify-center py-8">
                      <div className="text-center">
                        <p className="text-3xl font-bold mb-2">3</p>
                        <p className="text-sm text-muted-foreground">{language === 'en' ? 'leases' : 'contratos'}</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Rental Applications */}
            <Card className="col-span-1">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">
                  {language === 'en' ? 'Rental Applications' : 'Solicitudes de Alquiler'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="new" className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="new">{language === 'en' ? 'New' : 'Nuevas'}</TabsTrigger>
                    <TabsTrigger value="submitted">{language === 'en' ? 'Submitted' : 'Enviadas'}</TabsTrigger>
                    <TabsTrigger value="approved">{language === 'en' ? 'Approved' : 'Aprobadas'}</TabsTrigger>
                  </TabsList>
                  <TabsContent value="new" className="space-y-2">
                    {rentalApplications.map((app, i) => (
                      <div key={i} className="flex justify-between items-center py-2 border-t border-gray-100 last:border-b">
                        <div>
                          <div className="flex items-center">
                            <span className="font-medium">{app.name}</span>
                            <span className="ml-2 text-xs">- {app.unit}</span>
                          </div>
                        </div>
                        <span className="text-xs text-sky-600 cursor-pointer">{language === 'en' ? 'Create task' : 'Crear tarea'}</span>
                      </div>
                    ))}
                  </TabsContent>
                  <TabsContent value="submitted">
                    <div className="text-center py-6 text-muted-foreground">
                      {language === 'en' ? 'No applications submitted' : 'No hay solicitudes enviadas'}
                    </div>
                  </TabsContent>
                  <TabsContent value="approved">
                    <div className="text-center py-6 text-muted-foreground">
                      {language === 'en' ? 'No applications approved' : 'No hay solicitudes aprobadas'}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="col-span-1">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">
                  {language === 'en' ? 'Recent Activity' : 'Actividad Reciente'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm font-medium">{language === 'en' ? 'Email' : 'Correo'}</p>
                      <p className="text-xs text-muted-foreground">
                        {language === 'en' ? 'Today - 5:30' : 'Hoy - 5:30'}
                      </p>
                    </div>
                    <p className="text-xs">
                      {language === 'en' ? 'Notice to Pay Rent (1) sent to Clifton Moore, Virginia Gonzalez, Jason Wilson, Sandra Washington, Anisha Lin' 
                      : 'Aviso de Pago de Alquiler (1) enviado a Clifton Moore, Virginia Gonzalez, Jason Wilson, Sandra Washington, Anisha Lin'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {language === 'en' ? 'Generated by:' : 'Generado por:'} Arni Sharma
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm font-medium">{language === 'en' ? 'Email' : 'Correo'}</p>
                      <p className="text-xs text-muted-foreground">
                        {language === 'en' ? 'Today - 5:30' : 'Hoy - 5:30'}
                      </p>
                    </div>
                    <p className="text-xs">
                      {language === 'en' ? 'Notice of Change of Rent (1) sent to Clifton Moore, Virginia Gonzalez, Jason Wilson, Sandra Washington, Anisha Lin' 
                      : 'Aviso de Cambio de Alquiler (1) enviado a Clifton Moore, Virginia Gonzalez, Jason Wilson, Sandra Washington, Anisha Lin'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {language === 'en' ? 'Generated by:' : 'Generado por:'} Arni Sharma
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
