import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Sparkles, Globe, Shield } from "lucide-react";
import {  } from "@/components/ui/button";

interface OnboardingSuccessProps {
  startupName: string;
}

export const OnboardingSuccess: React.FC<OnboardingSuccessProps> = ({ startupName }) => {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-4">
      {/* Celebration Animation */}
      <div className="relative mb-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 12, stiffness: 200 }}
          className="w-32 h-32 bg-brand-green/10 rounded-full flex items-center justify-center relative z-10"
        >
          <CheckCircle2 className="w-16 h-16 text-brand-green" />
        </motion.div>
        
        {/* Floating elements */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-4 -right-4 w-10 h-10 bg-brand-blue/10 rounded-xl flex items-center justify-center"
        >
          <Sparkles className="w-5 h-5 text-brand-blue" />
        </motion.div>

        <motion.div
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -10, 0]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-4 -left-4 w-12 h-12 bg-brand-amber/10 rounded-2xl flex items-center justify-center"
        >
          <Globe className="w-6 h-6 text-brand-amber" />
        </motion.div>
      </div>

      <div className="text-center max-w-xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-4xl font-extrabold mb-3">You're all set!</h1>
          <p className="text-xl font-bold text-brand-indigo/80">
            Welcome to PitchRoom, <span className="text-brand-blue">{startupName}</span>.
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-brand-gray/50 text-lg font-medium leading-relaxed"
        >
          Your personalized AI investor panel is being assembled. In the meantime, you can explore the dashboard and start preparing your first pitch.
        </motion.p>
      </div>

      {/* Security/Trust badges */}
      <div className="mt-16 flex items-center gap-8 py-4 px-8 bg-white rounded-2xl border border-brand-indigo/5 shadow-sm">
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-indigo/40">
           <Shield className="w-4 h-4" />
           Secure & Private
        </div>
        <div className="w-[1px] h-4 bg-brand-indigo/10" />
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-indigo/40">
           <CheckCircle2 className="w-4 h-4" />
           Founder Verified
        </div>
      </div>
    </div>
  );
};
