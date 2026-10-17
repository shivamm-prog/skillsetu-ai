import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  Award,
  Clock,
  Briefcase,
  TrendingUp,
  ArrowUpRight,
} from 'lucide-react';

export const StatsOverview: React.FC = () => {
  const navigate = useNavigate();

  const stats = [
    {
      id: 'completed',
      title: 'Assessments Completed',
      value: '3',
      subtext: '+1 this week',
      trend: '100% pass rate',
      icon: CheckCircle2,
      iconBg: 'bg-emerald-500/15 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300',
      borderColor: 'border-emerald-500/20',
      path: '/assessments?filter=completed',
    },
    {
      id: 'verified',
      title: 'Competencies Verified',
      value: '12',
      subtext: 'Out of 18 NOS Units',
      trend: '67% towards Level 4',
      icon: Award,
      iconBg: 'bg-gold-500/15 text-gold-700 dark:bg-gold-500/20 dark:text-gold-300',
      borderColor: 'border-gold-500/20',
      path: '/qualifications',
    },
    {
      id: 'review',
      title: 'Assessments Awaiting Review',
      value: '2',
      subtext: '1 AI Queued • 1 Assessor',
      trend: 'Avg turnaround: 24h',
      icon: Clock,
      iconBg: 'bg-amber-500/15 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300',
      borderColor: 'border-amber-500/20',
      path: '/assessments?filter=review',
    },
    {
      id: 'opportunities',
      title: 'Matched Opportunities',
      value: '8',
      subtext: '4 Jobs • 2 Apprenticeships • 2 Govt Schemes',
      trend: 'Up to ₹38k / month',
      icon: Briefcase,
      iconBg: 'bg-blue-500/15 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300',
      borderColor: 'border-blue-500/20',
      path: '/opportunities',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.id}
            onClick={() => navigate(stat.path)}
            className="group cursor-pointer rounded-2xl border border-stone-200/80 bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/60 hover:shadow-premium dark:border-charcoal-700 dark:bg-charcoal-800"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {stat.title}
              </span>
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${stat.iconBg}`}
              >
                <Icon className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                {stat.value}
              </span>
              <span className="flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <TrendingUp className="mr-0.5 h-3 w-3" />
                {stat.trend}
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-stone-100 pt-3 dark:border-charcoal-700/60">
              <span className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                {stat.subtext}
              </span>
              <span className="text-slate-400 transition-colors group-hover:text-gold-600 dark:group-hover:text-gold-400">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
