
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Zap, 
  Brain, 
  Award,
  PieChart,
  LineChart
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const Analytics = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-brand-indigo tracking-tight">Performance Analytics</h1>
            <p className="text-slate-500 font-medium text-lg">Track your readiness, delivery score, and confidence trends over time.</p>
          </div>
          <div className="flex items-center gap-3 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
            <PeriodButton label="7 Days" active />
            <PeriodButton label="30 Days" />
            <PeriodButton label="90 Days" />
            <PeriodButton label="All Time" />
          </div>
        </div>

        {/* High-Level Trends */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TrendCard 
            title="Readiness Score" 
            value="84%" 
            trend="+5.2%" 
            trendUp 
            desc="Ready for Seed/Angel"
            icon={<Target className="size-5" />}
          />
          <TrendCard 
            title="Confidence Index" 
            value="7.2" 
            trend="+0.8" 
            trendUp 
            desc="Consistent improvement"
            icon={<Zap className="size-5" />}
          />
          <TrendCard 
            title="Filler Word Count" 
            value="12" 
            trend="-4" 
            trendUp={false} 
            desc="Average per minute"
            icon={<Brain className="size-5" />}
          />
        </div>

        {/* Charts & Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Readiness Chart Placeholder */}
          <Card className="lg:col-span-2 rounded-[32px] border-slate-200/60 shadow-lg overflow-hidden flex flex-col min-h-[400px]">
            <CardHeader className="p-8 border-b border-slate-50">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold text-brand-indigo">Readiness Over Time</CardTitle>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-brand-indigo" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Your Score</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-slate-200" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Industry Avg</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-8 flex flex-col justify-end">
              <div className="flex items-end justify-between h-48 gap-3">
                {[45, 52, 48, 65, 72, 68, 84, 79, 88, 84].map((h, i) => (
                  <motion.div 
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className="flex-1 bg-brand-indigo/10 rounded-t-lg relative group transition-colors hover:bg-brand-indigo/20"
                  >
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-brand-indigo text-white text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {h}%
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-50">
                {['Oct 15', 'Oct 16', 'Oct 17', 'Oct 18', 'Oct 19', 'Oct 20', 'Oct 21', 'Oct 22', 'Oct 23', 'Oct 24'].map(day => (
                  <span key={day} className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{day}</span>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Skill Radar Breakdown */}
          <Card className="rounded-[32px] border-slate-200/60 shadow-lg p-8 space-y-8">
            <h3 className="text-xl font-bold text-brand-indigo">Skill Breakdown</h3>
            <div className="space-y-6">
              <SkillItem label="Delivery & Pace" value={88} color="indigo" />
              <SkillItem label="Market Knowledge" value={72} color="emerald" />
              <SkillItem label="Unit Economics" value={54} color="amber" />
              <SkillItem label="Storytelling" value={92} color="blue" />
              <SkillItem label="Objection Handling" value={65} color="indigo" />
            </div>
            
            <div className="pt-6 border-t border-slate-100">
               <div className="bg-brand-indigo/[0.03] p-6 rounded-2xl border border-brand-indigo/5 space-y-4">
                  <div className="flex items-center gap-3 text-brand-indigo">
                    <Award className="size-5" />
                    <h4 className="font-bold">Next Milestone</h4>
                  </div>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    Improve 'Unit Economics' by 15% to reach <span className="text-brand-indigo font-bold">Series A Readiness</span>.
                  </p>
                  <Button className="w-full h-11 bg-brand-indigo text-white rounded-xl text-xs font-bold shadow-xl shadow-brand-indigo/10">
                    Recommended Drills
                  </Button>
               </div>
            </div>
          </Card>
        </div>

        {/* Comparative Analytics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <Card className="rounded-[32px] border-slate-200/60 shadow-md p-8 bg-white">
              <h3 className="text-lg font-bold text-brand-indigo mb-6 flex items-center gap-2">
                <PieChart className="size-5 text-slate-400" />
                Topic Coverage
              </h3>
              <div className="flex items-center gap-10">
                <div className="size-32 rounded-full border-[12px] border-brand-indigo border-r-slate-100 border-b-slate-100 relative flex items-center justify-center">
                   <div className="text-center">
                     <p className="text-2xl font-black text-brand-indigo">65%</p>
                     <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Market</p>
                   </div>
                </div>
                <div className="flex-1 space-y-4">
                  <TopicLegend label="Market & Opportunity" percentage="65%" color="bg-brand-indigo" />
                  <TopicLegend label="Financials & Ask" percentage="20%" color="bg-slate-300" />
                  <TopicLegend label="Competitive Moat" percentage="15%" color="bg-slate-100" />
                </div>
              </div>
           </Card>

           <Card className="rounded-[32px] border-slate-200/60 shadow-md p-8 bg-white">
              <h3 className="text-lg font-bold text-brand-indigo mb-6 flex items-center gap-2">
                <LineChart className="size-5 text-slate-400" />
                Speech Sentiment Trends
              </h3>
              <div className="space-y-6">
                <div className="flex justify-between items-end h-24 gap-1 px-4">
                  {[20, 30, 45, 35, 50, 65, 80, 55, 60, 40, 30, 45].map((h, i) => (
                    <div key={i} className="flex-1 bg-emerald-500/10 rounded-full flex flex-col justify-end overflow-hidden">
                      <div className="w-full bg-emerald-500" style={{ height: `${h}%` }} />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                   <span>Highly Nervous</span>
                   <span className="text-brand-indigo">Optimal Confidence</span>
                   <span>Over-Confident</span>
                </div>
              </div>
           </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

const PeriodButton = ({ label, active }: any) => (
  <button className={cn(
    "px-4 py-2 rounded-lg text-xs font-bold transition-all",
    active ? "bg-brand-indigo text-white shadow-md shadow-brand-indigo/10" : "text-slate-500 hover:text-brand-indigo"
  )}>
    {label}
  </button>
);

const TrendCard = ({ title, value, trend, trendUp, desc, icon }: any) => (
  <Card className="rounded-[28px] border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-6 group hover:border-brand-indigo/10 transition-all">
    <div className="flex items-center justify-between mb-4">
      <div className="size-10 rounded-xl bg-slate-50 flex items-center justify-center text-brand-indigo group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div className={cn(
        "flex items-center gap-1 font-black text-xs px-2 py-0.5 rounded-full",
        trendUp ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
      )}>
        {trendUp ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
        {trend}
      </div>
    </div>
    <div className="space-y-1">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{title}</p>
      <h3 className="text-3xl font-black text-brand-indigo">{value}</h3>
      <p className="text-xs font-bold text-slate-500">{desc}</p>
    </div>
  </Card>
);

const SkillItem = ({ label, value, color }: any) => (
  <div className="space-y-3">
    <div className="flex justify-between items-end">
      <p className="text-xs font-bold text-brand-indigo">{label}</p>
      <p className="text-xs font-black text-slate-400">{value}%</p>
    </div>
    <div className="h-2.5 bg-slate-50 rounded-full border border-slate-100 overflow-hidden ring-1 ring-slate-100">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={cn(
          "h-full rounded-full transition-all",
          color === "indigo" ? "bg-brand-indigo" : color === "emerald" ? "bg-emerald-500" : color === "amber" ? "bg-amber-500" : "bg-brand-blue"
        )}
      />
    </div>
  </div>
);

const TopicLegend = ({ label, percentage, color }: any) => (
  <div className="flex items-center justify-between group cursor-default">
    <div className="flex items-center gap-3">
      <div className={cn("size-2 rounded-full", color)} />
      <span className="text-xs font-bold text-slate-500 group-hover:text-brand-indigo transition-colors">{label}</span>
    </div>
    <span className="text-[10px] font-black text-slate-300">{percentage}</span>
  </div>
);



export default Analytics;
