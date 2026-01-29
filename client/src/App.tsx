import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/Navigation";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";

import AuthPage from "@/pages/Auth";
import UserDashboard from "@/pages/UserDashboard";
import AdminDashboard from "@/pages/AdminDashboard";
import TrolleyPage from "@/pages/Trolley";
import NotFound from "@/pages/not-found";

// Protected Route Wrapper
function ProtectedRoute({ 
  component: Component, 
  requiredRole 
}: { 
  component: React.ComponentType, 
  requiredRole?: 'admin' | 'user' 
}) {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  if (!user) {
    setLocation("/");
    return null;
  }

  if (requiredRole && user.role !== requiredRole) {
    setLocation("/"); // Or unauthorized page
    return null;
  }

  return (
    <>
      <Navigation />
      <Component />
    </>
  );
}

function Router() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div className="flex items-center justify-center min-h-screen"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <Switch>
      <Route path="/">
        {user ? (
          user.role === 'admin' ? <ProtectedRoute component={AdminDashboard} requiredRole="admin" /> : <ProtectedRoute component={UserDashboard} requiredRole="user" />
        ) : (
          <AuthPage />
        )}
      </Route>
      
      <Route path="/dashboard">
        <ProtectedRoute component={UserDashboard} requiredRole="user" />
      </Route>
      
      <Route path="/admin">
        <ProtectedRoute component={AdminDashboard} requiredRole="admin" />
      </Route>
      
      <Route path="/trolley">
        <ProtectedRoute component={TrolleyPage} />
      </Route>
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
