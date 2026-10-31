import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  message: string;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, message: '' };

  static getDerivedStateFromError(error: unknown): State {
    const message = error instanceof Error ? error.message : String(error);
    return { hasError: true, message };
  }

  handleReset = () => {
    this.setState({ hasError: false, message: '' });
  };

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-6 text-center">
          <div className="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
            !
          </div>
          <h1 className="text-lg font-bold text-blue-950 mb-1">Halaman tidak dapat dimuat</h1>
          <p className="text-sm text-slate-500 mb-4">
            Terjadi kesalahan saat menampilkan halaman. Coba muat ulang, atau kembali ke beranda.
          </p>
          {this.state.message && (
            <pre className="text-xs text-left text-red-600 bg-red-50 border border-red-200 rounded-lg p-3 mb-4 overflow-x-auto whitespace-pre-wrap break-words">
              {this.state.message}
            </pre>
          )}
          <div className="flex gap-2 justify-center">
            <button
              onClick={this.handleReset}
              className="px-4 py-2 text-sm font-semibold text-blue-900 bg-yellow-400 hover:bg-yellow-300 rounded-lg transition"
            >
              Coba lagi
            </button>
            <button
              onClick={() => {
                this.handleReset();
                window.location.hash = '';
                window.location.reload();
              }}
              className="px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
            >
              Muat ulang halaman
            </button>
          </div>
        </div>
      </div>
    );
  }
}
