import React from 'react';

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
    
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center p-6 max-w-md">
            <h1 className="text-2xl font-bold text-destructive mb-4">
              Ops! Algo deu errado
            </h1>
            <p className="text-muted-foreground mb-6">
              Pedimos desculpas, mas ocorreu um erro inesperado no sistema.
            </p>
            <button
              onClick={() => this.setState({ hasError: false, error: undefined })}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 font-semibold transition-colors shadow-sm"
            >
              Tentar novamente
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
