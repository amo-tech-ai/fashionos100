import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from './Button';

interface ErrorBoundaryProps {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // @ts-ignore
      const isDev = import.meta.env?.DEV;

      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center bg-white">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6 text-red-500">
            <AlertTriangle size={32} />
          </div>
          
          <h2 className="text-3xl font-serif font-bold text-fashion-black mb-4">
            Something went wrong.
          </h2>
          
          <p className="text-gray-500 max-w-md mb-8 leading-relaxed">
            We apologize for the inconvenience. An unexpected error has occurred. 
            Please try refreshing the page.
          </p>

          {isDev && this.state.error && (
            <div className="w-full max-w-2xl bg-gray-50 p-4 rounded-xl border border-gray-200 text-left mb-8 overflow-auto max-h-40">
              <p className="text-xs font-mono text-red-600 whitespace-pre-wrap">
                {this.state.error.toString()}
              </p>
            </div>
          )}

          <div className="flex gap-4">
            <Button variant="outline" onClick={() => window.history.back()}>
              Go Back
            </Button>
            <Button variant="primary" onClick={this.handleReset} className="gap-2">
              <RefreshCw size={16} /> Reload Page
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}