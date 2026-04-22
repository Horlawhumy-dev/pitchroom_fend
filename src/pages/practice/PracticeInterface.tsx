import { useState, useEffect } from "react";
import { 
  Rocket, 
  SkipBack, 
  SkipForward, 
  StopCircle,
  Brain,
  Send,
  User,
  Loader2,
  Mic,
  Monitor,
  Settings2,
  Maximize2,
  MessageSquare,
  History
} from "lucide-react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePitchSimulator } from "@/hooks/usePitchSimulator";
import { pitchService } from "@/services/pitch.service";

const PracticeInterface = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("sessionId") || searchParams.get("session");
  const { 
    isRecording, 
    transcript, 
    aiResponses, 
    isProcessing, 
    startRecording, 
    stopRecording 
  } = usePitchSimulator(sessionId);

  const [time, setTime] = useState(0);
  const [showTranscript, setShowTranscript] = useState(true);
  const [activePane, setActivePane] = useState<'transcript' | 'insights'>('transcript');
  const [isFinishing, setIsFinishing] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isRecording) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndSession = async () => {
    if (sessionId) {
      setIsFinishing(true);
      try {
        await pitchService.finishSession(sessionId);
        // Navigate to the specific report after analysis
        navigate(`/reports`);
      } catch (err) {
        console.error("Failed to finish session:", err);
        navigate(`/reports`);
      } finally {
        setIsFinishing(false);
      }
    }
  };

  if (isFinishing) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#05060B] text-white">
        <div className="relative mb-12">
            <div className="absolute inset-0 bg-brand-indigo/20 blur-3xl animate-pulse" />
            <Brain className="size-20 text-brand-indigo animate-bounce relative z-10" />
        </div>
        <h2 className="text-3xl font-black tracking-tight mb-4">Generating Your Report...</h2>
        <p className="text-slate-400 font-medium text-lg max-w-md text-center leading-relaxed">
           Our AI investor analyst is reviewing your pitch performance and calculating your readiness scores.
        </p>
        <div className="mt-12 flex items-center gap-2">
            <Loader2 className="size-5 text-brand-indigo animate-spin" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Deep Analysis in Progress</span>
        </div>
      </div>
    );
  }

  if (!sessionId) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#05060B] text-white">
        <Rocket className="size-12 text-brand-indigo animate-bounce mb-6" />
        <p className="text-xl font-bold tracking-tight text-slate-300">No active session found.</p>
        <Button 
          variant="link" 
          onClick={() => navigate('/dashboard')}
          className="text-brand-indigo mt-4 font-bold"
        >
          Return to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#05060B] text-white overflow-hidden font-sans selection:bg-brand-indigo/30 select-none">
      {/* HUD - Floating Top Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 pointer-events-none">
        <div className="flex items-center gap-6 pointer-events-auto">
          <Link to="/dashboard" className="flex items-center gap-3 group transition-all">
            <div className="size-11 rounded-2xl bg-brand-indigo flex items-center justify-center text-white shadow-[0_0_30px_rgba(79,70,229,0.3)] group-hover:scale-110 transition-transform duration-500">
              <Rocket className="size-6" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-black tracking-tighter text-white uppercase italic">Pitch<span className="text-brand-indigo">Room</span></h1>
              <div className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Live Session</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-4 pointer-events-auto">
          <HUDCard icon={<History className="size-4" />} label="Elapsed" value={formatTime(time)} />
          <HUDCard 
            icon={<TargetIcon className="size-4" />} 
            label="Stage" 
            value="Seed Round" 
            accent 
          />
        </div>

        <div className="flex items-center gap-3 pointer-events-auto">
           <ToolbarButton hov="Settings"><Settings2 className="size-5" /></ToolbarButton>
           <ToolbarButton hov="Expand"><Maximize2 className="size-5" /></ToolbarButton>
        </div>
      </nav>

      {/* Main Workspace */}
      <div className="relative h-screen flex">
        
        {/* SIDE PANES - Left: History & Insights */}
        <aside className={cn(
          "w-96 bg-black/40 backdrop-blur-3xl border-r border-white/5 transition-all duration-700 ease-in-out relative z-40 flex flex-col",
          !showTranscript && "-translate-x-full opacity-0"
        )}>
           <div className="p-8 pb-4 flex items-center justify-between mt-20">
              <div className="flex gap-4">
                 <button 
                  onClick={() => setActivePane('transcript')}
                  className={cn(
                    "text-[10px] font-black uppercase tracking-[0.2em] transition-colors",
                    activePane === 'transcript' ? "text-brand-indigo" : "text-slate-500 hover:text-slate-300"
                  )}
                 >
                    Transcript
                 </button>
                 <button 
                  onClick={() => setActivePane('insights')}
                  className={cn(
                    "text-[10px] font-black uppercase tracking-[0.2em] transition-colors",
                    activePane === 'insights' ? "text-brand-indigo" : "text-slate-500 hover:text-slate-300"
                  )}
                 >
                    AI Chat
                 </button>
              </div>
           </div>

           <div className="flex-1 overflow-y-auto px-8 py-4 custom-scrollbar space-y-8 pb-32">
              <AnimatePresence mode="wait">
                {activePane === 'transcript' ? (
                  <motion.div 
                    key="transcript"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-6"
                  >
                    {transcript.length === 0 ? (
                      <div className="py-20 text-center space-y-4 opacity-20">
                        <Mic className="size-8 mx-auto" />
                        <p className="text-[10px] font-black uppercase tracking-widest">Awaiting Audio...</p>
                      </div>
                    ) : (
                      transcript.map((text, i) => (
                        <TranscriptItem key={i} text={text} isLast={i === transcript.length - 1} />
                      ))
                    )}
                  </motion.div>
                ) : (
                  <motion.div 
                    key="insights"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-6"
                  >
                     {aiResponses.length === 0 ? (
                      <div className="py-20 text-center space-y-4 opacity-20">
                        <Brain className="size-8 mx-auto" />
                        <p className="text-[10px] font-black uppercase tracking-widest">No Feedback Yet</p>
                      </div>
                    ) : (
                      aiResponses.map((res, i) => (
                        <InsightBubble key={i} text={res.text} time={res.time} />
                      ))
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
           </div>

           {/* Quick Note Input */}
           <div className="absolute bottom-10 left-8 right-8">
              <div className="relative group">
                <input 
                  type="text" 
                  placeholder="Ask AI or take a note..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-5 pr-12 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-indigo/50 focus:bg-white/10 transition-all placeholder:text-slate-600"
                />
                <button className="absolute right-2 top-2 bottom-2 aspect-square bg-brand-indigo rounded-xl flex items-center justify-center shadow-lg shadow-brand-indigo/20 hover:scale-105 active:scale-95 transition-all">
                  <Send className="size-3" />
                </button>
              </div>
           </div>
        </aside>

        {/* CENTER STAGE */}
        <div className="flex-1 relative flex flex-col items-center justify-center p-8 z-30">
          
          {/* BACKGROUND DECORATION */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-indigo/5 rounded-full blur-[120px]" />
             <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-brand-indigo/10 rounded-full blur-[100px]" />
          </div>

          <AnimatePresence mode="wait">
            {!isRecording && time === 0 ? (
              <motion.div 
                key="start"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="text-center z-10"
              >
                <div className="size-32 bg-brand-indigo/10 rounded-[48px] border border-brand-indigo/20 flex items-center justify-center mb-8 mx-auto shadow-2xl shadow-brand-indigo/10">
                   <Monitor className="size-12 text-brand-indigo" />
                </div>
                <h2 className="text-5xl font-black tracking-tight mb-4 text-white">Start Your Pitch</h2>
                <p className="text-slate-400 font-medium text-lg max-w-lg mx-auto leading-relaxed">
                  The VC is ready to listen. Your objective is to convince them of your market-product fit.
                </p>
                <Button 
                  onClick={startRecording}
                  size="lg" 
                  className="mt-12 bg-white text-brand-indigo hover:bg-slate-100 px-12 py-8 rounded-[24px] font-black text-xl shadow-2xl shadow-white/10 hover:translate-y-[-4px] transition-all"
                >
                  Go Live Now
                </Button>
              </motion.div>
            ) : (
              <motion.div 
                key="active"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full max-w-5xl flex flex-col items-center"
              >
                {/* INVESTOR VIEWPORT */}
                <div className="relative group mb-12 transform hover:scale-[1.01] transition-transform duration-700">
                   <div className="absolute -inset-1 bg-gradient-to-r from-brand-indigo components-indigo-400 rounded-[42px] blur opacity-25 group-hover:opacity-40 transition-opacity duration-1000" />
                   <div className="relative aspect-video w-[640px] bg-[#0A0C14] border border-white/10 rounded-[40px] overflow-hidden shadow-2xl ring-1 ring-white/5">
                     <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
                     
                     {/* Investor Avatar Content */}
                     <div className="w-full h-full flex items-center justify-center relative">
                        <div className="absolute inset-0 flex items-center justify-center opacity-40">
                          <PulseVisualizer isRecording={isRecording} />
                        </div>
                        <div className="size-48 rounded-[60px] bg-white/5 border border-white/10 backdrop-blur-3xl p-6 relative z-10 overflow-hidden group">
                           <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/40 to-transparent" />
                           <div className="w-full h-full bg-slate-800 rounded-[40px] flex items-center justify-center shadow-inner">
                              <User className="size-20 text-slate-500 fill-slate-500/20" />
                           </div>
                        </div>
                        
                        {/* Live Tags */}
                        <div className="absolute top-8 left-8 flex items-center gap-3">
                           <Badge className="bg-emerald-500 text-white border-none font-black text-[10px] px-3 py-1.5 rounded-xl uppercase tracking-[0.1em] shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                             VC Listening
                           </Badge>
                           <div className="flex gap-1.5">
                              {[1, 2, 3].map(i => (
                                <span key={i} className="size-1.5 rounded-full bg-brand-indigo/40" />
                              ))}
                           </div>
                        </div>

                        <div className="absolute bottom-8 left-8 right-8">
                           <h4 className="text-xl font-bold text-white mb-1">Skeptical VC</h4>
                           <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Identity Verified Investor • Menlo Park, CA</p>
                        </div>
                     </div>
                   </div>
                </div>

                {/* VISUALIZER & DYNAMIC CONTENT */}
                <div className="w-full max-w-2xl text-center">
                   <div className="flex justify-center gap-1.5 h-12 items-center mb-8">
                      {[...Array(32)].map((_, i) => (
                        <WaveBar key={i} index={i} isRecording={isRecording} />
                      ))}
                   </div>
                   
                   <AnimatePresence mode="wait">
                    {isProcessing ? (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-6 bg-brand-indigo/5 border border-brand-indigo/10 rounded-[28px] backdrop-blur-3xl inline-flex items-center gap-4 shadow-2xl"
                      >
                         <div className="size-10 rounded-full bg-brand-indigo/10 flex items-center justify-center">
                            <Loader2 className="size-5 text-brand-indigo animate-spin" />
                         </div>
                         <p className="text-brand-indigo font-bold tracking-tight text-lg italic">
                           Investor is formulating a tough question...
                         </p>
                      </motion.div>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                         <h3 className="text-2xl font-black tracking-tight text-slate-200">
                           {isRecording ? "Keep Pitching..." : "Paused Session"}
                         </h3>
                         <p className="text-slate-500 font-medium">
                           Focus on explaining your unique value proposition clearly.
                         </p>
                      </motion.div>
                    )}
                   </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* FLOAT CONTROL BAR */}
      <footer className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4">
        <div className="bg-[#1A1C25]/80 backdrop-blur-2xl px-6 py-4 rounded-[32px] border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] flex items-center gap-6 ring-1 ring-white/5">
          <button 
            onClick={() => setShowTranscript(!showTranscript)}
            className={cn(
               "size-12 rounded-2xl flex items-center justify-center transition-all",
               showTranscript ? "bg-white/10 text-white shadow-inner" : "text-slate-500 hover:text-white"
            )}
          >
             <MessageSquare className="size-5" />
          </button>
          
          <div className="w-px h-8 bg-white/10 mx-2" />

          <ControlBtn icon={<SkipBack className="size-5" />} />
          
          <button 
            onClick={isRecording ? stopRecording : startRecording}
            className={cn(
              "size-16 rounded-[24px] text-white flex items-center justify-center transition-all shadow-[0_0_40px_rgba(79,70,229,0.4)] hover:scale-105 active:scale-95 group relative",
              isRecording ? "bg-red-500 shadow-red-500/20" : "bg-brand-indigo"
            )}
          >
            {isRecording && <span className="absolute -top-1 -right-1 size-3 bg-white rounded-full animate-ping" />}
            {isRecording ? <StopCircle className="size-7 fill-white" /> : <Mic className="size-7 fill-white" />}
          </button>

          <ControlBtn icon={<SkipForward className="size-5" />} onClick={() => navigate('/reports')} />
          
          <div className="w-px h-8 bg-white/10 mx-2" />

          <button 
            onClick={handleEndSession}
            className="px-6 py-3 bg-red-500/10 text-red-500 border border-red-500/20 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all shadow-xl shadow-red-500/5 active:scale-95"
          >
            Finish
          </button>
        </div>

        {/* Floating Slide Indicator */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-4 px-6 py-3 bg-black/60 backdrop-blur-xl rounded-full border border-white/10 whitespace-nowrap shadow-2xl ring-1 ring-white/5 overflow-hidden">
           <SlideIndicator label="Problem" completed />
           <SlideIndicator label="Solution" completed />
           <SlideIndicator label="Market" active />
           <SlideIndicator label="Team" />
           <SlideIndicator label="Ask" />
        </div>
      </footer>
    </div>
  );
};

const HUDCard = ({ icon, label, value, accent }: any) => (
  <div className={cn(
    "flex items-center gap-4 bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-2xl ring-1 shadow-2xl transition-all hover:bg-white/10",
    accent ? "ring-brand-indigo/30 shadow-brand-indigo/10" : "ring-white/5"
  )}>
    <div className={cn("size-8 rounded-xl flex items-center justify-center shadow-lg", accent ? "bg-brand-indigo/20 text-brand-indigo shadow-brand-indigo/20" : "bg-white/5 text-slate-400")}>
       {icon}
    </div>
    <div className="min-w-[60px]">
       <p className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 leading-tight">{label}</p>
       <p className={cn("text-xs font-black tracking-tight", accent ? "text-brand-indigo" : "text-white")}>{value}</p>
    </div>
  </div>
);

const ToolbarButton = ({ children, hov }: any) => (
  <div className="relative group/tool">
     <button className="size-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all active:scale-90 shadow-xl">
        {children}
     </button>
     <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 opacity-0 group-hover/tool:opacity-100 transition-opacity pointer-events-none">
        <div className="bg-black/90 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest text-white whitespace-nowrap">
           {hov}
        </div>
     </div>
  </div>
);

const TranscriptItem = ({ text, isLast }: any) => (
  <div className={cn("space-y- relative group/item", isLast ? "opacity-100" : "opacity-30 hover:opacity-100 transition-opacity duration-500")}>
     <div className="flex items-center gap-2 mb-2">
        <span className={cn("size-1.5 rounded-full", isLast ? "bg-brand-indigo" : "bg-slate-500")} />
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">YOU</span>
     </div>
     <p className={cn(
       "text-sm font-semibold leading-relaxed tracking-tight transition-colors",
       isLast ? "text-white" : "text-slate-400 group-hover/item:text-slate-300"
     )}>
        {text}
     </p>
  </div>
);

const InsightBubble = ({ text, time }: any) => (
  <div className="space-y-2">
     <div className="flex items-center gap-2 mb-3">
        <div className="size-6 rounded-lg bg-brand-indigo/20 flex items-center justify-center shadow-sm shadow-brand-indigo/10">
           <Brain className="size-3 text-brand-indigo" />
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest text-brand-indigo">AI INVESTOR</span>
     </div>
     <div className="bg-brand-indigo/10 border border-brand-indigo/20 p-5 rounded-[24px] rounded-tl-none backdrop-blur-xl shadow-inner shadow-brand-indigo/5">
        <p className="text-sm font-semibold italic text-brand-indigo leading-relaxed">"{text}"</p>
     </div>
     <p className="text-[9px] font-black uppercase tracking-widest text-slate-600 ml-2">{time}</p>
  </div>
);

const WaveBar = ({ index, isRecording }: any) => {
  const heights = [30, 50, 80, 40, 60, 90, 100, 70, 50, 40, 60, 80, 50, 30, 40, 70, 90, 80, 60, 40, 30, 50, 60, 40];
  const h = heights[index % heights.length];
  
  return (
    <motion.div 
      initial={{ height: "20%" }}
      animate={{ height: isRecording ? `${h}%` : "10%" }}
      transition={{ 
        duration: 0.5, 
        repeat: isRecording ? Infinity : 0, 
        repeatType: "reverse",
        delay: index * 0.03
      }}
      className={cn(
        "w-1 rounded-full transition-colors duration-500",
        !isRecording ? "bg-slate-800" : (h > 80 ? "bg-brand-indigo shadow-[0_0_10px_rgba(79,70,229,0.5)]" : h > 50 ? "bg-brand-indigo/60" : "bg-brand-indigo/20")
      )}
    />
  );
};

const ControlBtn = ({ icon, onClick }: any) => (
  <button 
    onClick={onClick}
    className="size-12 rounded-2xl flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/10 transition-all active:scale-90"
  >
    {icon}
  </button>
);

const SlideIndicator = ({ label, active, completed }: any) => (
  <div className="flex items-center gap-2">
     <div className={cn(
       "size-1.5 rounded-full transition-all",
       completed ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" : active ? "bg-brand-indigo animate-pulse shadow-[0_0_10px_rgba(79,70,229,0.5)]" : "bg-white/10"
     )} />
     <span className={cn(
       "text-[9px] font-black uppercase tracking-widest transition-colors duration-300",
       active ? "text-white" : completed ? "text-emerald-500" : "text-slate-600"
     )}>
        {label}
     </span>
  </div>
);

const PulseVisualizer = ({ isRecording }: { isRecording: boolean }) => (
  <div className="relative">
     <motion.div 
        animate={{ scale: isRecording ? [1, 1.5, 1] : 1, opacity: isRecording ? [0.2, 0, 0.2] : 0.1 }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0 size-64 -translate-x-1/2 -translate-y-1/2 bg-brand-indigo rounded-full blur-3xl"
     />
     <motion.div 
        animate={{ scale: isRecording ? [1, 1.2, 1] : 1, opacity: isRecording ? [0.4, 0.1, 0.4] : 0.2 }}
        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
        className="absolute inset-0 size-48 -translate-x-1/2 -translate-y-1/2 bg-indigo-400 rounded-full blur-2xl"
     />
  </div>
);

const TargetIcon = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

export default PracticeInterface;
;
