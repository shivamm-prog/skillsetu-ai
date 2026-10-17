import React, { useState } from 'react';
import {
  BadgeCheck,
  Download,
  Share2,
  ShieldCheck,
  Award,
  QrCode,
  CheckCircle2,
  User,
  Sparkles,
  FileCheck2,
  BookOpen,
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { courseCatalog } from '../data/coursesAndAssessments';

export const SkillPassportPage: React.FC = () => {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fullName = user?.name || 'Skilled Candidate';
  const primaryTrade = user?.onboardingData?.primaryTrade || 'General Electrician';
  const experience = user?.onboardingData?.experienceYears || '5–10 years';
  const rplId = user?.rplId || 'RPL-2026-9428';
  const location = user?.onboardingData ? `${user.onboardingData.district}, ${user.onboardingData.state}` : 'Jaipur, Rajasthan';

  const entryAssessment = user?.entryAssessment;
  const enrolledCourses = user?.enrolledCourses || [];
  const submissions = user?.practicalSubmissions || [];
  const verifiedCompetencies = user?.verifiedCompetencies || [];

  const selfDeclaredTasks = user?.onboardingData?.performedTasks || [
    'Concealed wiring & conduits',
    'Main distribution board assembly',
    'Earth pit testing & earthing',
  ];

  const additionalSkills = user?.onboardingData?.additionalSkills || [
    'Multimeter & diagnostic tools',
    'Workplace safety & PPE adherence',
  ];

  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-heading">
              Digital Skill Passport
            </h1>
            <Badge variant="gold" size="sm">
              DigiLocker & NSDC Sync
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Dynamic, auditable record of your self-declared trade experience, assessment diagnostics, and accredited assessor verifications.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="md"
            onClick={handleCopyLink}
            icon={<Share2 className="h-4 w-4" />}
          >
            {copied ? 'Link Copied!' : 'Share Credential'}
          </Button>

          <Button
            variant="primary"
            size="md"
            icon={<Download className="h-4 w-4" />}
            onClick={() => window.print()}
          >
            Download PDF
          </Button>
        </div>
      </div>

      {/* Main Passport Card */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-gold-500/30 bg-gradient-to-br from-[#1C1F28] via-[#14161E] to-[#0D0F14] text-white p-6 sm:p-8 shadow-2xl">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold-500/20 blur-3xl" />
        <div className="pointer-events-none absolute left-10 -bottom-20 h-64 w-64 rounded-full bg-amber-600/15 blur-3xl" />

        <div className="relative z-10 space-y-6">
          {/* Government / Platform Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-5 gap-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-gold-400 to-amber-600 flex items-center justify-center text-charcoal-950 font-black shadow-lg shadow-gold-500/20">
                <Sparkles className="h-6 w-6 text-charcoal-950" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-black tracking-tight text-white font-heading">
                    SKILLSETU DIGITAL PASSPORT
                  </span>
                  <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
                    PORTFOLIO ACTIVE
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  National Council for Vocational Education and Training (NCVET) Aligned
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-right">
                <div className="text-[10px] uppercase font-bold text-slate-400">RPL Identification ID</div>
                <div className="font-mono text-sm font-black text-gold-400">{rplId}</div>
              </div>
            </div>
          </div>

          {/* Dynamic Candidate Profile Details (No hardcoded names!) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="flex items-center gap-4 md:col-span-2">
              <div className="h-20 w-20 rounded-2xl border-2 border-gold-400/50 bg-gradient-to-br from-gold-500 to-charcoal-800 flex items-center justify-center font-heading font-black text-2xl text-charcoal-950 shadow-md shrink-0">
                {fullName.charAt(0)}
              </div>
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
                  {fullName}
                </h2>
                <p className="text-sm font-semibold text-gold-400">
                  Trade: {primaryTrade}
                </p>
                <div className="flex flex-wrap gap-3 text-xs text-slate-400 pt-1">
                  <span className="flex items-center gap-1">
                    <User className="h-3.5 w-3.5 text-slate-400" /> {experience} Prior Experience
                  </span>
                  <span>•</span>
                  <span>{location}</span>
                </div>
              </div>
            </div>

            {/* Verification QR Box */}
            <div className="flex items-center justify-start md:justify-end gap-3 rounded-2xl border border-gold-500/20 bg-black/40 p-3.5">
              <div className="h-16 w-16 rounded-xl bg-white p-1.5 flex items-center justify-center shrink-0">
                <QrCode className="h-full w-full text-charcoal-950" />
              </div>
              <div className="text-xs space-y-0.5">
                <div className="font-bold text-white flex items-center gap-1">
                  <BadgeCheck className="h-3.5 w-3.5 text-emerald-400" /> QR Audit Proof
                </div>
                <p className="text-[11px] text-slate-400">
                  Scan to verify candidate status on national RPL registry.
                </p>
              </div>
            </div>
          </div>

          {/* Formal Certification Status Notice */}
          <div className="rounded-2xl border border-gold-500/30 bg-gold-500/10 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gold-500 text-charcoal-950 font-black">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-gold-300 text-sm">
                  Formal Certification Status:{' '}
                  {verifiedCompetencies.length > 0
                    ? 'Assessor Endorsement Pending Formal Batch Issue'
                    : 'Awaiting Practical Assessor Endorsement'}
                </h4>
                <p className="text-xs text-slate-300">
                  *Official certificates are issued only when supported by accredited assessor sign-off.
                </p>
              </div>
            </div>
            <Badge variant="charcoal" size="sm">
              Level 4 Target
            </Badge>
          </div>
        </div>
      </div>

      {/* SECTION 1: ASSESSOR VERIFIED COMPETENCIES (Strict Verification Rule) */}
      <Card variant="white" className="p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-stone-200 dark:border-charcoal-700 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-600" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">
                Assessor-Verified Competencies
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Only skills evaluated, scored, and explicitly approved by an accredited assessor appear here.
            </p>
          </div>
          <Badge variant="emerald" size="sm">
            {verifiedCompetencies.length} Endorsed
          </Badge>
        </div>

        {verifiedCompetencies.length === 0 ? (
          <div className="py-6 text-center text-xs text-slate-500 space-y-1">
            <p className="font-semibold">No assessor-verified competencies yet.</p>
            <p className="text-[11px] text-slate-400">
              Submit your practical assessment assignment for human assessor review to earn verified competencies.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-stone-100 dark:divide-charcoal-700">
            {verifiedCompetencies.map((comp, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span className="text-xs font-bold text-slate-900 dark:text-white">{comp}</span>
                </div>
                <span className="rounded bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold px-2 py-0.5 border border-emerald-500/20">
                  Assessor Verified ✓
                </span>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* SECTION 2: PRACTICAL EVIDENCE SUBMISSION RECORDS */}
      <Card variant="white" className="p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-stone-200 dark:border-charcoal-700 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <FileCheck2 className="h-5 w-5 text-gold-600" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">
                Practical Assessments & Evidence Submitted
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Worksite demonstration files and their live review status.
            </p>
          </div>
          <Badge variant="gold" size="sm">
            {submissions.length} Submissions
          </Badge>
        </div>

        {submissions.length === 0 ? (
          <div className="py-6 text-center text-xs text-slate-500">
            No practical submissions on record yet. Complete course practical tasks to submit evidence.
          </div>
        ) : (
          <div className="divide-y divide-stone-100 dark:divide-charcoal-700">
            {submissions.map((sub) => (
              <div key={sub.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300">
                      {sub.taskTitle}
                    </span>
                    <Badge variant={sub.status === 'Accepted' ? 'emerald' : 'amber'} size="sm">
                      {sub.status === 'Accepted' ? 'Assessor Verified' : 'Awaiting Assessor Review'}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    File: {sub.fileName} ({sub.fileSize}) • Submitted: {sub.submittedAt}
                  </p>
                  {sub.assessorComments && (
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 italic pt-1">
                      Assessor Note: "{sub.assessorComments}"
                    </p>
                  )}
                </div>

                {sub.totalScore !== undefined && (
                  <span className="text-xs font-black text-emerald-600 shrink-0">
                    Rubric Score: {sub.totalScore}%
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* SECTION 3: ENTRY-LEVEL DIAGNOSTIC ASSESSMENT HISTORY */}
      <Card variant="white" className="p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-stone-200 dark:border-charcoal-700 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">
              Diagnostic Assessment History
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Platform-evaluated preliminary diagnostic testing.
            </p>
          </div>
          <Badge variant="blue" size="sm">
            {entryAssessment?.completed ? 'Platform Diagnostic Completed' : 'Pending'}
          </Badge>
        </div>

        {entryAssessment?.completed ? (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-stone-50 dark:bg-charcoal-800 border border-stone-200 dark:border-charcoal-700">
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                {entryAssessment.trade} Preliminary Skill Diagnostics
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Completed on {entryAssessment.completedAt} • {entryAssessment.correctAnswers} of {entryAssessment.totalQuestions} questions correct
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-heading font-black text-lg text-gold-600 dark:text-gold-400">
                {entryAssessment.score}% Score
              </span>
              <span className="rounded bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 text-[10px] font-bold px-2 py-0.5 border border-blue-500/20">
                Platform Badge: {entryAssessment.recommendationLevel}
              </span>
            </div>
          </div>
        ) : (
          <div className="py-4 text-center text-xs text-slate-500">
            Entry-level assessment not completed yet.
          </div>
        )}
      </Card>

      {/* SECTION: COURSE ENROLLMENT & MODULE PROGRESS */}
      <Card variant="white" className="p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-stone-200 dark:border-charcoal-700 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gold-500/10 text-gold-700">
              <BookOpen className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">
                Course Enrollment & Practical Learning
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Active learning tracks and practical assignments.
              </p>
            </div>
          </div>
          <Badge variant="gold" size="sm">
            {enrolledCourses.length} Courses
          </Badge>
        </div>

        {enrolledCourses.length === 0 ? (
          <div className="py-4 text-center text-xs text-slate-500">
            No active course enrollments yet. Browse recommended courses to start learning.
          </div>
        ) : (
          <div className="space-y-2">
            {enrolledCourses.map((c) => {
              const courseInfo = courseCatalog.find((item) => item.id === c.courseId);
              const title = courseInfo?.title || c.courseId;
              const totalModules = courseInfo?.modules?.length || 4;
              const completedCount = c.completedModules.length;

              return (
                <div
                  key={c.courseId}
                  className="p-3.5 rounded-xl border border-stone-200 dark:border-charcoal-700 bg-stone-50/50 dark:bg-charcoal-800 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">{title}</span>
                    <span className="text-[11px] text-slate-500">Enrolled: {c.enrolledAt} • Progress: {c.progressPercent}%</span>
                  </div>
                  <Badge variant={completedCount >= totalModules ? 'emerald' : 'blue'} size="sm">
                    {completedCount >= totalModules ? 'Modules Completed' : `${completedCount}/${totalModules} Modules`}
                  </Badge>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      {/* SECTION 4: SELF-DECLARED SKILLS & TASKS */}
      <Card variant="white" className="p-6 space-y-4">
        <div className="border-b border-stone-200 dark:border-charcoal-700 pb-3 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">
              Self-Declared Work Experience & Competencies
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Skills entered during onboarding; status remains self-declared until assessed.
            </p>
          </div>
          <span className="rounded bg-stone-100 dark:bg-charcoal-700 text-slate-600 dark:text-slate-300 text-[10px] font-bold px-2 py-0.5">
            Self-declared
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {selfDeclaredTasks.map((t, i) => (
            <div
              key={i}
              className="p-3 rounded-xl border border-stone-200/80 dark:border-charcoal-700 bg-stone-50/50 dark:bg-charcoal-800 flex items-center justify-between text-xs"
            >
              <span className="text-slate-800 dark:text-slate-200">{t}</span>
              <span className="text-[10px] text-slate-400 font-medium">Self-declared</span>
            </div>
          ))}
          {additionalSkills.map((s, i) => (
            <div
              key={`add-${i}`}
              className="p-3 rounded-xl border border-stone-200/80 dark:border-charcoal-700 bg-stone-50/50 dark:bg-charcoal-800 flex items-center justify-between text-xs"
            >
              <span className="text-slate-800 dark:text-slate-200">{s}</span>
              <span className="text-[10px] text-slate-400 font-medium">Self-declared</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
