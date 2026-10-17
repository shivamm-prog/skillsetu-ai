import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { mockQualifications } from '../data/mockData';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';

export const QualificationsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">
              NSQF Qualification Packs
            </h1>
            <Badge variant="gold" size="sm">
              MSDE / NSDC Aligned
            </Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Explore mapped Qualification Packs (QP) and National Occupational Standards (NOS) based on
            your prior learning experience.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => navigate('/skill-passport')}
          icon={<ShieldCheck className="h-4 w-4" />}
        >
          View Skill Passport
        </Button>
      </div>

      {/* Qualifications List */}
      <div className="space-y-4">
        {mockQualifications.map((qp) => {
          const progressPercent = Math.round((qp.demonstratedNOS / qp.totalNOS) * 100);

          return (
            <Card key={qp.qpCode} variant="white" hoverEffect className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                {/* QP Info */}
                <div className="space-y-2 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-black text-gold-700 dark:text-gold-400 bg-gold-500/15 px-2 py-0.5 rounded border border-gold-500/25">
                      {qp.qpCode}
                    </span>
                    <Badge variant="charcoal" size="sm">
                      NSQF Level {qp.nsqfLevel}
                    </Badge>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Sector: {qp.sector}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    {qp.roleName}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {qp.description}
                  </p>

                  <div className="flex flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1">
                    <span>
                      Prior Experience Required: <strong>{qp.minimumExperienceMonths / 12} Years</strong>
                    </span>
                    <span>•</span>
                    <span>
                      NOS Units Demonstrated: <strong>{qp.demonstratedNOS} / {qp.totalNOS}</strong>
                    </span>
                  </div>
                </div>

                {/* Progress & Actions */}
                <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-4 lg:min-w-[240px]">
                  <div className="w-full sm:w-48 lg:w-full space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-600 dark:text-slate-300">RPL Readiness</span>
                      <span className="text-gold-600 dark:text-gold-400 font-bold">
                        {progressPercent}%
                      </span>
                    </div>
                    <ProgressBar
                      value={progressPercent}
                      color={progressPercent >= 80 ? 'emerald' : 'gold'}
                      height="sm"
                    />
                    <div className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                      {qp.status}
                    </div>
                  </div>

                  <Button
                    variant={qp.status === 'Eligible for Certification' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => {
                      if (qp.status === 'Eligible for Certification') {
                        navigate('/skill-passport');
                      } else {
                        navigate('/assessments/start');
                      }
                    }}
                    className="w-full sm:w-auto lg:w-full"
                    icon={<ArrowRight className="h-3.5 w-3.5" />}
                    iconPosition="right"
                  >
                    {qp.status === 'Eligible for Certification' ? 'Claim Credential' : 'Fill NOS Gap'}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
