
import React from 'react';

interface ErrorBoundaryProps {
  children?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: React.ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error('[ErrorBoundary] Uncaught render error:', error, info.componentStack);
  }

  handleReload = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-[#f8f9fc]">
          <h1 className="text-3xl font-serif mb-4">Un instant d'imprévu...</h1>
          <p className="text-slate-500 mb-8 max-w-md">
            Une erreur inattendue est survenue. Revenez à l'accueil pour continuer votre exploration.
          </p>
          <button
            onClick={this.handleReload}
            className="px-10 py-4 bg-fr-red text-white rounded-full font-black uppercase tracking-widest text-[11px] hover:bg-slate-900 transition-colors"
          >
            Retour à l'accueil
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
