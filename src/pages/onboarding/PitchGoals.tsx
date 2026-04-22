import React from "react";
import { cn } from "@/lib/utils";
import { BookOpen, HelpCircle, Shield, TrendingUp, Users, Handshake, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PitchGoalsProps {
  selectedGoals: string[];
  onToggleGoal: (goalId: string) => void;
}

const goals = [
  {
    id: "storytelling",
    title: "Improve storytelling",
    description: "Craft a compelling narrative that resonates with investors.",
    icon: BookOpen,
  },
  {
    id: "investor-questions",
    title: "Handle tough questions",
    description: "Master the Q&A session with data-backed confidence.",
    icon: HelpCircle,
  },
  {
    id: "confidence",
    title: "Confidence building",
    description: "Project authority and vision in every meeting.",
    icon: Shield,
  },
  {
    id: "modeling",
    title: "Financial modeling",
    description: "Build robust projections that withstand scrutiny.",
    icon: TrendingUp,
  },
  {
    id: "networking",
    title: "Network expansion",
    description: "Get introductions to top-tier VCs and angels.",
    icon: Users,
  },
  {
    id: "negotiation",
    title: "Term sheet negotiation",
    description: "Navigate complex deal structures with ease.",
    icon: Handshake,
  },
];

const suggestedTags = ["Venture Capital", "Series A", "Demo Day", "Public Speaking"];

export const PitchGoals: React.FC<PitchGoalsProps> = ({ selectedGoals, onToggleGoal }) => {
  return (
    <div className="space-y-10">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-extrabold mb-4">What are your primary goals?</h1>
        <p className="text-brand-gray/50 text-lg font-medium">
          Select 3-4 areas where you want to excel during your fundraise.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {goals.map((goal) => {
          const Icon = goal.icon;
          const isSelected = selectedGoals.includes(goal.id);
          
          return (
            <button
              key={goal.id}
              onClick={() => onToggleGoal(goal.id)}
              className={cn(
                "relative flex flex-col items-start p-6 rounded-[24px] border-2 text-left transition-all duration-300 group",
                isSelected 
                  ? "border-brand-indigo bg-brand-indigo/[0.02] shadow-xl shadow-brand-indigo/5" 
                  : "border-brand-indigo/5 bg-white hover:border-brand-indigo/20 hover:shadow-lg"
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110",
                isSelected ? "bg-brand-indigo" : "bg-brand-gray/5"
              )}>
                <Icon className={cn("w-5 h-5", isSelected ? "text-white" : "text-brand-gray/40")} />
              </div>
              
              <h3 className={cn("text-base font-bold mb-1", isSelected ? "text-brand-indigo" : "text-brand-indigo/80")}>
                {goal.title}
              </h3>
              <p className="text-xs font-medium text-brand-gray/40 leading-relaxed line-clamp-2">
                {goal.description}
              </p>

              {isSelected && (
                <div className="absolute top-4 right-4 w-5 h-5 bg-brand-indigo rounded-full flex items-center justify-center shadow-lg shadow-brand-indigo/20">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Suggested Tags */}
      <div className="max-w-xl mx-auto pt-8 border-t border-brand-indigo/5">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-indigo/40 mb-4">
          Suggested Tags
        </p>
        <div className="flex flex-wrap gap-2">
          {suggestedTags.map((tag) => (
            <Badge 
              key={tag} 
              variant="outline" 
              className="px-4 py-1.5 rounded-full border-brand-indigo/10 text-brand-indigo/60 font-bold hover:bg-brand-indigo hover:text-white transition-colors cursor-pointer"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};
