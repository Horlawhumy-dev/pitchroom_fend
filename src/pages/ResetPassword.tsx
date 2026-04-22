import { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Loader2, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authService } from "@/services/auth.service";
import { toast } from "sonner";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setError("Invalid or missing reset token.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await authService.resetPassword(token, password);
      setIsSuccess(true);
      toast.success("Password reset successful!", {
        description: "Your account is now secure. Redirecting to login..."
      });
      setTimeout(() => navigate("/login"), 3000);
    } catch (err: any) {
      const msg = err.message || "Failed to reset password. The link may be expired.";
      setError(msg);
      toast.error("Reset failed", {
        description: msg
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-indigo/[0.03] via-transparent to-transparent">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="size-16 bg-brand-indigo rounded-2xl flex items-center justify-center text-white shadow-xl shadow-brand-indigo/20 mx-auto mb-6">
            <RocketIcon className="size-10" />
          </div>
          <h1 className="text-3xl font-black text-brand-indigo tracking-tight">PitchRoom</h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[32px] p-10 shadow-[0_20px_50px_rgba(30,27,75,0.04)] border border-slate-100/60"
        >
          {isSuccess ? (
            <div className="text-center py-6">
              <div className="size-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mx-auto mb-8 shadow-inner">
                <CheckCircle2 className="size-10" />
              </div>
              <h2 className="text-2xl font-black text-brand-indigo mb-3">Password Reset!</h2>
              <p className="text-slate-500 font-medium leading-relaxed mb-6">
                Your password has been successfully updated. Redirecting you to login...
              </p>
              <Button asChild variant="link" className="text-brand-indigo font-bold">
                <Link to="/login">Click here if not redirected</Link>
              </Button>
            </div>
          ) : (
            <div>
              <div className="mb-8 ">
                <h2 className="text-2xl font-black text-brand-indigo mb-2">Setup new password</h2>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">
                  Please choose a strong password that you haven't used before.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1">New Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-300 group-focus-within:text-brand-indigo transition-colors" />
                    <Input
                      required
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-slate-50 border-slate-200 h-14 pl-12 pr-12 rounded-2xl focus:ring-brand-indigo/10 focus:border-brand-indigo/30 transition-all font-semibold"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-brand-indigo transition-colors"
                    >
                      {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1">Confirm Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-300 group-focus-within:text-brand-indigo transition-colors" />
                    <Input
                      required
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="bg-slate-50 border-slate-200 h-14 pl-12 rounded-2xl focus:ring-brand-indigo/10 focus:border-brand-indigo/30 transition-all font-semibold"
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-red-500 text-xs font-bold text-center">
                    {error}
                  </p>
                )}

                <Button
                  disabled={isLoading || !token}
                  className="w-full bg-brand-indigo hover:bg-brand-indigo/90 text-white h-14 rounded-2xl font-bold shadow-xl shadow-brand-indigo/20 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:grayscale"
                >
                  {isLoading ? (
                    <Loader2 className="size-5 animate-spin" />
                  ) : (
                    "Reset Password"
                  )}
                </Button>
              </form>
            </div>
          )}
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

export default ResetPassword;
