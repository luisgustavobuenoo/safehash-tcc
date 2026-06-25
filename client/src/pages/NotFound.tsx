import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileWarning, Home, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50">
      <Card className="w-full max-w-lg mx-4 shadow-2xl border-slate-200 bg-white rounded-3xl overflow-hidden">
        <div className="h-2 bg-blue-600 w-full" />
        <CardContent className="pt-12 pb-12 text-center px-8">
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-blue-50 rounded-2xl">
              <FileWarning className="h-12 w-12 text-blue-600" />
            </div>
          </div>

          <h1 className="text-6xl font-black text-slate-900 mb-2 tracking-tighter">404</h1>

          <h2 className="text-xl font-bold text-slate-800 mb-4 uppercase tracking-tight">
            Página Não Encontrada
          </h2>

          <p className="text-slate-500 mb-10 leading-relaxed text-sm">
            O recurso ou página que você tentou acessar não foi localizado em nossos registros de custódia. 
            Verifique o endereço digitado ou retorne ao painel principal.
          </p>

          <div className="flex flex-col gap-3">
            <Button
              onClick={() => setLocation("/")}
              className="bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-2xl font-bold transition-all shadow-lg shadow-blue-600/20"
            >
              <Home className="w-5 h-5 mr-2" />
              VOLTAR AO INÍCIO
            </Button>
            
            <Button
              onClick={() => window.history.back()}
              variant="outline"
              className="border-slate-200 text-slate-600 py-6 rounded-2xl font-bold hover:bg-slate-50"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              RETORNAR À PÁGINA ANTERIOR
            </Button>
          </div>
          
          <div className="mt-12 pt-8 border-t border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
              SafeHash Security Protocol
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
