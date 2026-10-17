import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronRight,
  Clock,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { mockRecentAssessments } from '../../data/mockData';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';

export const RecentAssessmentsTable: React.FC = () => {
  const navigate = useNavigate();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return (
          <Badge variant="emerald" size="sm" icon={<CheckCircle2 className="h-3 w-3" />}>
            Verified
          </Badge>
        );
      case 'Under Review':
        return (
          <Badge variant="amber" size="sm" icon={<Clock className="h-3 w-3" />}>
            Under Review
          </Badge>
        );
      case 'In Progress':
        return (
          <Badge variant="gold" size="sm" icon={<Clock className="h-3 w-3" />}>
            In Progress
          </Badge>
        );
      default:
        return <Badge variant="neutral" size="sm">{status}</Badge>;
    }
  };

  return (
    <Card variant="white" className="flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-stone-100 pb-4 dark:border-charcoal-700">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Recent Assessments
            </h3>
            <span className="rounded-full bg-stone-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600 dark:bg-charcoal-700 dark:text-slate-300">
              {mockRecentAssessments.length} Total
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Prior learning assessments mapped to Qualification Packs (QP)
          </p>
        </div>

        <button
          onClick={() => navigate('/assessments')}
          className="flex items-center gap-1 text-xs font-semibold text-gold-600 hover:text-gold-700 dark:text-gold-400 dark:hover:text-gold-300 transition-colors"
        >
          <span>View All</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Assessment List / Table */}
      <div className="divide-y divide-stone-100 dark:divide-charcoal-700/70">
        {mockRecentAssessments.map((assessment) => (
          <div
            key={assessment.id}
            onClick={() => {
              if (assessment.status === 'In Progress') {
                navigate('/assessments/start');
              } else {
                navigate('/assessments');
              }
            }}
            className="group flex flex-col gap-3 py-4 transition-colors hover:bg-cream-50/50 dark:hover:bg-charcoal-750/50 sm:flex-row sm:items-center sm:justify-between px-2 -mx-2 rounded-xl cursor-pointer"
          >
            {/* Title & Metadata */}
            <div className="min-w-0 flex-1 space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
                  {assessment.title}
                </span>
                <span className="rounded bg-stone-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600 dark:bg-charcoal-700 dark:text-slate-300">
                  NSQF L{assessment.nsqfLevel}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-mono text-[11px] text-gold-700 dark:text-gold-400">
                  {assessment.nosCode}
                </span>
                <span>•</span>
                <span>Trade: {assessment.trade}</span>
                <span>•</span>
                <span>{assessment.date}</span>
                {assessment.score && (
                  <>
                    <span>•</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      Score: {assessment.score}%
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Status & Progress Indicators */}
            <div className="flex items-center justify-between sm:justify-end gap-5">
              <div className="w-32 sm:w-28 space-y-1">
                <div className="flex justify-between text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  <span>Progress</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {assessment.progress}%
                  </span>
                </div>
                <ProgressBar
                  value={assessment.progress}
                  color={assessment.progress === 100 ? 'emerald' : 'gold'}
                  height="sm"
                />
              </div>

              <div className="flex items-center gap-3">
                {getStatusBadge(assessment.status)}
                <div className="hidden sm:flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 bg-white text-slate-400 shadow-sm transition-all group-hover:border-gold-500 group-hover:text-gold-600 dark:border-charcoal-700 dark:bg-charcoal-800 dark:group-hover:text-gold-400">
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="mt-3 flex items-center justify-between border-t border-stone-100 pt-3 text-xs text-slate-500 dark:border-charcoal-700 dark:text-slate-400">
        <span>Assessed against NSDC QP & NOS Standards 2026</span>
        <button
          onClick={() => navigate('/assessments/start')}
          className="font-semibold text-gold-600 hover:text-gold-700 dark:text-gold-400 dark:hover:text-gold-300 flex items-center gap-1"
        >
          <span>Take New Assessment</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </Card>
  );
};
