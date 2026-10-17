import React from 'react';
import {
  ShieldCheck,
  UploadCloud,
  FileCheck2,
  UserCheck,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { mockRecentActivities } from '../../data/mockData';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

export const RecentActivityFeed: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />;
      case 'UploadCloud':
        return <UploadCloud className="h-4 w-4 text-gold-600 dark:text-gold-400" />;
      case 'FileCheck2':
        return <FileCheck2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />;
      case 'UserCheck':
        return <UserCheck className="h-4 w-4 text-purple-600 dark:text-purple-400" />;
      default:
        return <CheckCircle2 className="h-4 w-4 text-gold-600 dark:text-gold-400" />;
    }
  };

  const getIconContainerBg = (type: string) => {
    switch (type) {
      case 'assessment':
        return 'bg-emerald-500/15 border-emerald-500/20';
      case 'evidence':
        return 'bg-gold-500/15 border-gold-500/20';
      case 'qualification':
        return 'bg-blue-500/15 border-blue-500/20';
      case 'assessor':
        return 'bg-purple-500/15 border-purple-500/20';
      default:
        return 'bg-stone-100 border-stone-200';
    }
  };

  return (
    <Card variant="white" className="p-5">
      <div className="flex items-center justify-between border-b border-stone-100 pb-3 dark:border-charcoal-700">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Recent Activity
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time audit log of candidate assessments & evidence verifications
          </p>
        </div>
        <span className="flex items-center gap-1.5 text-xs text-slate-400">
          <Clock className="h-3.5 w-3.5" />
          Live Log
        </span>
      </div>

      <div className="mt-4 space-y-4">
        {mockRecentActivities.map((act) => (
          <div
            key={act.id}
            className="flex items-start gap-3.5 group rounded-xl p-2 hover:bg-[#FCFAF5] dark:hover:bg-charcoal-750/50 transition-colors"
          >
            {/* Icon Bubble */}
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border mt-0.5 ${getIconContainerBg(
                act.type
              )}`}
            >
              {getIcon(act.iconName)}
            </div>

            {/* Details */}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-1">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
                  {act.title}
                </h4>
                <span className="text-[10px] text-slate-400">{act.timestamp}</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5 line-clamp-2">
                {act.description}
              </p>
            </div>

            {/* Pill Badge */}
            <Badge variant="neutral" size="sm" className="hidden sm:inline-flex shrink-0">
              {act.badge}
            </Badge>
          </div>
        ))}
      </div>
    </Card>
  );
};
