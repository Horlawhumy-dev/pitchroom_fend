import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Layout } from "@/layouts/Layout";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, Loader2, CheckCircle2, ArrowRight, RefreshCw } from "lucide-react";
import { authService } from "@/services/auth.service";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const Register = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
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
      await authService.register(fullName, email, password);
      setSuccess(true);
      toast.success("Account created!", {
        description: "Please check your email to verify your account."
      });
    } catch (err: any) {
      setError(err.message);
      toast.error("Registration failed", {
        description: err.message || "Something went wrong during registration."
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (cooldown > 0) return;
    setResending(true);
    try {
      await authService.resendEmail(email, "verification");
      setCooldown(60);
      toast.success("Verification link resent!", {
        description: "Check your inbox for a new link."
      });
    } catch (err: any) {
      toast.error("Resend failed", {
        description: err.message || "Failed to resend verification link."
      });
    } finally {
      setResending(false);
    }
  };

  return (
    <Layout variant="minimal">
      <div className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-center py-12 px-4 bg-[#F8FAFC]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-brand-indigo mb-3 tracking-tight">Create your account</h1>
          <p className="text-brand-gray/60 font-medium">Join the world's most elite startup network.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="w-full max-w-md"
        >
          <AnimatePresence mode="wait">
            {!success ? (
              <motion.div 
                key="form"
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 gap-4">
                  <Button variant="outline" className="w-full h-14 rounded-xl border-brand-gray/10 hover:bg-white hover:border-brand-gray/20 transition-all font-semibold gap-3 text-brand-indigo">
                    <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
                    Sign up with Google
                  </Button>
                  <Button variant="outline" className="w-full h-14 rounded-xl border-brand-gray/10 hover:bg-white hover:border-brand-gray/20 transition-all font-semibold gap-3 text-brand-indigo">
                    <img src="https://www.linkedin.com/favicon.ico" className="w-4 h-4" alt="LinkedIn" />
                    Sign up with LinkedIn
                  </Button>
                </div>

                <div className="flex items-center gap-4 py-4">
                  <div className="h-[1px] flex-1 bg-brand-gray/10" />
                  <span className="text-[10px] font-bold text-brand-gray/30 uppercase tracking-[0.2em]">or email</span>
                  <div className="h-[1px] flex-1 bg-brand-gray/10" />
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="p-3 rounded-lg bg-red-50 text-red-500 text-[10px] font-bold uppercase tracking-wider"
                    >
                      {error}
                    </motion.div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="fullname" className="text-sm font-bold text-brand-indigo">Full Name</Label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray/40 group-focus-within:text-brand-blue transition-colors">
                        <User className="w-5 h-5" />
                      </div>
                      <Input 
                        id="fullname" 
                        placeholder="John Doe" 
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        className="h-14 pl-12 rounded-xl border-brand-gray/10 focus:border-brand-blue/50 focus:ring-4 focus:ring-brand-blue/5 transition-all text-brand-indigo font-medium placeholder:text-brand-gray/30"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-bold text-brand-indigo">Work Email</Label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray/40 group-focus-within:text-brand-blue transition-colors">
                        <Mail className="w-5 h-5" />
                      </div>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="john@company.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-14 pl-12 rounded-xl border-brand-gray/10 focus:border-brand-blue/50 focus:ring-4 focus:ring-brand-blue/5 transition-all text-brand-indigo font-medium placeholder:text-brand-gray/30"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-bold text-brand-indigo">Create Password</Label>
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
                        className="h-14 pl-12 pr-12 rounded-xl border-brand-gray/10 focus:border-brand-blue/50 focus:ring-4 focus:ring-brand-blue/5 transition-all text-brand-indigo font-medium placeholder:text-brand-gray/30"
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-gray/40 hover:text-brand-indigo transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    <p className="text-[10px] text-brand-gray/40 font-medium pl-1">Must be at least 8 characters with a number.</p>
                  </div>

                  <Button 
                    type="submit"
                    disabled={loading}
                    className="w-full h-14 bg-brand-indigo hover:bg-brand-indigo/90 text-white rounded-xl font-bold text-base shadow-xl shadow-brand-indigo/20 mt-4 disabled:opacity-70"
                  >
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                    ) : (
                      "Create account"
                    )}
                  </Button>
                </form>

                <p className="text-center text-xs text-brand-gray/50 mt-8 font-medium">
                  Already have an account? <Link to="/login" className="text-brand-indigo font-bold hover:underline">Log in</Link>
                </p>
              </motion.div>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[32px] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100/60 text-center"
              >
                <div className="size-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mx-auto mb-8 ring-8 ring-emerald-50/50">
                  <CheckCircle2 className="size-10" />
                </div>
                <h2 className="text-2xl font-black text-brand-indigo mb-3">Check your inbox</h2>
                <p className="text-slate-500 font-medium leading-relaxed mb-10">
                  A verification link has been sent to <span className="text-brand-indigo font-bold">{email}</span>. Click the link inside to activate your account.
                </p>
                
                <div className="space-y-4">
                  <Button 
                    onClick={handleResend}
                    disabled={resending || cooldown > 0}
                    variant="outline"
                    className="w-full h-14 rounded-2xl border-2 border-slate-100 font-bold text-slate-600 hover:bg-slate-50 flex items-center justify-center gap-2 group"
                  >
                    {resending ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <>
                        <RefreshCw className={`size-4 group-hover:rotate-180 transition-transform duration-500 ${cooldown > 0 ? 'opacity-50' : ''}`} />
                        {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend Link"}
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    asChild
                    className="w-full bg-brand-indigo hover:bg-brand-indigo/90 text-white h-14 rounded-2xl font-bold shadow-xl shadow-brand-indigo/10 flex items-center justify-center gap-2 group"
                  >
                    <Link to="/login">
                      Go to Login
                      <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Register;
