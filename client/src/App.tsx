import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import { useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Verify from "./pages/Verify";
import Logs from "./pages/Logs";
import Profile from "./pages/Profile"; 

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SolucoesSection from "@/components/SolucoesSection";
import ConformidadeSection from "@/components/ConformidadeSection";
import RecursosSection from "@/components/RecursosSection";


const ProtectedRoute = ({ component: Component, path }: { component: React.ComponentType, path: string }) => {
  const [location, setLocation] = useLocation();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      setLocation('/login');
    }
  }, [token, setLocation]);

  if (!token) return null;

  return <Route path={path} component={Component} />;
};

const PublicLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex flex-col bg-white">
    <Header />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} /> 
      
      <Route path="/solucoes/:any*">
        <PublicLayout><SolucoesSection /></PublicLayout>
      </Route>
      <Route path="/conformidade/:any*">
        <PublicLayout><ConformidadeSection /></PublicLayout>
      </Route>
      <Route path="/recursos/:any*">
        <PublicLayout><RecursosSection /></PublicLayout>
      </Route>

      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    
      
      <Route path="/verify" component={Verify} />

      
      <ProtectedRoute path="/dashboard" component={Dashboard} /> 
      <ProtectedRoute path="/logs" component={Logs} />
      <ProtectedRoute path="/profile" component={Profile} /> 

      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
