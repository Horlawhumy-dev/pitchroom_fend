import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { OnboardingLayout } from "@/layouts/OnboardingLayout";
import { StartupInfo } from "./onboarding/StartupInfo";
import { FundraisingStage } from "./onboarding/FundraisingStage";
import { PitchGoals } from "./onboarding/PitchGoals";
import { OnboardingSuccess } from "./onboarding/OnboardingSuccess";
import { authService } from "@/services/auth.service";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export const Onboarding = () => {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalSteps = 4;

  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    description: "",
    fundraisingStage: "",
    goals: [] as string[],
  });

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleToggleGoal = (goalId: string) => {
    setFormData((prev) => {
      const goals = prev.goals.includes(goalId)
        ? prev.goals.filter((id) => id !== goalId)
        : [...prev.goals, goalId];
      return { ...prev, goals };
    });
  };

  const handleNext = async () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      setIsSubmitting(true);
      try {
        await authService.completeOnboarding(formData);
        refreshUser();
        toast.success("Onboarding completed!", {
          description: "Welcome to PitchRoom dashboard."
        });
        navigate("/dashboard");
      } catch (error: any) {
        toast.error("Failed to save onboarding data", {
          description: error.message || "Please try again."
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const isStep1Valid = formData.name.trim() !== "" && formData.industry !== "";
  const isStep2Valid = formData.fundraisingStage !== "";
  const isStep3Valid = formData.goals.length >= 1;

  const isNextDisabled = 
    (step === 1 && !isStep1Valid) ||
    (step === 2 && !isStep2Valid) ||
    (step === 3 && !isStep3Valid);

  const getContinueLabel = () => {
    if (step === totalSteps) return "Go to Dashboard";
    if (step === 1) return `Continue to ${"Fundraising Stage"}`;
    if (step === 2) return `Continue to ${"Primary Goals"}`;
    return "Continue";
  };

  return (
    <OnboardingLayout
      currentStep={step}
      totalSteps={totalSteps}
      onBack={step > 1 && step < totalSteps ? handleBack : undefined}
      onContinue={handleNext}
      continueLabel={getContinueLabel()}
      isNextDisabled={isNextDisabled || isSubmitting}
    >
      {step === 1 && (
        <StartupInfo 
          data={{ name: formData.name, industry: formData.industry, description: formData.description }} 
          updateData={updateFormData} 
        />
      )}
      {step === 2 && (
        <FundraisingStage 
          selectedStage={formData.fundraisingStage} 
          onSelect={(stage) => updateFormData({ fundraisingStage: stage })} 
        />
      )}
      {step === 3 && (
        <PitchGoals 
          selectedGoals={formData.goals} 
          onToggleGoal={handleToggleGoal} 
        />
      )}
      {step === 4 && (
        <OnboardingSuccess startupName={formData.name} />
      )}
    </OnboardingLayout>
  );
};

export default Onboarding;
