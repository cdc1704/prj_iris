"use client";
import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("IRIS runtime error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <main className="min-h-screen bg-[var(--void)] text-[var(--ink)] flex items-center px-6 md:px-16 lg:px-28">
          <section className="max-w-3xl border border-white/10 bg-white/[0.025] p-8 md:p-12 backdrop-blur-sm">
            <p className="font-mono-ui text-[var(--cyan)]">Sistema · stato di errore</p>
            <h1 className="font-editorial mt-6 text-4xl md:text-6xl leading-[1.05]">
              La calibrazione visiva si è interrotta.
            </h1>
            <p className="mt-8 max-w-xl text-sm md:text-base leading-relaxed text-[var(--muted)]">
              Il motore oculare non è riuscito a inizializzare la scena. Ricarica l’esperienza o controlla la console di sviluppo per il dettaglio tecnico.
            </p>
            <pre className="mt-8 max-w-full overflow-x-auto border-t border-white/10 pt-6 text-xs leading-relaxed text-[var(--ice)]">
              {this.state.error?.toString()}
            </pre>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}
