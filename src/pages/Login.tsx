import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Layout } from "@/layouts/Layout";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Loader2, RefreshCw, AlertCircle } from "lucide-react";
import { authService } from "@/services/auth.service";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated, refreshUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    let timer: any;
    if (cooldown > 0) {
      timer = setInterval(() => setCooldown(c => c - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await authService.login(email, password);
      refreshUser();
      toast.success("Welcome back!", {
        description: "Successfully signed in to PitchRoom."
      });
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
      if (!err.message.toLowerCase().includes("verify")) {
        toast.error("Login failed", {
          description: err.message || "Please check your credentials."
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (cooldown > 0 || !email) return;
    setResending(true);
    try {
      await authService.resendEmail(email, "verification");
      setCooldown(60);
      toast.success("Verification link resent!", {
        description: "Please check your inbox."
      });
    } catch (err: any) {
      toast.error("Resend failed", {
        description: err.message || "Failed to resend verification link."
      });
    } finally {
      setResending(false);
    }
  };

  const isUnverified = error?.toLowerCase().includes("verify");

  return (
    <Layout variant="auth">
      <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-4 bg-[#F8FAFC]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white rounded-[32px] p-8 md:p-12 shadow-[0_8px_40px_rgba(0,0,0,0.04)] border border-brand-indigo/5"
        >
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-brand-indigo mb-2">Welcome back</h1>
            <p className="text-sm font-medium text-brand-gray/50">Please enter your details to sign in.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`p-4 rounded-xl flex flex-col gap-3 ${
                    isUnverified ? "bg-amber-50 border border-amber-100 text-amber-700" : "bg-red-50 border border-red-100 text-red-500"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <AlertCircle className="size-4 mt-0.5 shrink-0" />
                    <p className="text-[11px] font-bold uppercase tracking-wider leading-relaxed">
                      {error}
                    </p>
                  </div>
                  
                  {isUnverified && (
                    <Button
                      type="button"
                      onClick={handleResend}
                      disabled={resending || cooldown > 0}
                      variant="ghost"
                      className="h-10 w-full bg-white/50 hover:bg-white text-amber-700 border border-amber-200/50 rounded-lg text-[10px] font-black uppercase tracking-widest gap-2"
                    >
                      {resending ? (
                        <Loader2 className="size-3 animate-spin" />
                      ) : (
                        <>
                          <RefreshCw className={`size-3 ${cooldown > 0 ? "opacity-50" : ""}`} />
                          {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend Verification Link"}
                        </>
                      )}
                    </Button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-bold text-brand-indigo">Email Address</Label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray/40 group-focus-within:text-brand-blue transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-14 pl-12 rounded-xl border-brand-gray/10 focus:border-brand-blue/50 focus:ring-4 focus:ring-brand-blue/5 transition-all text-brand-indigo font-medium placeholder:text-brand-gray/30 bg-[#F1F5F9]/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="text-sm font-bold text-brand-indigo">Password</Label>
                <Link to="/forgot-password" className="text-xs font-bold text-brand-indigo hover:text-brand-blue transition-colors">Forgot password?</Link>
              </div>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray/40 group-focus-within:text-brand-blue transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-14 pl-12 pr-12 rounded-xl border-brand-gray/10 focus:border-brand-blue/50 focus:ring-4 focus:ring-brand-blue/5 transition-all text-brand-indigo font-medium placeholder:text-brand-gray/30 bg-[#F1F5F9]/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-gray/40 hover:text-brand-indigo transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="remember" className="rounded-md border-brand-gray/20 data-[state=checked]:bg-brand-indigo data-[state=checked]:border-brand-indigo" />
              <label htmlFor="remember" className="text-xs font-medium text-brand-gray/60 leading-none cursor-pointer">
                Remember me for 30 days
              </label>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-brand-indigo hover:bg-brand-indigo/90 text-white rounded-xl font-bold text-base shadow-xl shadow-brand-indigo/20 transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Log In
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>

            <div className="flex items-center gap-4 py-2">
              <div className="h-[1px] flex-1 bg-brand-gray/10" />
              <span className="text-[10px] font-bold text-brand-gray/30 uppercase tracking-[0.2em]">or continue with</span>
              <div className="h-[1px] flex-1 bg-brand-gray/10" />
            </div>

            <Button variant="outline" className="w-full h-14 rounded-xl border-brand-gray/10 hover:bg-[#F8FAFC] hover:border-brand-gray/20 transition-all font-semibold gap-3 text-brand-indigo">
              <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
              Sign in with Google
            </Button>
          </form>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-sm text-brand-gray/60 mt-8 font-medium"
        >
          Don't have an account? <Link to="/register" className="text-brand-indigo font-bold hover:underline">Sign up for free</Link>
        </motion.p>
      </div>
    </Layout>
  );
};

export default Login;
