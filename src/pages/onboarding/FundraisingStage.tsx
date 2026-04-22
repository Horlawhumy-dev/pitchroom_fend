import React from "react";
import { cn } from "@/lib/utils";
import { Lightbulb, Rocket, BarChart3, Building2, Check } from "lucide-react";

interface FundraisingStageProps {
  selectedStage: string;
  onSelect: (stage: string) => void;
}

const stages = [
  {
    id: "pre-seed",
    title: "Pre-seed",
    description: "Focus on early-stage ideation, market research, and building your MVP.",
    icon: Lightbulb,
    color: "bg-amber-500",
  },
  {
    id: "seed",
    title: "Seed",
    description: "Initial market traction, early revenue, and refining product-market fit.",
    icon: Building2,
    color: "bg-blue-500",
  },
  {
    id: "series-a",
    title: "Series A",
    description: "Scaling user base, optimizing operations, and expanding market reach.",
    icon: Rocket,
    color: "bg-indigo-500",
  },
  {
    id: "series-b",
    title: "Series B+",
    description: "Late-stage growth, international expansion, and preparation for exit or IPO.",
    icon: BarChart3,
    color: "bg-emerald-500",
  },
];

export const FundraisingStage: React.FC<FundraisingStageProps> = ({ selectedStage, onSelect }) => {
  return (
    <div className="space-y-10">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-extrabold mb-4">What is your current fundraising stage?</h1>
        <p className="text-brand-gray/50 text-lg font-medium">
          Select the stage that best describes your startup's current position and capital requirements.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {stages.map((stage) => {
          const Icon = stage.icon;
          const isSelected = selectedStage === stage.id;
          
          return (
            <button
              key={stage.id}
              onClick={() => onSelect(stage.id)}
              className={cn(
                "relative flex flex-col items-start p-8 rounded-[32px] border-2 text-left transition-all duration-300 group",
                isSelected 
                  ? "border-brand-indigo bg-brand-indigo/[0.02] shadow-xl shadow-brand-indigo/5" 
                  : "border-brand-indigo/5 bg-white hover:border-brand-indigo/20 hover:shadow-lg"
              )}
            >
              <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110",
                isSelected ? stage.color : "bg-brand-gray/5"
              )}>
                <Icon className={cn("w-6 h-6", isSelected ? "text-white" : "text-brand-gray/40")} />
              </div>
              
              <h3 className={cn("text-xl font-bold mb-2", isSelected ? "text-brand-indigo" : "text-brand-indigo/80")}>
                {stage.title}
              </h3>
              <p className="text-sm font-medium text-brand-gray/50 leading-relaxed">
                {stage.description}
              </p>

              {isSelected && (
                <div className="absolute top-6 right-6 w-6 h-6 bg-brand-indigo rounded-full flex items-center justify-center shadow-lg shadow-brand-indigo/20">
                  <Check className="w-3.5 h-3.5 text-white" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
