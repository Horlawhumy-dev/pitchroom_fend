import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Mic,
  Users,
  BarChart3,
  BookOpen,
  Settings,
  Rocket
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { LogOut } from "lucide-react";


const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Mic, label: "Practice Pitch", href: "/practice/setup" },
  { icon: Users, label: "Investor Simulator", href: "/simulator" },
  { icon: BarChart3, label: "Pitch Reports", href: "/reports" },
  { icon: BookOpen, label: "Question Bank", href: "/question-bank" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
];

export const Sidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <aside className="w-64 flex-shrink-0 bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0">
      <div className="p-6">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="size-10 rounded-lg bg-brand-indigo flex items-center justify-center text-white shadow-lg shadow-brand-indigo/20 group-hover:scale-105 transition-transform">
            <Rocket className="size-6" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-brand-indigo text-lg font-bold leading-tight">PitchRoom</h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">AI Pitch Simulator</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group",
              location.pathname === item.href
                ? "bg-brand-indigo/5 text-brand-indigo shadow-sm"
                : "text-slate-600 hover:bg-slate-50 hover:text-brand-indigo"
            )}
          >
            <item.icon className={cn(
              "size-5 transition-colors",
              location.pathname === item.href ? "text-brand-indigo" : "text-slate-400 group-hover:text-brand-indigo"
            )} />
            <p className={cn(
              "text-sm font-semibold",
              location.pathname === item.href ? "text-brand-indigo" : "text-slate-600"
            )}>{item.label}</p>
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-slate-100">
        <Link
          to="/settings"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group mb-2",
            location.pathname === "/settings"
              ? "bg-brand-indigo/5 text-brand-indigo shadow-sm"
              : "text-slate-600 hover:bg-slate-50 hover:text-brand-indigo"
          )}
        >
          <Settings className={cn(
            "size-5 transition-colors",
            location.pathname === "/settings" ? "text-brand-indigo" : "text-slate-400 group-hover:text-brand-indigo"
          )} />
          <p className="text-sm font-semibold">Settings</p>
        </Link>

        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-slate-600 hover:bg-red-50 hover:text-red-500 group mb-4"
        >
          <LogOut className="size-5 text-slate-400 group-hover:text-red-500 transition-colors" />
          <p className="text-sm font-semibold">Logout</p>
        </button>

        <div className="flex items-center gap-3 px-3 pt-4 border-t border-slate-50">
          <div className="size-9 rounded-full bg-brand-indigo/10 border-2 border-white shadow-sm overflow-hidden flex-shrink-0 flex items-center justify-center">
            {user?.fullName ? (
              <span className="text-xs font-black text-brand-indigo uppercase">{user.fullName.substring(0, 2)}</span>
            ) : (
              <img
                alt="User"
                className="w-full h-full object-cover"
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
              />
            )}
          </div>
          <div className="flex flex-col min-w-0">
            <p className="text-xs font-bold text-brand-indigo truncate">{user?.fullName || "Guest User"}</p>
            <p className="text-[10px] text-slate-500 font-medium truncate">{user?.workEmail || "Free Plan"}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
