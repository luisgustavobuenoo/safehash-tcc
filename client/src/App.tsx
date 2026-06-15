import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Verify from "./pages/Verify";
import Logs from "./pages/Logs";
import Profile from "./pages/Profile"; 



// Importando os novos componentes de seção para as rotas públicas
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SolucoesSection from "@/components/SolucoesSection";
import ConformidadeSection from "@/components/ConformidadeSection";
import RecursosSection from "@/components/RecursosSection";
import PlanosSection from "@/components/PlanosSection";
import JurisprudenciaSection from '@/components/ui/JurisprudenciaSection';

// Helper para renderizar seções públicas com Header e Footer
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
      {/* Rota Principal */}
      <Route path="/" component={Home} /> 
      
      {/* Novas Rotas Públicas do Header */}
      <Route path="/solucoes/:any*">
        <PublicLayout><SolucoesSection /></PublicLayout>
      </Route>
      <Route path="/conformidade/:any*">
        <PublicLayout><ConformidadeSection /></PublicLayout>
      </Route>
      <Route path="/recursos/:any*">
        <PublicLayout><RecursosSection /></PublicLayout>
      </Route>
      <Route path="/planos">
        <PublicLayout><PlanosSection /></PublicLayout>
      </Route>
      <Route path="/jurisprudencia">
        <PublicLayout><JurisprudenciaSection /></PublicLayout>
      </Route>

      {/* Rotas de Autenticação */}
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    
      
      {/* Rotas Internas (Dashboard) */}
      <Route path="/dashboard" component={Dashboard} /> 
      <Route path="/verify" component={Verify} />
      <Route path="/logs" component={Logs} />
      <Route path="/profile" component={Profile} /> 

      {/* Erro */}
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
