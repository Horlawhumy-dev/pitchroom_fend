
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { 
  User, 
  Bell, 
  Shield, 
  Brain, 
  CreditCard, 
  LogOut,
  Camera,
  ChevronRight,
  Zap
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";

const Settings = () => {
  const { user } = useAuth();
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-brand-indigo tracking-tight">Settings</h1>
          <p className="text-slate-500 font-medium text-lg">Manage your profile, AI investor preferences, and account security.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Sidebar Nav */}
          <aside className="w-full md:w-64 space-y-1">
            <SettingsNavItem icon={<User className="size-4" />} label="Profile" active />
            <SettingsNavItem icon={<Brain className="size-4" />} label="AI Configuration" />
            <SettingsNavItem icon={<Bell className="size-4" />} label="Notifications" />
            <SettingsNavItem icon={<Shield className="size-4" />} label="Security" />
            <SettingsNavItem icon={<CreditCard className="size-4" />} label="Billing" />
            <Separator className="my-4 bg-slate-100" />
            <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all">
              <LogOut className="size-4" />
              Sign Out
            </button>
            <div className="mt-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
               <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Signed in as</p>
               <p className="text-xs font-bold text-brand-indigo truncate">{user?.workEmail}</p>
            </div>
          </aside>

          {/* Settings Content */}
          <div className="flex-1 space-y-10 pb-20">
            {/* Profile Section */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-brand-indigo">Public Profile</h2>
                <Button className="bg-brand-indigo text-white px-6 rounded-xl font-bold text-xs h-10 shadow-lg shadow-brand-indigo/10 transition-all active:scale-95">
                   Save Changes
                </Button>
              </div>

              <Card className="rounded-[32px] border-slate-200/60 shadow-sm overflow-hidden">
                <CardContent className="p-8 space-y-8">
                  {/* Avatar Upload */}
                  <div className="flex items-center gap-8">
                    <div className="relative group">
                      <div className="size-24 rounded-full bg-brand-indigo/10 border-4 border-white shadow-md overflow-hidden ring-1 ring-slate-100 flex items-center justify-center">
                        {user?.fullName ? (
                           <span className="text-2xl font-black text-brand-indigo uppercase">{user.fullName.substring(0, 2)}</span>
                        ) : (
                          <img 
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" 
                            alt="User" 
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <button className="absolute -bottom-1 -right-1 size-8 rounded-full bg-brand-indigo text-white flex items-center justify-center border-4 border-white shadow-lg shadow-brand-indigo/20 hover:scale-110 transition-transform">
                        <Camera className="size-3" />
                      </button>
                    </div>
                    <div>
                      <h3 className="font-bold text-brand-indigo">Profile Picture</h3>
                      <p className="text-xs text-slate-400 font-medium mt-1">PNG, JPG or GIF. Max 2MB.</p>
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm" className="rounded-lg border-slate-200 text-xs font-bold font-display h-9">Upload</Button>
                        <Button variant="ghost" size="sm" className="rounded-lg text-red-500 text-xs font-bold font-display h-9 hover:bg-red-50">Remove</Button>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-slate-50" />

                  {/* Form */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Full Name</Label>
                      <Input defaultValue={user?.fullName} placeholder="Alex Chen" className="h-12 bg-slate-50 border-none rounded-xl text-sm font-medium" />
                    </div>
                    <div className="space-y-2">
                       <Label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Job Title</Label>
                       <Input placeholder="Founder & CEO" className="h-12 bg-slate-50 border-none rounded-xl text-sm font-medium" />
                    </div>
                    <div className="space-y-2">
                       <Label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Company Name</Label>
                       <Input placeholder="CloudSync AI" className="h-12 bg-slate-50 border-none rounded-xl text-sm font-medium" />
                    </div>
                    <div className="space-y-2">
                       <Label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Website</Label>
                       <Input placeholder="https://cloudsync.ai" className="h-12 bg-slate-50 border-none rounded-xl text-sm font-medium" />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                       <Label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Bio</Label>
                       <textarea className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-brand-indigo/5 transition-all resize-none h-32" placeholder="Tell investors a bit about yourself..." />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* AI Preferences Section Preview */}
            <section className="space-y-6">
               <h2 className="text-2xl font-bold text-brand-indigo">AI Investor Settings</h2>
               <Card className="rounded-[32px] border-slate-200/60 shadow-sm p-8 space-y-6">
                  <div className="flex items-center gap-4 p-5 bg-brand-indigo/[0.03] rounded-2xl border border-brand-indigo/5">
                    <div className="size-10 rounded-xl bg-brand-indigo text-white flex items-center justify-center">
                      <Zap className="size-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-brand-indigo text-sm">Turbo Analysis Mode</h3>
                      <p className="text-[10px] font-bold text-slate-400 uppercase mt-0.5 tracking-wider">Faster AI response times during sessions</p>
                    </div>
                    <div className="w-10 h-5 bg-brand-indigo rounded-full relative p-0.5 cursor-pointer">
                      <div className="absolute right-0.5 top-0.5 size-4 bg-white rounded-full shadow-sm" />
                    </div>
                  </div>

                  <div className="space-y-4">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Default Investor Difficulty</p>
                     <div className="flex gap-3">
                        <DifficultyOption label="Friendly" />
                        <DifficultyOption label="Neutral" active />
                        <DifficultyOption label="Skeptical" />
                        <DifficultyOption label="Expert" />
                     </div>
                  </div>
               </Card>
            </section>

            {/* Danger Zone */}
            <section className="space-y-6">
               <h2 className="text-2xl font-bold text-red-500">Danger Zone</h2>
               <Card className="rounded-[32px] border-red-100 bg-red-50/10 p-8 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-red-500">Delete Account</h3>
                    <p className="text-xs text-slate-500 font-medium mt-1">Once you delete your account, there is no going back. Please be certain.</p>
                  </div>
                  <Button variant="outline" className="rounded-xl border-red-200 text-red-500 font-bold text-xs h-10 px-6 hover:bg-red-50 hover:border-red-300">
                    Delete Account
                  </Button>
               </Card>
            </section>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

const SettingsNavItem = ({ icon, label, active }: any) => (
  <button className={cn(
    "w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 group",
    active 
      ? "bg-brand-indigo text-white shadow-lg shadow-brand-indigo/10" 
      : "text-slate-600 hover:bg-slate-50 hover:text-brand-indigo"
  )}>
    <div className="flex items-center gap-3">
      <span className={cn(
        "transition-colors",
        active ? "text-white" : "text-slate-400 group-hover:text-brand-indigo"
      )}>
        {icon}
      </span>
      {label}
    </div>
    <ChevronRight className={cn(
      "size-3 opacity-0 transition-opacity",
      active ? "opacity-100" : "group-hover:opacity-40"
    )} />
  </button>
);

const DifficultyOption = ({ label, active }: any) => (
  <button className={cn(
    "flex-1 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 transition-all",
    active 
      ? "border-brand-indigo bg-brand-indigo text-white shadow-lg" 
      : "border-slate-100 text-slate-400 hover:border-slate-200"
  )}>
    {label}
  </button>
);



export default Settings;
