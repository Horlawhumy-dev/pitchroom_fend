import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Rocket } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

interface LayoutProps {
  children: React.ReactNode;
  variant?: "default" | "minimal" | "auth";
}

export const Layout: React.FC<LayoutProps> = ({ children, variant = "default" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  if (variant === "auth") {
    return (
      <div className="min-h-screen bg-[#F8FAFC] font-sans antialiased text-foreground">
        <header className="h-20 flex items-center justify-center border-b border-brand-indigo/5 bg-white/50 backdrop-blur-sm sticky top-0 z-50">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-brand-indigo rounded-xl flex items-center justify-center shadow-lg shadow-brand-indigo/20">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-brand-indigo">PitchRoom</span>
          </Link>
        </header>
        <main>{children}</main>
      </div>
    );
  }

  if (variant === "minimal") {
    return (
      <div className="min-h-screen bg-[#F8FAFC] font-sans antialiased text-foreground">
        <header className="h-20 flex items-center justify-between px-6 md:px-12 border-b border-brand-indigo/5 bg-white/50 backdrop-blur-sm sticky top-0 z-50">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-indigo rounded-lg flex items-center justify-center shadow-lg shadow-brand-indigo/20">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-brand-indigo">PitchRoom</span>
          </Link>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <Button asChild className="rounded-xl bg-brand-indigo hover:bg-brand-indigo/90 text-white font-bold px-6">
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <span className="text-sm font-medium text-brand-gray/50 hidden sm:inline">Already have an account?</span>
                <Button variant="outline" asChild className="rounded-xl border-brand-indigo/10 text-brand-indigo font-bold px-6 bg-white hover:bg-brand-indigo hover:text-white transition-all">
                  <Link to="/login">Log in</Link>
                </Button>
              </>
            )}
          </div>
        </header>
        <main>{children}</main>
        <footer className="py-8 border-t border-brand-indigo/5 bg-white">
          <div className="container mx-auto px-4 flex flex-col items-center gap-4">
            <div className="flex items-center gap-6 text-sm font-bold text-brand-gray/40">
              <a href="#" className="hover:text-brand-indigo transition-colors uppercase tracking-widest">Terms</a>
              <a href="#" className="hover:text-brand-indigo transition-colors uppercase tracking-widest">Privacy</a>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans antialiased text-foreground overflow-x-hidden">
      <header className="sticky top-0 z-50 w-full border-b border-brand-indigo/5 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-brand-indigo rounded-xl flex items-center justify-center shadow-lg shadow-brand-indigo/20 group-hover:scale-105 transition-transform duration-300">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-brand-indigo">PitchRoom</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-[13px] font-bold text-brand-gray/60 uppercase tracking-widest">
            <a href="#" className="hover:text-brand-indigo transition-colors">Platform</a>
            <a href="#" className="hover:text-brand-indigo transition-colors">AI Personalities</a>
            <a href="#" className="hover:text-brand-indigo transition-colors">Pricing</a>
            <a href="#" className="hover:text-brand-indigo transition-colors">Resources</a>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-3">
              {isAuthenticated ? (
                <Button asChild className="bg-brand-indigo hover:bg-brand-indigo/90 text-white font-bold rounded-xl px-6 h-11 shadow-lg shadow-brand-indigo/20">
                  <Link to="/dashboard">Go to Dashboard</Link>
                </Button>
              ) : (
                <>
                  <Button variant="ghost" asChild className="text-[13px] font-bold text-brand-gray/60 uppercase tracking-widest hover:text-brand-indigo hover:bg-transparent px-4">
                    <Link to="/login">Log in</Link>
                  </Button>
                  <Button asChild className="bg-brand-indigo hover:bg-brand-indigo/90 text-white font-bold rounded-xl px-6 h-11 shadow-lg shadow-brand-indigo/20">
                    <Link to="/register">Start Practicing</Link>
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 text-brand-indigo transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-brand-indigo/5 bg-white overflow-hidden"
            >
              <div className="container mx-auto px-4 py-8 flex flex-col gap-6">
                <nav className="flex flex-col gap-6 text-lg font-bold text-brand-indigo">
                  <a href="#" onClick={() => setIsMenuOpen(false)}>Platform</a>
                  <a href="#" onClick={() => setIsMenuOpen(false)}>AI Personalities</a>
                  <a href="#" onClick={() => setIsMenuOpen(false)}>Pricing</a>
                  <a href="#" onClick={() => setIsMenuOpen(false)}>Resources</a>
                </nav>
                <div className="h-[1px] bg-brand-indigo/5 w-full" />
                <div className="flex flex-col gap-4">
                  {isAuthenticated ? (
                    <>
                      <Button asChild className="w-full h-14 rounded-2xl bg-brand-indigo hover:bg-brand-indigo/90 text-white font-bold text-lg shadow-xl shadow-brand-indigo/20">
                        <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>Go to Dashboard</Link>
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full h-14 rounded-2xl border-red-100 text-red-500 font-bold text-lg hover:bg-red-50 hover:border-red-200 transition-all"
                        onClick={() => {
                          setIsMenuOpen(false);
                          logout();
                        }}
                      >
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" asChild className="w-full h-14 rounded-2xl border-brand-indigo/10 text-brand-indigo font-bold text-lg">
                        <Link to="/login" onClick={() => setIsMenuOpen(false)}>Log in</Link>
                      </Button>
                      <Button asChild className="w-full h-14 rounded-2xl bg-brand-indigo hover:bg-brand-indigo/90 text-white font-bold text-lg shadow-xl shadow-brand-indigo/20">
                        <Link to="/register" onClick={() => setIsMenuOpen(false)}>Start Practicing</Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>{children}</main>

      <footer className="bg-[#F8FAFC] pt-24 pb-12 border-t border-brand-indigo/5">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-full md:col-span-1 flex flex-col gap-6">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-brand-indigo rounded-lg flex items-center justify-center">
                  <Rocket className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold tracking-tight text-brand-indigo">PitchRoom</span>
              </Link>
              <p className="text-brand-gray/60 text-sm leading-relaxed max-w-xs">
                The intelligence layer for fundraising. Helping founders communicate vision with clarity.
              </p>
            </div>

            <FooterColumn title="Product">
              <a href="#">Features</a>
              <a href="#">Pricing</a>
              <a href="#">Personalities</a>
            </FooterColumn>

            <FooterColumn title="Company">
              <a href="#">About</a>
              <a href="#">Careers</a>
              <a href="#">Contact</a>
            </FooterColumn>

            <FooterColumn title="Legal">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
            </FooterColumn>
          </div>

          <div className="pt-8 border-t border-brand-indigo/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[11px] font-bold text-brand-gray/40 uppercase tracking-widest text-center md:text-left">
              &copy; {new Date().getFullYear()} PitchRoom Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-brand-gray/30">
              <div className="w-4 h-4 bg-current rounded-full" />
              <div className="w-4 h-4 bg-current rounded-full" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FooterColumn = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="flex flex-col gap-6">
    <h4 className="text-xs font-black uppercase tracking-[0.2em] text-brand-indigo">{title}</h4>
    <div className="flex flex-col gap-4 text-sm font-semibold text-brand-gray/60">
      {React.Children.map(children, child => (
        <div className="hover:text-brand-indigo transition-colors cursor-pointer">
          {child}
        </div>
      ))}
    </div>
  </div>
);


