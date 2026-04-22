
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { 
  Search, 
  Filter, 
  Plus, 
  Zap, 
  ChevronRight,
  Award,
  BookMarked
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const QuestionBank = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-brand-indigo tracking-tight">Investor Question Bank</h1>
            <p className="text-slate-500 font-medium text-lg">Master the toughest questions from top-tier VCs and Angel investors.</p>
          </div>
          <Button className="bg-brand-indigo hover:bg-brand-indigo/90 text-white rounded-xl font-bold h-12 px-6 shadow-xl shadow-brand-indigo/10 transition-all active:scale-95 flex items-center gap-2">
            <Plus className="size-4" />
            Add Custom Question
          </Button>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
          <CategoryBadge label="All Questions" count={124} active />
          <CategoryBadge label="Market & Opportunity" count={28} />
          <CategoryBadge label="Unit Economics" count={15} />
          <CategoryBadge label="Competitors" count={22} />
          <CategoryBadge label="Team & Culture" count={12} />
          <CategoryBadge label="Product & Tech" count={19} />
          <CategoryBadge label="The Fundraising Ask" count={28} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Search & Filter */}
            <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-slate-200/60 shadow-sm">
              <div className="relative flex-1 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-brand-indigo transition-colors" />
                <Input 
                  placeholder="Search questions or categories..." 
                  className="pl-12 h-12 bg-slate-50 border-none rounded-xl text-sm font-medium"
                />
              </div>
              <Button variant="outline" className="h-12 rounded-xl border-slate-200 font-bold text-slate-600 gap-2 px-6">
                <Filter className="size-4" />
                Advanced Filters
              </Button>
            </div>

            {/* Questions List */}
            <div className="space-y-4">
              <QuestionItem 
                question="How do you defend against established incumbents with much deeper pockets?"
                category="Competition"
                difficulty="Hard"
                frequency="High"
              />
              <QuestionItem 
                question="What is your bottom-up calculation of the Initial Serviceable Market?"
                category="Market"
                difficulty="Medium"
                frequency="High"
              />
              <QuestionItem 
                question="Walk me through your customer acquisition cost (CAC) and LTV ratio calculation."
                category="Finance"
                difficulty="Hard"
                frequency="Medium"
              />
              <QuestionItem 
                question="What keeps you up at night when you think about the next 12 months?"
                category="Founder Experience"
                difficulty="Medium"
                frequency="Medium"
              />
              <QuestionItem 
                question="How does your tech stack provide a sustainable intellectual property moat?"
                category="Product"
                difficulty="Expert"
                frequency="Low"
              />
            </div>
          </div>

          {/* Side Panel: Insights */}
          <div className="space-y-8">
            <Card className="rounded-[28px] border-slate-200/60 shadow-lg p-6 bg-gradient-to-br from-white to-slate-50 relative overflow-hidden ring-1 ring-slate-100">
              <div className="absolute -right-4 -top-4 size-24 bg-brand-indigo/[0.03] rounded-full blur-2xl" />
              <CardHeader className="px-0 pt-0">
                <CardTitle className="text-lg font-bold text-brand-indigo flex items-center gap-2">
                  <Award className="size-5 text-amber-500" />
                  Mastery Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0 space-y-6">
                <MasteryStat label="Questions Attempted" value="48" total="124" color="blue" />
                <MasteryStat label="Strong Defense" value="32" total="48" color="emerald" />
                <MasteryStat label="Weak Points" value="12" total="48" color="amber" />
              </CardContent>
            </Card>

            <Card className="rounded-[28px] border-none bg-brand-indigo text-white p-8 shadow-2xl shadow-brand-indigo/20 relative overflow-hidden group transition-all duration-500 hover:shadow-brand-indigo/30">
              <div className="absolute -right-10 -bottom-10 size-40 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700" />
              <div className="relative space-y-4">
                <div className="size-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10">
                  <Zap className="size-6 text-amber-400 fill-amber-400" />
                </div>
                <h3 className="text-xl font-bold tracking-tight">AI Drill Mode</h3>
                <p className="text-sm text-indigo-100 leading-relaxed font-medium">
                  Practice answering a randomized set of 'Hard' difficulty questions with real-time feedback.
                </p>
                <Button className="w-full bg-white text-brand-indigo hover:bg-white/90 rounded-xl font-bold h-12 transition-all active:scale-95 shadow-xl shadow-black/10">
                  Start Quick Drill
                </Button>
              </div>
            </Card>

            <Card className="rounded-[28px] border-slate-200 shadow-sm p-6">
               <CardHeader className="px-0 pt-0 pb-4 border-b border-slate-100 mb-4">
                  <CardTitle className="text-sm font-bold text-brand-indigo uppercase tracking-widest flex items-center gap-2">
                    <BookMarked className="size-4 text-slate-400" />
                    Bookmarked Tips
                  </CardTitle>
               </CardHeader>
               <div className="space-y-4">
                  <BookmarkedTip text="Always lead with a 'yes' or 'absolutely' when asked about market risks." />
                  <BookmarkedTip text="When talking about competition, focus on your unique GTM strategy." />
               </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

