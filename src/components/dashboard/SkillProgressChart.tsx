import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { Sparkles, CheckCircle2, AlertTriangle, FileClock } from 'lucide-react';
import { mockProgressData } from '../../data/mockData';
import { Card } from '../ui/Card';

export const SkillProgressChart: React.FC = () => {
  const totalCompetencies = mockProgressData.reduce((acc, curr) => acc + curr.value, 0);
  const demonstratedPercentage = 62; // 18 out of 29

  // Colors aligned with the warm gold & charcoal aesthetic
  // Demonstrated: #CA9A36 (warm gold)
  // Further evaluation: #1F2228 (dark charcoal)
  // Evidence pending: #D1C5AE (warm cream/beige)
  const COLORS = ['#CA9A36', '#262A33', '#C7BC9F'];

  const customTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="rounded-xl border border-stone-200 bg-white/95 p-3 shadow-lg backdrop-blur-sm dark:border-charcoal-700 dark:bg-charcoal-800/95">
          <p className="text-xs font-bold text-slate-800 dark:text-white">{data.name}</p>
          <div className="mt-1 flex items-center justify-between gap-4 text-xs">
            <span className="text-slate-500 dark:text-slate-400">Competencies:</span>
            <span className="font-bold text-slate-900 dark:text-white">
              {data.value} units ({data.percentage}%)
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card variant="white" className="flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-stone-100 pb-4 dark:border-charcoal-700">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              My Skill Progress
            </h3>
            <span className="rounded bg-gold-500/15 px-2 py-0.5 text-[10px] font-bold text-gold-700 dark:bg-gold-500/20 dark:text-gold-300">
              RPL Diagnostic
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time competency mapping against National Occupational Standards
          </p>
        </div>
        <div className="text-right hidden sm:block">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Total Tracked NOS
          </span>
          <p className="text-sm font-extrabold text-slate-900 dark:text-white">
            {totalCompetencies} Competencies
          </p>
        </div>
      </div>

      {/* Chart & Legend Grid */}
      <div className="grid grid-cols-1 items-center gap-6 py-4 md:grid-cols-12">
        {/* Recharts Donut Area */}
        <div className="relative h-60 w-full md:col-span-6 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={mockProgressData}
                cx="50%"
                cy="50%"
                innerRadius={68}
                outerRadius={95}
                paddingAngle={4}
                dataKey="value"
                strokeWidth={0}
              >
                {mockProgressData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    className="transition-opacity duration-200 hover:opacity-80 cursor-pointer"
                  />
                ))}
              </Pie>
              <Tooltip content={customTooltip} />
            </PieChart>
          </ResponsiveContainer>

          {/* Donut Center Display */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              {demonstratedPercentage}%
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Recognized
            </span>
          </div>
        </div>

        {/* Detailed Legend & Insights */}
        <div className="flex flex-col justify-center space-y-3 md:col-span-6">
          {mockProgressData.map((item, index) => {
            const icons = [CheckCircle2, AlertTriangle, FileClock];
            const Icon = icons[index];
            const bulletColors = [
              'bg-gold-500 text-charcoal-950',
              'bg-charcoal-800 text-white dark:bg-charcoal-600',
              'bg-stone-300 text-stone-700 dark:bg-stone-600 dark:text-stone-200',
            ];

            return (
              <div
                key={item.name}
                className="flex items-center justify-between rounded-xl border border-stone-100 bg-[#FAF8F3] p-3 transition-colors hover:border-gold-300 dark:border-charcoal-700/60 dark:bg-charcoal-750/70"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold ${bulletColors[index]}`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {item.value} units mapped
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                    {item.percentage}%
                  </span>
                  <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                    of total
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Context Footnote */}
      <div className="mt-auto flex items-center gap-2 rounded-xl bg-gold-50/70 p-3 text-xs text-gold-900 dark:bg-charcoal-750/50 dark:text-gold-200 border border-gold-200/50 dark:border-charcoal-700">
        <Sparkles className="h-4 w-4 shrink-0 text-gold-600 dark:text-gold-400" />
        <p className="line-clamp-1">
          <strong className="font-semibold">AI Recommendation:</strong> 4 more demonstrated units
          will qualify you directly for NSQF Level 4 Government Certification.
        </p>
      </div>
    </Card>
  );
};
