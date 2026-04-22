import React from "react";
import { Link } from "react-router-dom";
import { Rocket, User, ChevronLeft, ChevronRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface OnboardingLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  onBack?: () => void;
  onContinue?: () => void;
  continueLabel?: string;
  isNextDisabled?: boolean;
}

export const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({
  children,
  currentStep,
  totalSteps,
  onBack,
  onContinue,
  continueLabel = "Continue",
  isNextDisabled = false,
}) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans antialiased text-brand-indigo flex flex-col">
      {/* Header */}
      <header className="h-20 flex items-center justify-between px-6 md:px-12 bg-white border-b border-brand-indigo/5 sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-brand-indigo rounded-xl flex items-center justify-center shadow-lg shadow-brand-indigo/20">
            <Rocket className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight">PitchRoom</span>
        </Link>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] font-bold text-brand-gray/40 uppercase tracking-widest">Account</p>
            <p className="text-sm font-bold">Alex Rivera</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-brand-amber/20 flex items-center justify-center border-2 border-white shadow-sm overflow-hidden">
            <User className="w-6 h-6 text-brand-amber" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center py-12 px-4 md:py-20">
        <div className="w-full max-w-4xl">
          {/* Progress Indicator */}
          <div className="mb-12">
            <div className="flex justify-between items-end mb-4">
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-indigo/60">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-indigo/60">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <Progress value={progress} className="h-2 bg-brand-indigo/5" />
          </div>

          {/* Content Area */}
          <div className="min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="mt-16 pt-8 border-t border-brand-indigo/5 flex items-center justify-between">
            {onBack ? (
              <Button
                variant="ghost"
                onClick={onBack}
                className="group flex items-center gap-2 text-brand-indigo/60 hover:text-brand-indigo font-bold transition-colors"
                disabled={currentStep === 1}
              >
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back
              </Button>
            ) : <div />}

            {onContinue && (
              <Button
                onClick={onContinue}
                disabled={isNextDisabled}
                className="bg-brand-indigo hover:bg-brand-indigo/90 text-white rounded-xl px-8 h-12 font-bold shadow-xl shadow-brand-indigo/20 flex items-center gap-2 group transition-all"
              >
                {continueLabel}
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            )}
          </div>
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="py-8 text-center">
        <p className="text-[10px] font-bold text-brand-gray/30 uppercase tracking-[0.2em]">
          © {new Date().getFullYear()} PitchRoom Platform. All rights reserved. Secure and encrypted environment.
        </p>
      </footer>
    </div>
  );
};
