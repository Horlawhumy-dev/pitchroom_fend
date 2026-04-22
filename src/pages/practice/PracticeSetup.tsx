import React, { useState, useRef } from "react";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { 
  Timer, 
  Brain, 
  Users, 
  Video, 
  Lightbulb,
  Check,
  ShieldCheck,
  Zap,
  Loader2, 
  Upload, 
  FileText
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { pitchService } from "@/services/pitch.service";
import { Textarea } from "@/components/ui/textarea";

const PracticeSetup = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [context, setContext] = useState("");
  const [sentiment, setSentiment] = useState("Neutral");
  const [length, setLength] = useState("5");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleStartSession = async () => {
    if (!file) {
      setError("Please upload a pitch deck first.");
      return;
    }
    if (!context) {
      setError("Please provide some business context.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await pitchService.uploadDeck(
        file, 
        context, 
        sentiment.toLowerCase() === "skeptical" ? "interrogation" : "practice"
      );
      navigate(`/practice/session?sessionId=${response.data?.session}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-brand-indigo tracking-tight">Setup Your Pitch</h1>
          <p className="text-slate-500 font-medium text-lg">Configure your AI session before you hit record.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            {/* File Upload */}
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <FileText className="size-5 text-brand-indigo" />
                <h2 className="text-xl font-bold text-brand-indigo">Upload Pitch Deck</h2>
              </div>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                  "border-2 border-dashed rounded-[32px] p-10 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all",
                  file ? "border-brand-indigo bg-brand-indigo/[0.02]" : "border-slate-200 hover:border-brand-indigo/30 hover:bg-slate-50"
                )}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept=".pdf" 
                  className="hidden" 
                />
                <div className={cn(
                  "size-16 rounded-2xl flex items-center justify-center text-white shadow-xl transition-all",
                  file ? "bg-brand-indigo animate-bounce-short" : "bg-slate-100 text-slate-400 group-hover:bg-brand-indigo"
                )}>
                  {file ? <Check className="size-8" /> : <Upload className="size-8" />}
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-brand-indigo">
                    {file ? file.name : "Click to upload pitch deck"}
                  </p>
                  <p className="text-sm text-slate-400 font-medium mt-1">
                    {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : "Support for PDF (max 5MB)"}
                  </p>
                </div>
              </div>
            </section>

            {/* Business Context */}
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <Zap className="size-5 text-brand-indigo" />
                <h2 className="text-xl font-bold text-brand-indigo">Business Context</h2>
              </div>
              <Textarea 
                placeholder="Briefly describe your startup, business model, and what you're looking for from investors..."
                value={context}
                onChange={(e) => setContext(e.target.value)}
                className="min-h-[120px] rounded-3xl border-slate-200 focus:ring-4 focus:ring-brand-indigo/5 transition-all text-sm font-medium p-6"
              />
            </section>

            {/* Pitch Length */}
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <Timer className="size-5 text-brand-indigo" />
                <h2 className="text-xl font-bold text-brand-indigo">Pitch Length</h2>
              </div>
              <div className="flex p-1.5 bg-slate-100 rounded-[20px] ring-1 ring-slate-200/50">
                <LengthOption label="3 Mins" value="3" active={length === "3"} onClick={() => setLength("3")} />
                <LengthOption label="5 Mins" value="5" active={length === "5"} onClick={() => setLength("5")} />
                <LengthOption label="10 Mins" value="10" active={length === "10"} onClick={() => setLength("10")} />
              </div>
            </section>

            {/* Investor Sentiment */}
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <Brain className="size-5 text-brand-indigo" />
                <h2 className="text-xl font-bold text-brand-indigo">Investor Sentiment</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <SentimentCard 
                  title="Friendly" 
                  desc="Nods often, asks clarifying questions, supportive vibe." 
                  icon="😊"
                  active={sentiment === "Friendly"}
                  onClick={() => setSentiment("Friendly")}
                />
                <SentimentCard 
                  title="Neutral" 
                  desc="Poker face, asks about metrics, standard experience." 
                  icon="😐"
                  active={sentiment === "Neutral"}
                  onClick={() => setSentiment("Neutral")}
                />
                <SentimentCard 
                  title="Skeptical" 
                  desc="Interrupts with 'why', focuses on risks and competition." 
                  icon="🤨"
                  active={sentiment === "Skeptical"}
                  onClick={() => setSentiment("Skeptical")}
                />
              </div>
            </section>

            {/* Personalities */}
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <Users className="size-5 text-brand-indigo" />
                <h2 className="text-xl font-bold text-brand-indigo">Choose Personalities</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <PersonalityItem title="The Angel" desc="Visionary, looks for passion." active />
                <PersonalityItem title="The VC" desc="Focused on scale & TAM." />
                <PersonalityItem title="Technical Partner" desc="Deep dive into stack & IP." />
              </div>
            </section>

             {error && (
              <p className="text-red-500 text-sm font-bold bg-red-50 p-4 rounded-xl border border-red-100 italic">
                {error}
              </p>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-4 pt-6">
              <Button 
                onClick={handleStartSession}
                disabled={loading}
                size="lg" 
                className="flex-1 bg-brand-indigo hover:bg-brand-indigo/90 text-white py-8 rounded-2xl font-bold text-xl shadow-xl shadow-brand-indigo/20 flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-70"
              >
                {loading ? (
                  <Loader2 className="size-6 animate-spin" />
                ) : (
                  <>
                    <Video className="size-6" />
                    Start Pitch Session
                  </>
                )}
              </Button>
              <Button variant="outline" className="px-10 py-8 rounded-2xl border-2 border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-all">
                Quick Test
              </Button>
            </div>
          </div>

          {/* Right Column - Tips & Advanced */}
          <div className="space-y-8">
            <Card className="bg-gradient-to-br from-brand-indigo to-indigo-900 text-white rounded-[24px] border-none shadow-xl relative overflow-hidden">
               <div className="absolute -right-4 -bottom-4 size-24 bg-white/10 rounded-full blur-2xl" />
               <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg font-bold">
                    <Lightbulb className="size-5 text-amber-400 fill-amber-400" />
                    Founder Tip
                  </CardTitle>
               </CardHeader>
               <CardContent>
                  <p className="text-sm text-indigo-100 leading-relaxed">
                    Most Series A pitches are actually only 15-20 minutes with slides. Practicing your "Elevator Pitch" in 3 minutes is the best way to sharpen your core message.
                  </p>
               </CardContent>
            </Card>

            <Card className="rounded-[24px] border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100">
                <CardTitle className="text-sm font-bold text-brand-indigo uppercase tracking-widest">Advanced Setup</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <AdvancedToggle 
                  icon={<Video className="size-4 text-brand-indigo" />} 
                  title="Video Recording" 
                  desc="Record camera for AI gesture analysis" 
                />
                <AdvancedToggle 
                  icon={<ShieldCheck className="size-4 text-brand-indigo" />} 
                  title="Strict Evaluation" 
                  desc="AI will be more critical of your data" 
                />
                <AdvancedToggle 
                  icon={<Zap className="size-4 text-brand-indigo" />} 
                  title="Real-time Hints" 
                  desc="Get AI prompts when you stumble" 
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

const LengthOption = ({ label, active, ...props }: any) => (
  <button className={cn(
    "flex-1 py-3.5 px-6 rounded-[14px] text-sm font-bold transition-all duration-300",
    active ? "bg-white text-brand-indigo shadow-md shadow-slate-200/50" : "text-slate-500 hover:text-brand-indigo"
  )} {...props}>
    {label}
  </button>
);

const SentimentCard = ({ title, desc, icon, active, ...props }: any) => (
  <div 
    {...props}
    className={cn(
    "relative flex flex-col p-5 rounded-[22px] border-2 transition-all duration-300 cursor-pointer group",
    active 
      ? "border-brand-indigo bg-brand-indigo/[0.02] shadow-lg shadow-brand-indigo/5" 
      : "border-slate-100 bg-white hover:border-slate-200 hover:shadow-md"
  )}>
    <div className="flex items-center justify-between mb-3">
      <span className="text-2xl">{icon}</span>
      <div className={cn(
        "size-5 rounded-full border-2 flex items-center justify-center transition-all",
        active ? "border-brand-indigo bg-brand-indigo" : "border-slate-200"
      )}>
        {active && <Check className="size-3 text-white" />}
      </div>
    </div>
    <p className="font-bold text-brand-indigo">{title}</p>
    <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed font-medium">{desc}</p>
  </div>
);

const PersonalityItem = ({ title, desc, active }: any) => (
  <Card className={cn(
    "p-5 rounded-[22px] border transition-all cursor-pointer group hover:shadow-md",
    active ? "border-brand-indigo/20 bg-brand-indigo/[0.01]" : "border-slate-100"
  )}>
    <div className="flex items-center gap-4">
      <Checkbox checked={active} className="rounded-md border-slate-200 data-[state=checked]:bg-brand-indigo data-[state=checked]:border-brand-indigo shadow-sm" />
      <div>
        <p className="text-sm font-bold text-brand-indigo">{title}</p>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">{desc}</p>
      </div>
    </div>
  </Card>
);

const AdvancedToggle = ({ icon, title, desc }: any) => (
  <div className="flex items-center justify-between group">
    <div className="flex items-center gap-4">
      <div className="size-9 rounded-xl bg-slate-100 flex items-center justify-center text-brand-indigo group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div>
        <p className="text-xs font-bold text-brand-indigo">{title}</p>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{desc}</p>
      </div>
    </div>
    <div className="w-10 h-5 bg-brand-indigo rounded-full relative p-0.5 cursor-pointer">
      <div className="absolute right-0.5 top-0.5 size-4 bg-white rounded-full shadow-sm" />
    </div>
  </div>
);

export default PracticeSetup;
