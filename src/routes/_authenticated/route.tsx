import { Link, Outlet, createFileRoute, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated")({
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const { session, loading } = useAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (!loading && !session) {
      void navigate({ to: "/auth", search: { next: pathname } });
    }
  }, [loading, session, navigate, pathname]);

  if (loading || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="rule-label">Verifying session…</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Top bar — 48px, persists across every page */}
      <header className="sticky top-0 z-20 flex h-12 shrink-0 items-center gap-6 border-b border-border bg-background/90 px-6 backdrop-blur">
        <Link to="/runs" className="font-[family-name:var(--font-display)] text-base tracking-tight">
          Ledger
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link to="/runs" className="text-muted-foreground hover:text-foreground [&.active]:text-foreground">
            Investigations
          </Link>
          <Link to="/memory" className="text-muted-foreground hover:text-foreground [&.active]:text-foreground">
            Memory &amp; safety
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <span className="hidden text-xs text-muted-foreground sm:block">{session.user.email}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={async () => {
              await supabase.auth.signOut();
              void navigate({ to: "/" });
            }}
          >
            Sign out
          </Button>
        </div>
      </header>

      <div className="flex-1">
        <Outlet />
      </div>

      {/* Global status bar — 32px */}
      <footer className="flex h-8 shrink-0 items-center gap-4 border-t border-border bg-background px-6 font-[family-name:var(--font-mono)] text-[11px] text-muted-foreground">
        <span>Ledger</span>
        <span className="opacity-50">·</span>
        <span>{session.user.email}</span>
      </footer>
    </div>
  );
}import { Link, Outlet, createFileRoute, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated")({
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const { session, loading } = useAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (!loading && !session) {
      void navigate({ to: "/auth", search: { next: pathname } });
    }
  }, [loading, session, navigate, pathname]);

  if (loading || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="rule-label">Verifying session…</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Top bar — 48px, persists across every page */}
      <header className="sticky top-0 z-20 flex h-12 shrink-0 items-center gap-6 border-b border-border bg-background/90 px-6 backdrop-blur">
        <Link to="/runs" className="font-[family-name:var(--font-display)] text-base tracking-tight">
          Ledger
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link to="/runs" className="text-muted-foreground hover:text-foreground [&.active]:text-foreground">
            Investigations
          </Link>
          <Link to="/memory" className="text-muted-foreground hover:text-foreground [&.active]:text-foreground">
            Memory &amp; safety
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <span className="hidden text-xs text-muted-foreground sm:block">{session.user.email}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={async () => {
              await supabase.auth.signOut();
              void navigate({ to: "/" });
            }}
          >
            Sign out
          </Button>
        </div>
      </header>

      <div className="flex-1">
        <Outlet />
      </div>

      {/* Global status bar — 32px */}
      <footer className="flex h-8 shrink-0 items-center gap-4 border-t border-border bg-background px-6 font-[family-name:var(--font-mono)] text-[11px] text-muted-foreground">
        <span>Ledger</span>
        <span className="opacity-50">·</span>
        <span>{session.user.email}</span>
      </footer>
    </div>
  );
}
