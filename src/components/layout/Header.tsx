import React, { useState } from 'react';
import {
  Menu,
  Bell,
  Search,
  Globe,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  onOpenSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSidebar }) => {
  const { user } = useAuth();
  const [selectedLang, setSelectedLang] = useState('Hindi (हिंदी) / English');
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    {
      id: 1,
      title: 'Assessor Review Scheduled',
      time: 'Tomorrow, 2:30 PM',
      desc: 'Practical viva with Sector Assessor Dr. V. K. Nambiar',
      icon: Clock,
      unread: true,
    },
    {
      id: 2,
      title: 'Evidence Verified by AI Vision',
      time: '2 hours ago',
      desc: 'Distribution Board photo matched 98% NSQF standards',
      icon: CheckCircle2,
      unread: true,
    },
    {
      id: 3,
      title: 'New Scheme Opportunity',
      time: '1 day ago',
      desc: 'PM Vishwakarma ₹15,000 toolkit voucher unlocked',
      icon: Sparkles,
      unread: false,
    },
  ];

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-stone-200/80 bg-cream-50/80 px-4 backdrop-blur-md dark:border-charcoal-700/80 dark:bg-charcoal-900/80 sm:px-6 lg:px-8">
      {/* Left section: Hamburger & Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="rounded-xl border border-stone-200 p-2 text-slate-600 hover:bg-stone-100 hover:text-slate-900 dark:border-charcoal-700 dark:text-slate-300 dark:hover:bg-charcoal-800 lg:hidden"
          aria-label="Open Navigation"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-lg bg-gold-500/10 px-2.5 py-1 text-xs font-semibold text-gold-700 dark:bg-gold-500/20 dark:text-gold-300 border border-gold-500/20">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
            SIH 2026: Problem 26242
          </div>
          <span className="text-stone-300 dark:text-charcoal-700">/</span>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            AI-Assisted RPL Platform
          </span>
        </div>
      </div>

      {/* Center/Right controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Search Input (Hidden on extra small screens) */}
        <div className="relative hidden md:block w-48 lg:w-64">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search competencies, NOS, skills..."
            className="w-full rounded-xl border border-stone-200/90 bg-white/90 py-1.5 pl-9 pr-3 text-xs text-slate-800 placeholder-slate-400 shadow-sm outline-none transition-all focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 dark:border-charcoal-700 dark:bg-charcoal-800/90 dark:text-slate-200"
          />
        </div>

        {/* Regional Language Switcher */}
        <div className="relative">
          <select
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value)}
            className="appearance-none rounded-xl border border-stone-200/90 bg-white/90 py-1.5 pl-7 pr-7 text-xs font-medium text-slate-700 shadow-sm outline-none transition-all hover:border-gold-500 focus:border-gold-500 dark:border-charcoal-700 dark:bg-charcoal-800 dark:text-slate-200 cursor-pointer"
          >
            <option>Hindi (हिंदी) / English</option>
            <option>English only</option>
            <option>Marathi (मराठी)</option>
            <option>Tamil (தமிழ்)</option>
            <option>Bengali (বাংলা)</option>
          </select>
          <Globe className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 pointer-events-none text-slate-400" />
        </div>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative rounded-xl border border-stone-200/90 bg-white p-2 text-slate-600 shadow-sm hover:border-gold-500 hover:text-slate-900 dark:border-charcoal-700 dark:bg-charcoal-800 dark:text-slate-300 dark:hover:text-white transition-all"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold-500 text-[10px] font-bold text-charcoal-950">
              2
            </span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-stone-200 bg-white p-3 shadow-xl dark:border-charcoal-700 dark:bg-charcoal-800 z-50">
              <div className="flex items-center justify-between border-b border-stone-100 pb-2 dark:border-charcoal-700">
                <span className="text-xs font-bold text-slate-800 dark:text-white">
                  Notifications & Alerts
                </span>
                <span className="text-[10px] font-semibold text-gold-600 dark:text-gold-400 cursor-pointer hover:underline">
                  Mark all read
                </span>
              </div>
              <div className="mt-2 space-y-2">
                {notifications.map((n) => {
                  const Icon = n.icon;
                  return (
                    <div
                      key={n.id}
                      className="flex gap-2.5 rounded-xl p-2 hover:bg-stone-50 dark:hover:bg-charcoal-750 transition-colors cursor-pointer"
                    >
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gold-500/10 text-gold-600 dark:bg-gold-500/20 dark:text-gold-400">
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                          {n.title}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                          {n.desc}
                        </p>
                        <span className="text-[10px] text-slate-400">{n.time}</span>
                      </div>
                      {n.unread && (
                        <span className="h-2 w-2 rounded-full bg-gold-500 mt-1 shrink-0" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Landing Page Navigation */}
        <Link
          to="/"
          className="hidden sm:flex items-center gap-1 rounded-xl border border-stone-200 px-2.5 py-1 text-xs font-semibold text-slate-600 hover:text-gold-700 hover:bg-stone-100 dark:border-charcoal-700 dark:text-slate-300 dark:hover:bg-charcoal-800 transition"
          title="Go to Public Landing Page"
        >
          <span>Landing Page</span>
          <ExternalLink className="h-3 w-3" />
        </Link>

        {/* Verification Status Badge */}
        <div className={`hidden lg:flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs ${
          user?.role === 'assessor'
            ? 'bg-gold-500/15 border border-gold-500/30 text-gold-800 dark:text-gold-300'
            : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300'
        }`}>
          <span className={`h-2 w-2 rounded-full animate-pulse ${
            user?.role === 'assessor' ? 'bg-gold-500' : 'bg-emerald-500'
          }`} />
          <span className="font-semibold">
            {user?.role === 'assessor' ? 'Assessor' : 'Candidate'}: {user?.rplId || 'RPL-2026-9428'}
          </span>
        </div>
      </div>
    </header>
  );
};
