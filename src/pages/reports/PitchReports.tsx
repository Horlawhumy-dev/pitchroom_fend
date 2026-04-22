import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { 
  Clock, 
  ChevronRight, 
  Download, 
  FileText,
  Search,
  ChevronLeft,
  ArrowLeft,
  AlertCircle,
  Brain,
  MessageSquare,
  TrendingDown,
  Activity
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { pitchService, type PitchSession, type PitchReport } from "@/services/pitch.service";
import { Skeleton } from "@/components/ui/skeleton";

const PitchReports = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const sessionId = searchParams.get("sessionId");

  const [sessions, setSessions] = useState<PitchSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  useEffect(() => {
    const fetchSessions = async () => {
      setLoading(true);
      try {
        const res = await pitchService.getSessions(page, limit);
        if (res.statusCode === 200 && res.data) {
          setSessions(res.data.sessions);
          setTotal(res.data.pagination.total);
        }
      } catch (error) {
        console.error("Failed to fetch sessions:", error);
      } finally {
        setLoading(false);
      }
    };
    if (!sessionId) {
      fetchSessions();
    }
  }, [page, sessionId]);

  const totalPages = Math.ceil(total / limit);

  return (
    <DashboardLayout>
      {sessionId ? (
        <ReportDetail 
          sessionId={sessionId} 
          onBack={() => setSearchParams({})} 
        />
      ) : (
        <div className="space-y-8 animate-in fade-in duration-500">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-black text-brand-indigo tracking-tight">Pitch Reports</h1>
              <p className="text-slate-500 font-medium text-lg">Review your performance across all sessions and track your growth.</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="rounded-xl border-slate-200 font-bold text-slate-600 gap-2 h-12 px-6">
                <Download className="size-4" />
                Export All
              </Button>
              <Button 
                onClick={() => navigate("/practice/setup")}
                className="bg-brand-indigo hover:bg-brand-indigo/90 text-white rounded-xl font-bold h-12 px-6 shadow-xl shadow-brand-indigo/10 transition-all active:scale-95"
              >
                Generate Intelligence Report
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center justify-between gap-6 p-1.5 bg-white rounded-[24px] border border-slate-200/60 shadow-sm px-6 py-4">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative w-full max-w-xs group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-brand-indigo transition-colors" />
                <Input 
                  placeholder="Search sessions..." 
                  className="pl-10 h-10 bg-slate-50 border-none rounded-xl text-sm font-medium"
                />
              </div>
              <div className="h-6 w-px bg-slate-200" />
              <FilterButton label="Session Type" />
              <FilterButton label="Difficulty" />
              <FilterButton label="Date Range" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-2">Sort by</span>
              <FilterButton label="Newest First" active />
            </div>
          </div>

          {/* Reports List */}
          <div className="grid grid-cols-1 gap-4">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="rounded-[28px] p-8">
                  <div className="flex items-center gap-6">
                     <Skeleton className="size-16 rounded-[22px]" />
                     <div className="space-y-2 flex-1">
                        <Skeleton className="h-6 w-1/3" />
                        <Skeleton className="h-4 w-1/4" />
                     </div>
                     <Skeleton className="h-10 w-24" />
                  </div>
                </Card>
              ))
            ) : sessions.length > 0 ? (
              <>
                {sessions.map((session) => (
                  <ReportCard 
                    key={session.sessionId}
                    title={session.responseType === "interrogation" ? "Deep Dive" : `${session.pitchStage} Simulation`} 
                    date={new Date(session.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })} 
                    score={session.score?.toString() || "0"} 
                    duration={session.duration || "N/A"} 
                    difficulty={session.responseType === "drill" ? "Drill" : "Standard"}
                    status={session.isActive ? "In Progress" : "Complete"}
                    metrics={
                      session.isActive
                        ? ["Session in progress..."]
                        : session.analysisSummary 
                          ? [
                              `Clarity: ${session.analysisSummary.storyClarity}/10`,
                              `Market: ${session.analysisSummary.marketCredibility}/10`,
                              `Confidence: ${session.analysisSummary.founderConfidence}/10`
                            ]
                          : ["Awaiting Analysis"]
                    }
                    onClick={() => session.isActive ? navigate(`/practice?sessionId=${session.sessionId}`) : setSearchParams({ sessionId: session.sessionId })}
                  />
                ))}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-4 mt-8">
                    <Button
                      variant="outline"
                      disabled={page === 1}
                      onClick={() => setPage(page - 1)}
                      className="rounded-xl border-slate-200"
                    >
                      <ChevronLeft className="size-4 mr-2" />
                      Previous
                    </Button>
                    <span className="text-sm font-bold text-slate-500">
                      Page {page} of {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      disabled={page === totalPages}
                      onClick={() => setPage(page + 1)}
                      className="rounded-xl border-slate-200"
                    >
                      Next
                      <ChevronRight className="size-4 ml-2" />
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20 bg-slate-50 rounded-[32px] border-2 border-dashed border-slate-200">
                <FileText className="size-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-slate-600">No pitch reports found</h3>
                <p className="text-slate-400 mt-1">Complete your first pitch session to see your performance analysis.</p>
                <Button 
                  onClick={() => navigate("/practice/setup")}
                  className="mt-6 bg-brand-indigo text-white rounded-xl px-8 h-12 font-bold"
                >
                  Start Your First Session
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

// --- Subcomponents ---

const ReportDetail = ({ sessionId, onBack }: { sessionId: string; onBack: () => void }) => {
  const [report, setReport] = useState<PitchReport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true);
      try {
        const res = await pitchService.getReport(sessionId);
        if (res.statusCode === 200 && res.data) {
          setReport(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch report detail:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        <Skeleton className="h-10 w-48" />
        <div className="grid grid-cols-3 gap-6">
          <Skeleton className="h-40 rounded-[28px]" />
          <Skeleton className="h-40 rounded-[28px]" />
          <Skeleton className="h-40 rounded-[28px]" />
        </div>
        <Skeleton className="h-64 rounded-[28px]" />
      </div>
    );
  }

  if (!report || !report.pitchIntelligence) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
         <AlertCircle className="size-12 text-slate-300" />
         <h3 className="text-xl font-bold text-slate-600">Report Not Found</h3>
         <p className="text-slate-400">We couldn't find the intelligence report for this session.</p>
         <Button onClick={onBack} variant="outline" className="rounded-xl">Back to List</Button>
      </div>
    );
  }

  const intel = report.pitchIntelligence;

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Detail Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-4">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 hover:text-brand-indigo font-bold text-xs transition-colors group"
          >
            <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
            BACK TO REPORTS
          </button>
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-brand-indigo tracking-tight">Performance Audit</h1>
            <p className="text-slate-500 font-medium">Session Analysis • {sessionId.substring(0, 8)}</p>
          </div>
        </div>
        <div className="flex gap-3 pt-4">
           <Button variant="outline" className="rounded-xl p-3 h-12 w-12 border-slate-200">
              <Download className="size-5 text-slate-600" />
           </Button>
           <Button className="bg-brand-indigo hover:bg-brand-indigo/90 text-white rounded-xl font-bold h-12 px-6 shadow-lg shadow-brand-indigo/10">
              Share Analysis
           </Button>
        </div>
      </div>

      {/* Intelligence Score Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ScoreCard 
          title="Story Clarity" 
          score={intel.storyClarity.score} 
          feedback={intel.storyClarity.feedback} 
          icon={<Brain className="size-5 text-brand-indigo" />} 
        />
        <ScoreCard 
          title="Market Credibility" 
          score={intel.marketCredibility.score} 
          feedback={intel.marketCredibility.feedback} 
          icon={<Activity className="size-5 text-emerald-500" />} 
          color="emerald"
        />
        <ScoreCard 
          title="Founder Confidence" 
          score={intel.founderConfidence.score} 
          feedback={intel.founderConfidence.feedback} 
          icon={<TrendingDown className="size-5 text-amber-500 rotate-180" />} 
          color="amber"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Analysis Column */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="rounded-[32px] border-slate-200/60 shadow-xl shadow-slate-200/20 overflow-hidden">
             <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-8">
                <CardTitle className="text-lg font-bold text-brand-indigo flex items-center gap-2">
                   <div className="size-8 rounded-lg bg-brand-indigo/10 flex items-center justify-center">
                      <AlertCircle className="size-4" />
                   </div>
                   The Investor Verdict
                </CardTitle>
             </CardHeader>
             <CardContent className="p-8">
                <p className="text-slate-600 leading-relaxed font-medium text-lg italic bg-indigo-50/30 p-8 rounded-3xl border border-indigo-100/50">
                  "{intel.overallSummary}"
                </p>
             </CardContent>
          </Card>

          {/* Transcript Log */}
          <div className="space-y-4">
             <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest pl-4">Session Transcript</h3>
             <Card className="rounded-[32px] border-slate-200/60 shadow-sm overflow-hidden divide-y divide-slate-100">
                {report.sessionTranscript.logs.map((log, i) => (
                  <div key={i} className="p-8 hover:bg-slate-50/50 transition-colors">
                     <div className="flex gap-6">
                        <div className="space-y-8 flex-1">
                           <div className="space-y-3">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Investor Context</p>
                              <p className="text-sm font-bold text-brand-indigo">{log.question}</p>
                           </div>
                           <div className="space-y-3 pl-6 border-l-2 border-slate-100">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Your Response</p>
                              <p className="text-sm font-medium text-slate-600 leading-relaxed">{log.answer}</p>
                           </div>
                        </div>
                     </div>
                  </div>
                ))}
             </Card>
          </div>
        </div>

        {/* Risk Signals Sidebar */}
        <div className="space-y-8">
           <Card className="rounded-[32px] border-slate-200/60 bg-red-50/30 border-red-100 shadow-xl shadow-red-500/5 overflow-hidden">
             <CardHeader className="p-8 pb-4">
                <CardTitle className="text-lg font-bold text-red-600 flex items-center gap-2">
                   <AlertCircle className="size-5" />
                   Risk Signals
                </CardTitle>
                <p className="text-xs font-medium text-red-500/70">Potential red flags identified by the investor audience.</p>
             </CardHeader>
             <CardContent className="p-8 pt-4 space-y-3">
                {intel.investorRiskSignals.length > 0 ? (
                  intel.investorRiskSignals.map((risk, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-white/60 rounded-xl border border-red-100 shadow-sm">
                       <span className="size-2 rounded-full bg-red-500 mt-1.5 shrink-0" />
                       <span className="text-xs font-bold text-red-700">{risk}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs font-bold text-emerald-600">No major risk signals detected.</p>
                )}
             </CardContent>
           </Card>

           <Card className="rounded-[32px] border-slate-200/60 shadow-sm p-8 bg-brand-indigo text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-700">
                 <Brain className="size-32" />
              </div>
              <h4 className="text-lg font-bold mb-2">Next Step Recommendation</h4>
              <p className="text-sm font-medium text-white/80 leading-relaxed">Consider running a deep-dive interrogation focused specifically on your unit economics to address the feedback in your score.</p>
              <Button className="mt-6 w-full bg-white text-brand-indigo hover:bg-white/90 rounded-xl font-bold">Start Drill</Button>
           </Card>
        </div>
      </div>
    </div>
  );
}

const ScoreCard = ({ title, score, feedback, icon, color = "indigo" }: any) => {
  const colorMap = {
    indigo: "text-brand-indigo bg-brand-indigo/10 border-brand-indigo/20 shadow-brand-indigo/5",
    emerald: "text-emerald-600 bg-emerald-50 border-emerald-100 shadow-emerald-500/5",
    amber: "text-amber-600 bg-amber-50 border-amber-100 shadow-amber-500/5"
  };
  
  const activeColor = colorMap[color as keyof typeof colorMap];

  return (
    <Card className={cn("rounded-[32px] p-8 border hover:translate-y-[-4px] transition-all duration-300", activeColor)}>
       <div className="flex items-center justify-between mb-4">
          <div className="size-10 rounded-xl bg-white/80 flex items-center justify-center shadow-sm">
             {icon}
          </div>
          <div className="flex items-baseline gap-1">
             <span className="text-3xl font-black">{score}</span>
             <span className="text-xs font-bold opacity-40">/10</span>
          </div>
       </div>
       <h4 className="text-sm font-black uppercase tracking-widest mb-3">{title}</h4>
       <p className="text-[11px] font-bold leading-relaxed opacity-70 italic">"{feedback}"</p>
    </Card>
  );
}

const FilterButton = ({ label, active }: any) => (
  <button className={cn(
    "px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2",
    active ? "bg-brand-indigo text-white shadow-md shadow-brand-indigo/10" : "bg-white text-slate-500 hover:bg-slate-50 border border-slate-100"
  )}>
    {label}
    {!active && <ChevronRight className="size-3 rotate-90 opacity-40" />}
  </button>
);

const ReportCard = ({ title, date, score, duration, status, metrics, onClick, difficulty }: any) => (
  <Card className="rounded-[28px] border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-brand-indigo/10 transition-all duration-300 group overflow-hidden">
    <div className="flex flex-col md:flex-row items-center p-8 gap-10">
      {/* Date & Icon */}
      <div className="flex items-center gap-6 flex-shrink-0">
        <div className="size-16 rounded-[22px] bg-brand-indigo/5 flex items-center justify-center text-brand-indigo group-hover:scale-110 transition-transform duration-500">
          <FileText className="size-8" />
        </div>
        <div>
          <p className="text-sm font-bold text-brand-indigo">{date}</p>
          <div className="flex items-center gap-2 mt-1">
            <Clock className="size-3 text-slate-400" />
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{duration}</p>
          </div>
        </div>
      </div>

      {/* Title & Stats */}
      <div className="flex-1 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-black text-brand-indigo tracking-tight">{title}</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{difficulty}</p>
          </div>
          <Badge className={cn(
            "rounded-full px-3 py-1 font-black text-[10px] uppercase tracking-widest border-none shadow-sm",
            status === "Complete" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
          )}>
            {status}
          </Badge>
        </div>
        <div className="flex flex-wrap gap-2">
          {metrics.map((m: any) => (
            <span key={m} className="px-3 py-1 bg-slate-50 text-slate-500 rounded-full text-[10px] font-bold border border-slate-100/50">{m}</span>
          ))}
        </div>
      </div>

      {/* Score & Actions */}
      <div className="flex items-center gap-10 border-l border-slate-100 pl-10">
        <div className="text-center">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Score</p>
          <div className="flex items-baseline gap-1">
             <span className="text-3xl font-black text-brand-indigo">{score}</span>
             <span className="text-sm font-bold text-slate-300">/10</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Button 
            onClick={onClick}
            className="bg-brand-indigo hover:bg-brand-indigo/90 text-white rounded-xl font-bold text-xs h-10 px-6 shadow-lg shadow-brand-indigo/10"
          >
            View Analysis
          </Button>
          <Button variant="ghost" className="rounded-xl font-bold text-[10px] uppercase tracking-[0.15em] text-slate-400 h-8 hover:text-brand-indigo transition-colors">
            Share Link
          </Button>
        </div>
      </div>
    </div>
  </Card>
);

export default PitchReports;
