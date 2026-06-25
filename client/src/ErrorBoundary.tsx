import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    
    console.error('SafeHash Error Log:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <AlertTriangle size={32} />
            </div>
            
            <h1 className="text-2xl font-bold text-slate-900 mb-2 uppercase tracking-tight">
              Ops! Algo deu errado
            </h1>
            
            <p className="text-slate-500 mb-8 text-sm leading-relaxed">
              Ocorreu um erro inesperado ao processar esta página. Isso pode ser uma instabilidade temporária na conexão ou no servidor.
            </p>
            
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  this.setState({ hasError: false, error: undefined });
                  window.location.reload();
                }}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 font-bold transition-all shadow-lg shadow-blue-600/20"
              >
                <RefreshCw size={18} />
                TENTAR NOVAMENTE
              </button>
              
              <button
                onClick={() => window.location.href = '/'}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-100 text-slate-600 rounded-2xl hover:bg-slate-200 font-bold transition-all"
              >
                <Home size={18} />
                VOLTAR AO INÍCIO
              </button>
            </div>
            
            <p className="mt-8 text-[10px] text-slate-400 font-medium uppercase tracking-widest">
              SafeHash Integrity Shield
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
