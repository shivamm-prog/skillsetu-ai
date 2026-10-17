import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Award,
  Check,
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useAuth } from '../context/AuthContext';
import { courseCatalog } from '../data/coursesAndAssessments';

export const CourseDetailPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const course = courseCatalog.find((c) => c.id === courseId) || courseCatalog[0];

  const enrolledState = (user?.enrolledCourses || []).find((c) => c.courseId === course.id);
  const [completedModules, setCompletedModules] = useState<string[]>(
    enrolledState?.completedModules || ['m1']
  );

  const toggleModule = (modId: string) => {
    setCompletedModules((prev) =>
      prev.includes(modId) ? prev.filter((id) => id !== modId) : [...prev, modId]
    );
  };

  const totalMods = course.modules.length;
  const progressPercent = Math.round((completedModules.length / totalMods) * 100);

  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">
      {/* Back button */}
      <div>
        <button
          onClick={() => navigate('/courses')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-gold-700 transition"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Courses
        </button>
      </div>

      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-stone-200 bg-gradient-to-br from-[#1C1F28] via-[#14161E] to-[#0E1015] p-6 sm:p-8 text-white shadow-xl">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold-500/15 blur-3xl" />
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded bg-gold-500/20 px-2.5 py-0.5 text-xs font-bold text-gold-400 border border-gold-500/30">
              {course.trade}
            </span>
            <Badge variant="gold" size="sm">
              Level: {course.level}
            </Badge>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {course.duration}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-heading">
            {course.title}
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {course.description}
          </p>

          {/* Progress bar */}
          <div className="pt-2 max-w-md space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-300">Course Learning Progress</span>
              <span className="text-gold-400 font-bold">{progressPercent}% Completed</span>
            </div>
            <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-gold-500 to-amber-400 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Modules & Practical Task */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Learning Modules (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <Card variant="white" className="p-6 space-y-4">
            <div className="border-b border-stone-100 dark:border-charcoal-700 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">
                  Curriculum & Learning Modules
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Review simulated instructional content and mark modules as completed.
                </p>
              </div>
              <span className="text-xs font-bold text-slate-400">
                {completedModules.length}/{totalMods}
              </span>
            </div>

            <div className="space-y-3">
              {course.modules.map((mod, idx) => {
                const isDone = completedModules.includes(mod.id);

                return (
                  <div
                    key={mod.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      isDone
                        ? 'border-emerald-500/30 bg-emerald-50/30 dark:bg-emerald-950/20'
                        : 'border-stone-200 dark:border-charcoal-700 bg-stone-50/50 dark:bg-charcoal-800'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono font-bold text-gold-600 dark:text-gold-400">
                            Module {idx + 1}
                          </span>
                          <span className="text-[10px] text-slate-400">• {mod.duration}</span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          {mod.title}
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                          {mod.description}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleModule(mod.id)}
                        className={`p-1.5 rounded-xl border transition ${
                          isDone
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'border-stone-300 dark:border-charcoal-600 text-slate-400 hover:border-slate-500'
                        }`}
                        title={isDone ? 'Mark as incomplete' : 'Mark as completed'}
                      >
                        <Check className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-stone-200/50 dark:border-charcoal-700/50 flex flex-wrap gap-1.5">
                      {mod.topics.map((t, i) => (
                        <span
                          key={i}
                          className="rounded bg-white dark:bg-charcoal-700 px-2 py-0.5 text-[10px] font-medium text-slate-600 dark:text-slate-300 border border-stone-200 dark:border-charcoal-600"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Right Column: Practical Assessment Assignment (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <Card variant="white" className="p-6 space-y-4 border-gold-500/30 shadow-soft">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-2xl bg-gold-500/15 text-gold-700">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-gold-700 uppercase tracking-wider block">
                  Mandatory for Assessor Endorsement
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">
                  Practical Workplace Task
                </h3>
              </div>
            </div>

            <div className="rounded-xl border border-stone-200 dark:border-charcoal-700 bg-stone-50 dark:bg-charcoal-800 p-4 space-y-2">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                {course.practicalTask.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {course.practicalTask.description}
              </p>
            </div>

            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <span className="font-bold text-slate-800 dark:text-slate-200 block">
                Task Requirements:
              </span>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Confirm safety & PPE protocols</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Answer 2 practical diagnosis questions</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Upload authentic work proof (photo or video)</span>
              </div>
            </div>

            <div className="pt-2">
              <Button
                variant="primary"
                size="lg"
                className="w-full justify-between shadow-elevated font-black"
                onClick={() => navigate(`/practical-assessment/${course.id}`)}
                icon={<ArrowRight className="h-4 w-4" />}
                iconPosition="right"
              >
                <span>Launch Practical Assessment</span>
              </Button>
            </div>

            <p className="text-[10px] text-slate-400 dark:text-slate-400 text-center">
              Your submission will be queued directly into the accredited Assessor Terminal for official scoring.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};
