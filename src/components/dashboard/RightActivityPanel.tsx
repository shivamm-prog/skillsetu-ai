import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  Video,
  Mic,
  Camera,
} from 'lucide-react';
import {
  mockUpcomingAssessments,
  mockPendingEvidence,
  mockNextSteps,
} from '../../data/mockData';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

export const RightActivityPanel: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* 1. UPCOMING ASSESSMENTS */}
      <Card variant="white" className="p-5">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3 dark:border-charcoal-700">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gold-500/15 text-gold-700 dark:bg-gold-500/20 dark:text-gold-300">
              <Calendar className="h-4 w-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Upcoming Assessments
            </h3>
          </div>
          <span className="rounded-full bg-gold-100 px-2 py-0.5 text-[10px] font-bold text-gold-800 dark:bg-gold-900/40 dark:text-gold-300">
            {mockUpcomingAssessments.length} Scheduled
          </span>
        </div>

        <div className="mt-3 space-y-3">
          {mockUpcomingAssessments.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-stone-100 bg-[#FCFAF5] p-3 transition-all hover:border-gold-300 hover:shadow-sm dark:border-charcoal-700/70 dark:bg-charcoal-750/70"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-gold-700 dark:text-gold-300">
                  {item.type === 'Practical Viva' ? (
                    <Video className="h-3 w-3" />
                  ) : (
                    <Mic className="h-3 w-3" />
                  )}
                  {item.type}
                </span>
                <span className="rounded bg-white px-2 py-0.5 text-[10px] font-semibold text-slate-600 shadow-2xs dark:bg-charcoal-700 dark:text-slate-300">
                  {item.durationMinutes} mins
                </span>
              </div>

              <h4 className="mt-1.5 text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                {item.title}
              </h4>

              <div className="mt-2 flex items-center justify-between border-t border-stone-100 pt-2 text-[11px] text-slate-500 dark:border-charcoal-700/60 dark:text-slate-400">
                <span className="flex items-center gap-1 font-medium">
                  <Clock className="h-3 w-3 text-gold-600 dark:text-gold-400" />
                  {item.scheduledDate}
                </span>
                <span className="text-[10px] truncate max-w-[120px]" title={item.assessorName}>
                  {item.assessorName}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* 2. EVIDENCE AWAITING VERIFICATION */}
      <Card variant="white" className="p-5">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3 dark:border-charcoal-700">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/15 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300">
              <Camera className="h-4 w-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Evidence Awaiting Verification
            </h3>
          </div>
          <button
            onClick={() => navigate('/evidence-vault')}
            className="text-[11px] font-semibold text-gold-600 hover:text-gold-700 dark:text-gold-400 hover:underline"
          >
            Vault
          </button>
        </div>

        <div className="mt-3 space-y-3">
          {mockPendingEvidence.map((evidence) => (
            <div
              key={evidence.id}
              className="rounded-xl border border-stone-100 bg-[#FCFAF5] p-3 transition-all hover:border-gold-300 hover:shadow-sm dark:border-charcoal-700/70 dark:bg-charcoal-750/70"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  {evidence.evidenceType}
                </span>
                <Badge
                  variant={evidence.status === 'AI Verified' ? 'emerald' : 'amber'}
                  size="sm"
                >
                  {evidence.status}
                </Badge>
              </div>

              <h4 className="mt-1 text-xs font-bold text-slate-800 dark:text-white">
                {evidence.title}
              </h4>

              <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span>Submitted: {evidence.submittedOn}</span>
                <span className="text-[10px] font-mono text-gold-600 dark:text-gold-400">
                  {evidence.id}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* 3. RECOMMENDED NEXT STEPS */}
      <Card variant="white" className="p-5">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3 dark:border-charcoal-700">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
              <Sparkles className="h-4 w-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Recommended Next Steps
            </h3>
          </div>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
            AI Guidance
          </span>
        </div>

        <div className="mt-3 space-y-3">
          {mockNextSteps.map((step) => (
            <div
              key={step.id}
              className="rounded-xl border border-stone-100 bg-[#FCFAF5] p-3 transition-all hover:border-gold-300 hover:shadow-sm dark:border-charcoal-700/70 dark:bg-charcoal-750/70"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider ${
                    step.priority === 'high'
                      ? 'text-amber-600 dark:text-amber-400'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {step.priority === 'high' ? 'High Priority' : 'Recommended'}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  ~{step.estimatedMinutes} mins
                </span>
              </div>

              <h4 className="mt-1 text-xs font-bold text-slate-900 dark:text-white">
                {step.title}
              </h4>
              <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                {step.description}
              </p>

              <button
                onClick={() => navigate(step.actionLink)}
                className="mt-2.5 flex w-full items-center justify-between rounded-lg bg-white px-2.5 py-1.5 text-xs font-bold text-gold-700 shadow-2xs hover:bg-gold-50 dark:bg-charcoal-700 dark:text-gold-300 dark:hover:bg-charcoal-650 transition-colors border border-stone-200/80 dark:border-charcoal-600"
              >
                <span>{step.actionText}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
