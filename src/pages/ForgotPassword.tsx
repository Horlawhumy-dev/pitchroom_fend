import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Mail, Loader2, CheckCircle2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authService } from "@/services/auth.service";
import { toast } from "sonner";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    let timer: any;
    if (cooldown > 0) {
      timer = setInterval(() => setCooldown(c => c - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await authService.forgotPassword(email);
      setIsSent(true);
      toast.success("Reset link sent!", {
        description: "Check your email for the password recovery link."
      });
    } catch (err: any) {
      const msg = err.message || "Failed to send reset link. Please try again.";
      setError(msg);
      toast.error("Recovery failed", {
        description: msg
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (cooldown > 0) return;
    setResending(true);
    try {
      await authService.resendEmail(email, "reset-password");
      setCooldown(60);
      toast.success("Reset link resent!", {
        description: "Please check your inbox."
      });
    } catch (err: any) {
      toast.error("Resend failed", {
        description: err.message || "Failed to resend reset link."
      });
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-indigo/[0.03] via-transparent to-transparent">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link to="/" className="inline-block group transition-transform hover:scale-105 active:scale-95">
            <div className="size-16 bg-brand-indigo rounded-2xl flex items-center justify-center text-white shadow-xl shadow-brand-indigo/20 mx-auto mb-6">
              <RocketIcon className="size-10" />
            </div>
          </Link>
          <h1 className="text-3xl font-black text-brand-indigo tracking-tight">PitchRoom</h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[32px] p-10 shadow-[0_20px_50px_rgba(30,27,75,0.04)] border border-slate-100/60"
        >
          <AnimatePresence mode="wait">
            {!isSent ? (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="mb-8 ">
                  <h2 className="text-2xl font-black text-brand-indigo mb-2">Forgot password?</h2>
                  <p className="text-slate-500 font-medium text-sm leading-relaxed">
                    No worries! Enter your work email and we'll send you a link to reset your account.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1">Work Email</label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-300 group-focus-within:text-brand-indigo transition-colors" />
                      <Input
                        required
                        type="email"
                        placeholder="founder@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-slate-50 border-slate-200 h-14 pl-12 rounded-2xl focus:ring-brand-indigo/10 focus:border-brand-indigo/30 transition-all font-semibold"
                      />
                    </div>
                  </div>

                  {error && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="text-red-500 text-xs font-bold text-center"
                    >
                      {error}
                    </motion.p>
                  )}

                  <Button
                    disabled={isLoading}
                    className="w-full bg-brand-indigo hover:bg-brand-indigo/90 text-white h-14 rounded-2xl font-bold shadow-xl shadow-brand-indigo/20 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:grayscale"
                  >
                    {isLoading ? (
                      <Loader2 className="size-5 animate-spin" />
                    ) : (
                      "Send Reset Link"
                    )}
                  </Button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6"
              >
                <div className="size-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mx-auto mb-8 shadow-inner">
                  <CheckCircle2 className="size-10" />
                </div>
                <h2 className="text-2xl font-black text-brand-indigo mb-3">Check your email</h2>
                <p className="text-slate-500 font-medium leading-relaxed mb-10">
                  A reset link has been sent to <span className="text-brand-indigo font-bold">{email}</span>. Please check your inbox and spam folder.
                </p>

                <div className="space-y-4">
                  <Button
                    onClick={handleResend}
                    disabled={resending || cooldown > 0}
                    variant="outline"
                    className="w-full h-14 rounded-2xl border-2 border-slate-100 hover:bg-slate-50 font-bold text-brand-indigo transition-all flex items-center justify-center gap-2"
                  >
                    {resending ? (
                      <Loader2 className="size-5 animate-spin" />
                    ) : (
                      <>
                        <RefreshCw className={`size-4 ${cooldown > 0 ? "opacity-50" : ""}`} />
                        {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend Link"}
                      </>
                    )}
                  </Button>

                  <button
                    onClick={() => setIsSent(false)}
                    className="text-xs font-bold text-slate-400 hover:text-brand-indigo transition-colors"
                  >
                    Try another email
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8 pt-8 border-t border-slate-100 flex justify-center">
            <Link to="/login" className="flex items-center gap-2 text-slate-400 hover:text-brand-indigo transition-all font-bold text-sm tracking-tight group">
              <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
              Back to Login
            </Link>
          </div>
        </motion.div>

        <div className="mt-10 text-center">
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">
            &copy; {new Date().getFullYear()} PitchRoom AI &bull; Smart Fundraising
          </p>
        </div>
      </div>
    </div>
  );
};

const RocketIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-5c1.62-2.2 5-3 5-3" />
    <path d="M12 15v5s3.03-.55 5-2c2.2-1.62 3-5 3-5" />
  </svg>
);

export default ForgotPassword;
