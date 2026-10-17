import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  ClipboardCheck,
  Award,
  FolderLock,
  BadgeCheck,
  Briefcase,
  Settings,
  Sun,
  Moon,
  Sparkles,
  ShieldCheck,
  X,
  PlayCircle,
  ExternalLink,
  LogOut,
  Users,
  BookOpen,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    ...(user?.role === 'assessor'
      ? [{ name: 'Assessor Terminal', path: '/assessor/dashboard', icon: Users, badge: 'Active' }]
      : []),
    { name: 'My Assessments', path: '/assessments', icon: ClipboardCheck, badge: '2 Active' },
    { name: 'My Courses', path: '/courses', icon: BookOpen, badge: user?.enrolledCourses?.length ? `${user.enrolledCourses.length}` : undefined },
    { name: 'Qualifications', path: '/qualifications', icon: Award },
    { name: 'Evidence Vault', path: '/evidence-vault', icon: FolderLock, badge: '4' },
    { name: 'Skill Passport', path: '/skill-passport', icon: BadgeCheck, isVerified: true },
    { name: 'Opportunities', path: '/opportunities', icon: Briefcase, badge: '8 New' },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-[#14161D] text-slate-200 shadow-2xl transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between border-b border-charcoal-700/60 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-gold-600 via-gold-500 to-amber-300 text-charcoal-950 font-black shadow-lg shadow-gold-500/20">
              <Sparkles className="h-5 w-5 text-charcoal-950 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold tracking-tight text-white text-lg">SkillSetu</span>
                <span className="rounded bg-gold-500/20 px-1.5 py-0.2 text-[10px] font-bold text-gold-400 uppercase tracking-widest border border-gold-500/30">
                  AI
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-400 leading-tight">
                RPL Skill Assessment • SIH 2026
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-charcoal-750 hover:text-white lg:hidden"
            aria-label="Close Sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Hackathon Badge Pill */}
        <div className="mx-4 mt-4 rounded-xl bg-charcoal-800/80 border border-charcoal-700/60 p-2.5">
          <div className="flex items-center gap-2 text-xs">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-slate-300">PS: 26242</span>
            <span className="text-[10px] text-slate-400 ml-auto border border-charcoal-650 px-1.5 py-0.5 rounded bg-charcoal-750">
              NSQF Aligned
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
            Prior Learning Verification & Certification
          </p>
        </div>

        {/* Quick Launch CTA */}
        <div className="mx-4 mt-3">
          <button
            onClick={() => {
              navigate('/assessments/start');
              onClose();
            }}
            className="group flex w-full items-center justify-between rounded-xl bg-gradient-to-r from-gold-500 to-amber-500 px-3.5 py-2.5 text-xs font-bold text-charcoal-950 shadow-md shadow-gold-500/20 transition-all duration-200 hover:brightness-105 active:scale-[0.98]"
          >
            <span className="flex items-center gap-2">
              <PlayCircle className="h-4 w-4 stroke-[2.5]" />
              Start Assessment
            </span>
            <span className="rounded-md bg-charcoal-950/10 px-1.5 py-0.5 text-[10px]">
              AI Mode
            </span>
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Navigation Menu
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `group flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-gold-500/15 text-gold-300 font-semibold border-r-2 border-gold-400 shadow-sm'
                      : 'text-slate-300 hover:bg-charcoal-800 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`h-4.5 w-4.5 transition-colors ${
                          isActive ? 'text-gold-400' : 'text-slate-400 group-hover:text-slate-200'
                        }`}
                      />
                      <span>{item.name}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          isActive
                            ? 'bg-gold-500/30 text-gold-200'
                            : 'bg-charcoal-750 text-slate-300 border border-charcoal-700'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}

                    {item.isVerified && (
                      <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/20">
                        <ShieldCheck className="h-3 w-3" />
                        Verified
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* RPL Info Card */}
        <div className="mx-4 mb-3 rounded-xl bg-charcoal-800/50 border border-charcoal-700/50 p-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-300">NSQF Target</span>
            <span className="text-[11px] font-bold text-gold-400">Level 4</span>
          </div>
          <div className="mt-1.5 h-1.5 w-full rounded-full bg-charcoal-700 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-gold-500 to-amber-400 rounded-full" style={{ width: '78%' }} />
          </div>
          <div className="mt-1.5 flex justify-between text-[10px] text-slate-400">
            <span>78% credits recognized</span>
            <NavLink to="/qualifications" className="text-gold-400 hover:underline flex items-center gap-0.5">
              Matrix <ExternalLink className="h-2.5 w-2.5" />
            </NavLink>
          </div>
        </div>

        {/* Footer: Theme Toggle & User Profile */}
        <div className="border-t border-charcoal-700/60 p-4 space-y-3 bg-[#111319]">
          {/* Light/Dark Toggle */}
          <button
            onClick={toggleTheme}
            className="flex w-full items-center justify-between rounded-xl bg-charcoal-800/80 px-3 py-2 text-xs font-medium text-slate-300 hover:bg-charcoal-750 hover:text-white transition-all border border-charcoal-700/60"
            title="Toggle Light or Dark Mode"
          >
            <span className="flex items-center gap-2">
              {theme === 'dark' ? (
                <Moon className="h-4 w-4 text-gold-400" />
              ) : (
                <Sun className="h-4 w-4 text-amber-400" />
              )}
              <span>Theme: {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
            </span>
            <span className="rounded bg-charcoal-700 px-1.5 py-0.5 text-[10px] uppercase font-mono text-slate-300">
              {theme}
            </span>
          </button>

          {/* User Profile Card */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative shrink-0">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-gold-500 to-amber-600 flex items-center justify-center text-charcoal-950 font-bold text-xs shadow-md overflow-hidden ring-1 ring-gold-400/40 font-heading">
                  {(user?.name || 'C').charAt(0).toUpperCase()}
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-[#111319]" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="truncate text-xs font-bold text-white">
                  {user?.name || 'Welcome to SkillSetu AI'}
                </h4>
                <p className="truncate text-[10px] text-slate-400">
                  {user?.role === 'assessor'
                    ? 'Accredited Assessor'
                    : (user?.onboardingData?.primaryTrade || 'General Electrician')}
                </p>
                <p className="text-[10px] font-mono text-gold-400/90">
                  {user?.rplId || 'RPL-2026-9428'}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-charcoal-750 transition"
              title="Log out to landing page"
              aria-label="Log Out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
