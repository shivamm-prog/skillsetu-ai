import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Clock,
  Award,
} from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

export const WelcomeCard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const firstName = user?.name ? user.name.trim().split(' ')[0] : '';
  const greeting = firstName ? `Welcome back, ${firstName}!` : 'Welcome to SkillSetu AI';
  const primaryTrade = user?.onboardingData?.primaryTrade || 'General Electrician';
  const experienceYears = user?.onboardingData?.experienceYears || 'Prior';
  const completion = user?.entryAssessment?.completed ? 85 : (user?.onboardingCompleted ? 60 : 35);
  const verifiedCount = user?.verifiedCompetencies?.length || (user?.entryAssessment?.completed ? 1 : 0);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-stone-200/90 bg-gradient-to-r from-[#FFFFFF] via-[#FDFBF7] to-[#F9F5EA] p-6 sm:p-8 shadow-soft dark:border-charcoal-700 dark:from-charcoal-800 dark:via-charcoal-850 dark:to-charcoal-900 transition-all duration-300">
      {/* Decorative Golden Ambient Gradients */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold-400/15 blur-3xl dark:bg-gold-500/10" />
      <div className="pointer-events-none absolute right-1/3 -bottom-16 h-48 w-48 rounded-full bg-amber-400/10 blur-2xl dark:bg-amber-600/10" />

      <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Left Column: Greeting & RPL Subtitle */}
        <div className="max-w-2xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-500/15 px-3 py-1 text-xs font-bold text-gold-700 dark:bg-gold-500/20 dark:text-gold-300 border border-gold-500/30">
              <Sparkles className="h-3.5 w-3.5 text-gold-600 dark:text-gold-400" />
              Prior Learning Pathway • NSQF Level 4
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              National Skill Registry Verified
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white font-heading">
              {greeting}
            </h1>
            <p className="mt-1.5 text-base sm:text-lg text-slate-600 dark:text-slate-300 font-medium">
              Turn your experience into recognized skills.
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Your {experienceYears} of hands-on {primaryTrade} experience are being mapped to
            National Occupational Standards (NOS). Complete your pending viva to unlock your official
            Government-recognized digital certification.
          </p>

          {/* Quick RPL highlights */}
          <div className="flex flex-wrap gap-4 pt-1 text-xs text-slate-600 dark:text-slate-300 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span>{verifiedCount} Verified Competencies</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award className="h-4 w-4 text-gold-600 dark:text-gold-400" />
              <span>Target Trade: {primaryTrade}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <span>Diagnostic: {user?.entryAssessment?.completed ? `${user.entryAssessment.score}% Score` : 'Pending'}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Profile completion & Start Assessment CTA */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-4 rounded-2xl bg-white/70 p-5 backdrop-blur-md dark:bg-charcoal-750/70 border border-stone-200/80 dark:border-charcoal-700 sm:w-auto lg:min-w-[280px]">
          {/* Profile Completion Indicator */}
          <div className="w-full sm:w-48 lg:w-full">
            <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
              <span className="text-slate-600 dark:text-slate-300">Profile Completion</span>
              <span className="text-gold-600 dark:text-gold-400 font-bold">
                {completion}%
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-stone-200 dark:bg-charcoal-700 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-gold-500 to-amber-400 transition-all duration-700 ease-out"
                style={{ width: `${completion}%` }}
              />
            </div>
            <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
              {user?.entryAssessment?.completed ? 'Entry level completed • Practical ready' : 'Onboarding & diagnostic pending'}
            </p>
          </div>

          {/* Prominent Start Assessment Button */}
          <Button
            variant="primary"
            size="lg"
            onClick={() => {
              if (!user?.onboardingCompleted) {
                navigate('/onboarding');
              } else if (!user?.entryAssessment?.completed) {
                navigate('/entry-assessment');
              } else {
                navigate('/courses');
              }
            }}
            className="w-full sm:w-auto lg:w-full justify-between shadow-lg shadow-gold-500/25 hover:shadow-gold-500/35 group cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="h-4.5 w-4.5 text-charcoal-950" />
              <span>
                {!user?.onboardingCompleted
                  ? 'Complete Onboarding'
                  : !user?.entryAssessment?.completed
                  ? 'Take Skill Assessment'
                  : 'View Courses'}
              </span>
            </span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};
