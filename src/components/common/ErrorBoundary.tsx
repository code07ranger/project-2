import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Unhandled app render error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FBF9F4] text-[#19191C] flex flex-col items-center justify-center p-6 text-center font-sans">
          <div className="p-8 max-w-md bg-white border-[3px] border-[#19191C] rounded-[16px] shadow-[6px_6px_0px_#19191C] space-y-4">
            <div className="w-12 h-12 bg-[#FFE600] border-2 border-[#19191C] rounded-[8px] flex items-center justify-center text-xl font-bold mx-auto">
              ⚡
            </div>
            <h2 className="font-heading font-black text-2xl">INFINITY SGGSCC</h2>
            <p className="text-sm text-gray-700">
              An interface cache refresh is required. Click below to load the latest verified build.
            </p>
            <button
              onClick={() => {
                try {
                  localStorage.clear();
                  sessionStorage.clear();
                } catch {
                  // ignore
                }
                window.location.reload();
              }}
              className="px-6 py-2.5 rounded-[10px] bg-[#FFE600] border-2 border-[#19191C] font-bold shadow-[3px_3px_0px_#19191C] hover:translate-x-0.5 hover:translate-y-0.5 transition-transform"
            >
              Refresh Platform
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
