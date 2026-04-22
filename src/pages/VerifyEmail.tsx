import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle2, XCircle, Loader2, ArrowRight, Mail, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { authService } from "@/services/auth.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const VerifyEmail = () => {
  const { token } = useParams<{ token: string }>();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");
  const [resendEmail, setResendEmail] = useState("");
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const verificationStarted = useRef(false);

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setStatus("error");
        setMessage("Invalid or missing verification link.");
        return;
      }

      if (verificationStarted.current) return;
      verificationStarted.current = true;

      try {
        const response = await authService.verifyEmail(token);
        setStatus("success");
        const msg = response.message || "Your email has been successfully verified!";
        setMessage(msg);
        toast.success("Verification successful!", {
          description: msg
        });
      } catch (error: any) {
        setStatus("error");
        // If the error message suggests expired or invalid
        const msg = error.message || "Verification failed. The link may be expired or invalid.";
        setMessage(msg);
        toast.error("Verification failed", {
          description: msg
        });
      }
    };

    verify();
  }, [token]);

  useEffect(() => {
    let timer: any;
    if (cooldown > 0) {
      timer = setInterval(() => setCooldown(c => c - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resendEmail || cooldown > 0) return;

    setResending(true);
    try {
      await authService.resendEmail(resendEmail, "verification");
      setCooldown(60);
      toast.success("Verification link sent!", {
        description: "Please check your inbox."
      });
    } catch (err: any) {
      toast.error("Resend failed", {
        description: err.message || "Could not resend verification email."
      });
    } finally {
      setResending(false);
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
          className="bg-white rounded-[32px] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100/60 text-center"
        >
          <AnimatePresence mode="wait">
            {status === "loading" && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-10 flex flex-col items-center"
              >
                <div className="relative">
                  <div className="size-20 rounded-full border-4 border-slate-100"></div>
                  <Loader2 className="size-20 text-brand-indigo animate-spin absolute top-0 left-0" />
                </div>
                <h2 className="text-xl font-bold text-slate-700 mt-8">Verifying your account</h2>
                <p className="text-slate-400 font-medium mt-2 text-sm tracking-wide uppercase">Please wait a moment</p>
              </motion.div>
            )}

            {status === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-6"
              >
                <div className="size-24 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mx-auto mb-8 ring-8 ring-emerald-50/50">
                  <CheckCircle2 className="size-12" />
                </div>
                <h2 className="text-2xl font-black text-brand-indigo mb-3">Email Verified!</h2>
                <p className="text-slate-500 font-medium leading-relaxed mb-10">
                  {message} <br /> You can now complete your onboarding to start practicing.
                </p>
                <Button
                  asChild
                  className="w-full bg-brand-indigo hover:bg-brand-indigo/90 text-white h-14 rounded-2xl font-bold shadow-xl shadow-brand-indigo/10 flex items-center justify-center gap-2 group"
                >
                  <Link to="/login">
                    Go to Login
                    <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </motion.div>
            )}

            {status === "error" && (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-6"
              >
                <div className="size-24 bg-red-50 rounded-full flex items-center justify-center text-red-500 mx-auto mb-8 ring-8 ring-red-50/50">
                  <XCircle className="size-12" />
                </div>
                <h2 className="text-2xl font-black text-brand-indigo mb-3">Verification Failed</h2>
                <p className="text-slate-500 font-medium leading-relaxed mb-8">
                  {message}
                </p>

                <div className="bg-slate-50 rounded-2xl p-6 mb-8 text-left border border-slate-100">
                  <Label htmlFor="resend-email" className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block ml-1">
                    Try resending link
                  </Label>
                  <form onSubmit={handleResend} className="space-y-3">
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-300 group-focus-within:text-brand-indigo transition-colors" />
                      <Input
                        id="resend-email"
                        type="email"
                        placeholder="Enter your work email"
                        value={resendEmail}
                        onChange={(e) => setResendEmail(e.target.value)}
                        required
                        className="h-12 pl-11 rounded-xl border-slate-200 bg-white focus:ring-4 focus:ring-brand-indigo/5 text-sm font-medium"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={resending || cooldown > 0}
                      className="w-full h-12 bg-brand-indigo text-white rounded-xl font-bold text-sm shadow-lg shadow-brand-indigo/10 flex items-center justify-center gap-2"
                    >
                      {resending ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <>
                          <RefreshCw className={`size-4 ${cooldown > 0 ? "opacity-50" : ""}`} />
                          {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend Link"}
                        </>
                      )}
                    </Button>
                  </form>
                </div>

                <div className="space-y-4">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full h-14 rounded-2xl border-2 border-slate-200 font-bold text-slate-600 hover:bg-slate-50"
                  >
                    <Link to="/register">Back to Register</Link>
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="mt-10 text-center">
          <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">
            &copy; {new Date().getFullYear()} PitchRoom AI
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

export default VerifyEmail;
