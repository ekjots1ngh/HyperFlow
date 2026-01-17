"use client";

import { Component, ReactNode } from "react";
import { RefreshCw, XCircle } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: unknown) {
    console.error("ErrorBoundary caught:", error, errorInfo);

    if (typeof window !== "undefined" && (window as unknown as { gtag?: (key: string, value: string, options: Record<string, unknown>) => void }).gtag) {
      (window as unknown as { gtag: (key: string, value: string, options: Record<string, unknown>) => void }).gtag("event", "exception", {
        description: error.message,
        fatal: true,
      });
    }
  }

  handleReload = () => {
    this.setState({ hasError: false, error: undefined });
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
            <XCircle className="mx-auto mb-4 h-16 w-16 text-red-600" />
            <h1 className="mb-2 text-2xl font-bold">Something went wrong</h1>
            <p className="mb-6 text-gray-600">
              {this.state.error?.message ?? "An unexpected error occurred"}
            </p>
            <button
              type="button"
              onClick={this.handleReload}
              className="mx-auto flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
            >
              <RefreshCw className="h-4 w-4" />
              Reload App
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