const CategoryBadge = ({ label, count, active }: any) => (
  <button className={cn(
    "flex items-center gap-3 px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 ring-1",
    active 
      ? "bg-brand-indigo text-white ring-brand-indigo shadow-lg shadow-brand-indigo/10" 
      : "bg-white text-slate-500 ring-slate-200/60 hover:ring-brand-indigo/30 hover:text-brand-indigo"
  )}>
    {label}
    <span className={cn(
      "text-[10px] px-2 py-0.5 rounded-full font-black",
      active ? "bg-white/20 text-white" : "bg-slate-100 text-slate-400"
    )}>
      {count}
    </span>
  </button>
);

const QuestionItem = ({ question, category, difficulty, frequency }: any) => (
  <Card className="rounded-[22px] border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:border-brand-indigo/20 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 group cursor-pointer overflow-hidden">
    <div className="p-6 flex items-start justify-between gap-6">
      <div className="flex-1 space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <Badge className="bg-slate-100 text-slate-500 border-none font-bold text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-md">
            {category}
          </Badge>
          <div className="size-1 bg-slate-200 rounded-full" />
          <p className={cn(
            "text-[9px] font-black uppercase tracking-widest",
            difficulty === "Hard" ? "text-amber-600" : difficulty === "Expert" ? "text-red-500" : "text-emerald-600"
          )}>
            {difficulty} Difficulty
          </p>
          <div className="size-1 bg-slate-200 rounded-full" />
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
            {frequency} Frequency
          </p>
        </div>
        <h3 className="text-lg font-bold text-brand-indigo group-hover:text-brand-blue transition-colors leading-snug">
          {question}
        </h3>
      </div>
      <div className="size-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-brand-indigo/5 group-hover:text-brand-indigo transition-all">
        <ChevronRight className="size-5" />
      </div>
    </div>
  </Card>
);

const MasteryStat = ({ label, value, total, color }: any) => {
  const percentage = (parseInt(value) / parseInt(total)) * 100;
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-end">
        <p className="text-xs font-bold text-slate-500">{label}</p>
        <p className="text-sm font-black text-brand-indigo">{value}<span className="text-[10px] text-slate-300 ml-1">/{total}</span></p>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={cn(
            "h-full rounded-full",
            color === "emerald" ? "bg-emerald-500" : color === "amber" ? "bg-amber-500" : "bg-brand-indigo"
          )}
        />
      </div>
    </div>
  );
};

const BookmarkedTip = ({ text }: any) => (
  <div className="flex gap-3 items-start group cursor-pointer">
    <div className="mt-1 size-1.5 rounded-full bg-brand-indigo/30 group-hover:bg-brand-indigo transition-colors flex-shrink-0" />
    <p className="text-xs font-medium text-slate-600 group-hover:text-brand-indigo transition-colors leading-relaxed">
      {text}
    </p>
  </div>
);



export default QuestionBank;
