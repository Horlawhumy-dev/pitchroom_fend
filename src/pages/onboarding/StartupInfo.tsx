import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface StartupInfoProps {
  data: {
    name: string;
    industry: string;
    description: string;
  };
  updateData: (data: Partial<StartupInfoProps["data"]>) => void;
}

export const StartupInfo: React.FC<StartupInfoProps> = ({ data, updateData }) => {
  return (
    <div className="space-y-10">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-extrabold mb-4">Tell us about your startup</h1>
        <p className="text-brand-gray/50 text-lg font-medium">
          We'll tailor the AI investor personalities to match your industry and stage.
        </p>
      </div>

      <div className="bg-white rounded-[32px] p-8 md:p-12 border border-brand-indigo/5 shadow-[0_8px_40px_rgba(0,0,0,0.02)] space-y-8">
        <div className="grid gap-8">
          <div className="space-y-3">
            <Label htmlFor="name" className="text-sm font-bold uppercase tracking-widest text-brand-indigo/60">
              Startup Name
            </Label>
            <Input
              id="name"
              placeholder="e.g. Acme AI"
              value={data.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateData({ name: e.target.value })}
              className="h-14 rounded-2xl border-brand-indigo/10 focus:ring-4 focus:ring-brand-indigo/5 transition-all text-lg font-semibold"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="industry" className="text-sm font-bold uppercase tracking-widest text-brand-indigo/60">
              Industry
            </Label>
            <Select 
              value={data.industry} 
              onValueChange={(value) => updateData({ industry: value })}
            >
              <SelectTrigger className="h-14 rounded-2xl border-brand-indigo/10 focus:ring-4 focus:ring-brand-indigo/5 transition-all text-lg font-semibold">
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-brand-indigo/10 shadow-xl">
                <SelectItem value="saas">SaaS</SelectItem>
                <SelectItem value="fintech">Fintech</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="ai">AI / Machine Learning</SelectItem>
                <SelectItem value="ecommerce">E-commerce</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label htmlFor="description" className="text-sm font-bold uppercase tracking-widest text-brand-indigo/60">
                Elevator Pitch (Optional)
              </Label>
              <span className="text-[10px] font-bold text-brand-gray/30 uppercase">Max 280 characters</span>
            </div>
            <Textarea
              id="description"
              placeholder="Briefly describe what your startup does..."
              value={data.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateData({ description: e.target.value })}
              className="min-h-[120px] rounded-2xl border-brand-indigo/10 focus:ring-4 focus:ring-brand-indigo/5 transition-all text-lg font-medium p-4"
              maxLength={280}
            />
          </div>
        </div>
      </div>

      {/* Helper Info */}
      <div className="bg-brand-indigo/[0.02] rounded-3xl p-6 border border-brand-indigo/5 flex items-start gap-4 mx-auto max-w-2xl">
        <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0">
          <div className="w-5 h-5 bg-brand-indigo rounded-md flex items-center justify-center">
            <span className="text-[10px] text-white font-black">AI</span>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-bold mb-1">Personalized AI Panel</h4>
          <p className="text-xs font-medium text-brand-gray/50 leading-relaxed">
            Once you complete these steps, we'll assemble 3 AI investors specializing in <span className="text-brand-indigo font-bold">{data.industry || "your industry"}</span> to review your pitch.
          </p>
        </div>
      </div>
    </div>
  );
};
