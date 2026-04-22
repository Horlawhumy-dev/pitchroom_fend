import { useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import { Search, Bell, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC]">
      <Sidebar />
      
      <main className="flex-1 flex flex-col overflow-y-auto">
        <header className="flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-slate-200/60">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-4 group-focus-within:text-brand-blue transition-colors" />
              <Input 
                className="w-full bg-slate-50 border-slate-200 rounded-xl pl-10 pr-4 h-10 text-sm focus:ring-brand-blue/10 focus:border-brand-blue/30 transition-all font-medium" 
                placeholder="Search sessions or feedback..." 
                type="text"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-xl transition-all">
              <Bell className="size-5" />
              <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white ring-2 ring-red-500/20"></span>
            </button>
            
            <Button 
              onClick={() => navigate("/practice/setup")}
              className="bg-brand-indigo hover:bg-brand-indigo/90 text-white px-5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-brand-indigo/20 transition-all active:scale-95"
            >
              <Plus className="size-4" />
              New Simulation
            </Button>
          </div>
        </header>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="p-8"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
};
