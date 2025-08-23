'use client';

import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; reset: () => void }>;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error boundary caught:', error, errorInfo);
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error} reset={this.reset} />;
      }

      return <DefaultErrorFallback error={this.state.error} reset={this.reset} />;
    }

    return this.props.children;
  }
}

function DefaultErrorFallback({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-[400px] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 dark:bg-red-900/20 rounded-full mb-4">
            <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
          
          <h2 className="text-xl font-semibold text-center text-gray-900 dark:text-white mb-2">
            ¡Ups! Algo salió mal
          </h2>
          
          <p className="text-center text-gray-600 dark:text-gray-400 mb-4">
            Ha ocurrido un error inesperado. Por favor, intenta recargar la página.
          </p>
          
          {process.env.NODE_ENV === 'development' && (
            <div className="mb-4 p-3 bg-gray-100 dark:bg-gray-900 rounded-lg">
              <p className="text-xs font-mono text-gray-700 dark:text-gray-300 break-all">
                {error.message}
              </p>
            </div>
          )}
          
          <button
            onClick={reset}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Intentar de nuevo</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// Hook para usar en componentes funcionales
export function useErrorHandler() {
  return (error: Error) => {
    console.error('Error handled:', error);
    throw error; // Esto será capturado por el ErrorBoundary más cercano
  };
}