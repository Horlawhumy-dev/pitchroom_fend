import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { 
  PlayCircle, 
  TrendingUp, 
  Clock, 
  Star,
  ChevronRight,
  Zap,
  Target
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { pitchService, type UserStats, type PitchSession } from "@/services/pitch.service";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [sessions, setSessions] = useState<PitchSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, sessionsRes] = await Promise.all([
          pitchService.getUserStats(),
          pitchService.getSessions(1, 5)
        ]);
        
        if (statsRes.statusCode === 200 && statsRes.data) setStats(statsRes.data);
        if (sessionsRes.statusCode === 200 && sessionsRes.data) setSessions(sessionsRes.data.sessions);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-4xl font-black text-brand-indigo tracking-tight">
              Ready to practice your next investor pitch?
            </h2>
            <p className="text-slate-500 font-medium text-lg">
              Welcome back, {user?.fullName?.split(' ')[0] || "Founder"}. 
              {stats && stats.totalSessions > 0 ? (
                <> Your current pitch readiness is <span className="text-brand-indigo font-bold">{stats.pitchReadiness}%</span> breakthrough.</>
              ) : (
                <> Start your first session to see your pitch readiness score.</>
              )}
            </p>
          </div>
          <Button 
            size="lg" 
            onClick={() => navigate("/practice/setup")}
            className="bg-brand-indigo hover:bg-brand-indigo/90 text-white px-8 py-7 rounded-2xl font-bold text-lg shadow-xl shadow-brand-indigo/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-3"
          >
            <PlayCircle className="size-6" />
            Start Pitch Practice
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            <>
              {[1, 2, 3, 4].map(i => (
                <Card key={i} className="rounded-[24px] border-slate-200/60 shadow-sm p-6">
                  <Skeleton className="h-3 w-24 mb-4" />
                  <Skeleton className="h-10 w-16 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </Card>
              ))}
            </>
          ) : (
            <>
              <StatCard 
                title="Pitch Readiness" 
                value={`${stats?.pitchReadiness || 0}%`} 
                trend={stats?.pitchReadiness && stats.pitchReadiness > 0 ? "+5%" : "Lifetime"} 
                trendType={stats?.pitchReadiness && stats.pitchReadiness > 0 ? "up" : "neutral"}
                footer={<Progress value={stats?.pitchReadiness || 0} className="h-2 bg-slate-100" />}
              />
              <StatCard 
                title="Total Sessions" 
                value={stats?.totalSessions.toString() || "0"} 
                trend="Lifetime" 
                subValue={
                  <div className="flex -space-x-2 mt-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="size-7 rounded-full border-2 border-white bg-slate-100 shadow-sm" />
                    ))}
                  </div>
                }
              />
              <StatCard 
                title="Avg Investor Score" 
                value={stats?.averageScore.toString() || "0"} 
                trend="+0.4"
                trendType="up"
                footer={
                  <div className="flex gap-1 mt-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={cn(
                          "size-4",
                          i < Math.round(stats?.averageScore || 0) / 2 
                            ? "fill-brand-indigo text-brand-indigo" 
                            : "text-slate-200"
                        )} 
                      />
                    ))}
                  </div>
                }
              />
              <StatCard 
                title="Last Session" 
                value={stats?.lastSession ? `${stats.lastSession.score}` : "N/A"} 
                trend={stats?.lastSession ? new Date(stats.lastSession.date).toLocaleDateString() : "No sessions"}
                subValue={stats?.lastSession ? <p className="text-xs font-semibold text-emerald-600 mt-1">Completed</p> : null}
                footer={<p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-wider">Most Recent Performance</p>}
              />
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Sessions Table */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-brand-indigo flex items-center gap-2">
                <Clock className="size-5 text-slate-400" />
                Recent Pitch Sessions
              </h2>
              <Button 
                variant="link" 
                onClick={() => navigate("/reports")}
                className="text-brand-indigo font-bold hover:no-underline"
              >
                View All
              </Button>
            </div>
            
            <Card className="rounded-[24px] border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Date</th>
                      <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Score</th>
                      <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Difficulty</th>
                      <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {loading ? (
                      Array.from({ length: 3 }).map((_, i) => (
                        <tr key={i}>
                          <td className="px-6 py-5"><Skeleton className="h-4 w-24" /></td>
                          <td className="px-6 py-5"><Skeleton className="h-6 w-12" /></td>
                          <td className="px-6 py-5"><Skeleton className="h-4 w-20" /></td>
                          <td className="px-6 py-5"><Skeleton className="h-4 w-16" /></td>
                        </tr>
                      ))
                    ) : sessions.length > 0 ? (
                      sessions.slice(0, 5).map((session) => (
                        <SessionRow 
                          key={session.sessionId}
                          onClick={() => session.isActive ? navigate(`/practice?sessionId=${session.sessionId}`) : navigate(`/reports?sessionId=${session.sessionId}`)}
                          date={new Date(session.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                          mode={session.responseType === "interrogation" ? "Deep Dive" : session.pitchStage}
                          score={session.score || 0}
                          isActive={session.isActive}
                          difficulty={session.responseType === "drill" ? "Drill" : "Standard"}
                          duration={session.duration || "N/A"}
                        />
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="px-6 py-12 text-center text-slate-400 font-medium">
                          No pitch sessions yet. Start your first one to see results.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Side Panels */}
          <div className="space-y-8">
            {/* AI Coach Tips */}
            <Card className="bg-brand-indigo text-white border-none rounded-[24px] shadow-2xl shadow-brand-indigo/20 relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 size-32 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700" />
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-bold text-lg">
                  <Zap className="size-5 text-amber-400 fill-amber-400" />
                  AI Coach Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <TipItem icon={<Target className="size-4" />} text="Your market explanation needs more clarity in the initial hook." />
                <TipItem icon={<TrendingUp className="size-4" />} text="Speech pace detected at 160 WPM. You're speaking slightly too fast." />
              </CardContent>
            </Card>

            {/* Recommended Practice */}
            <Card className="rounded-[24px] border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-brand-indigo">Recommended Drills</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <DrillItem 
                  title="Market explanation drill" 
                  meta="5 mins • Focus on Clarity" 
                  onClick={() => navigate("/practice/setup")}
                />
                <DrillItem 
                  title="Unit Economics defense" 
                  meta="10 mins • Focus on Data" 
                  onClick={() => navigate("/practice/setup")}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

const StatCard = ({ title, value, trend, trendType, footer, subValue }: any) => (
  <Card className="rounded-[24px] border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 ring-1 ring-slate-100 hover:shadow-xl hover:shadow-brand-indigo/5 transition-all duration-300">
    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{title}</p>
    <div className="flex items-baseline justify-between">
      <h3 className="text-3xl font-black text-brand-indigo">{value}</h3>
      <span className={cn(
        "text-[11px] font-black px-2 py-0.5 rounded-full",
        trendType === "up" ? "text-emerald-600 bg-emerald-50" : "text-slate-400 bg-slate-50"
      )}>
        {trend}
      </span>
    </div>
    {subValue}
    {footer && <div className="mt-4">{footer}</div>}
  </Card>
);

const SessionRow = ({ date, mode, score, difficulty, duration, onClick, isActive }: any) => (
  <tr 
    onClick={onClick}
    className="hover:bg-slate-50/50 transition-colors cursor-pointer group"
  >
    <td className="px-6 py-5">
      <p className="text-sm font-bold text-brand-indigo">{date}</p>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">{mode}</p>
    </td>
    <td className="px-6 py-5">
      <Badge className={cn(
        "border-none font-bold px-2 py-0.5 rounded-lg shadow-sm",
        isActive ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"
      )}>
        {isActive ? "In Progress" : `${score} / 10`}
      </Badge>
    </td>
    <td className="px-6 py-5 text-sm font-bold text-slate-600">{difficulty}</td>
    <td className="px-6 py-5 text-sm font-bold text-slate-400">{duration}</td>
  </tr>
);

const TipItem = ({ icon, text }: any) => (
  <div className="flex gap-4 items-start bg-white/10 p-4 rounded-2xl border border-white/10 backdrop-blur-sm group-hover:bg-white/15 transition-colors">
    <div className="mt-1 text-white/50">{icon}</div>
    <p className="text-sm font-medium leading-relaxed">{text}</p>
  </div>
);

const DrillItem = ({ title, meta, onClick }: any) => (
  <div 
    onClick={onClick}
    className="group flex items-center justify-between p-4 border border-slate-50 rounded-2xl hover:border-brand-indigo/10 hover:bg-slate-50 transition-all cursor-pointer"
  >
    <div className="flex items-center gap-4">
      <div className="size-10 rounded-xl bg-brand-indigo/5 flex items-center justify-center text-brand-indigo group-hover:scale-110 transition-transform">
        <Target className="size-5" />
      </div>
      <div>
        <p className="text-sm font-bold text-brand-indigo">{title}</p>
        <p className="text-[10px] font-bold text-slate-400 uppercase mt-0.5 tracking-wider">{meta}</p>
      </div>
    </div>
    <ChevronRight className="size-4 text-slate-200 group-hover:text-brand-indigo transition-colors" />
  </div>
);



export default Dashboard;
