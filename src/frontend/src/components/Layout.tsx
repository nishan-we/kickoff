import { Navbar } from "./Navbar";
import { BottomNav, Sidebar } from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <div className="flex flex-1 overflow-hidden max-w-screen-2xl mx-auto w-full">
        <Sidebar />

        <main className="flex-1 overflow-y-auto min-w-0">
          <div className="px-4 sm:px-6 lg:px-8 py-6 pb-20 lg:pb-6">
            {children}
          </div>
        </main>
      </div>

      <BottomNav />

      <footer className="hidden lg:block bg-card border-t border-border py-4">
        <div className="max-w-screen-2xl mx-auto px-6 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Tournament Pro. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
