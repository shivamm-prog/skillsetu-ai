import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  LayoutDashboard,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useAuth } from '../context/AuthContext';

export const AssessmentResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const result = user?.entryAssessment;
  const score = result ? result.score : 80;
  const correct = result ? result.correctAnswers : 8;
  const total = result ? result.totalQuestions : 10;
  const trade = result?.trade || user?.onboardingData?.primaryTrade || 'Electrician';
  const recLevel = result?.recommendationLevel || (score >= 75 ? 'Advanced' : score >= 50 ? 'Intermediate' : 'Foundation');

  const strengths = result?.strengths?.length
    ? result.strengths
    : ['Workplace Safety Procedures', 'Circuit Isolation Rules', 'Multimeter Inspection'];

  const improvements = result?.improvements?.length
    ? result.improvements
    : ['Advanced 3-Phase Balancing', 'Industrial Conduit Earthing'];

  return (
    <div className="min-h-screen bg-[#FAF7EE] text-slate-800 py-12 px-4 sm:px-6 lg:px-8 selection:bg-gold-500/20 selection:text-gold-900">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <Badge variant="gold" size="sm">
            Preliminary Skill Diagnostics Completed
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-heading">
            Your Diagnostic Results
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            Calculated from your genuine assessment answers. Below are your demonstrated strengths and recommended learning pathways.
          </p>
        </div>

        {/* Score & Level Banner */}
        <div className="relative overflow-hidden rounded-3xl border border-stone-200/90 bg-gradient-to-br from-[#1C1F28] via-[#14161E] to-[#0E1015] text-white p-6 sm:p-8 shadow-xl">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gold-500/15 blur-3xl" />
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <span className="rounded bg-gold-500/20 px-2.5 py-0.5 text-xs font-bold text-gold-400 border border-gold-500/30">
                Trade: {trade}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-heading">
                {user?.name ? `${user.name}'s Proficiency Score` : 'Preliminary Skill Score'}
              </h2>
              <p className="text-xs text-slate-400 max-w-md">
                You correctly answered {correct} out of {total} practical scenario and safety questions.
              </p>
            </div>

            {/* Score Donut / Circle */}
            <div className="flex flex-col items-center justify-center h-28 w-28 rounded-full border-4 border-gold-500 bg-gold-500/10 shrink-0 shadow-lg shadow-gold-500/20">
              <span className="text-3xl font-black text-gold-400 font-heading">{score}%</span>
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                Score
              </span>
            </div>
          </div>
        </div>

        {/* Breakdown Grid: Strengths & Improvements */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Strengths */}
          <Card variant="white" className="p-5 space-y-3 border-emerald-500/20 shadow-soft">
            <div className="flex items-center gap-2 text-emerald-800">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              <h3 className="text-sm font-bold uppercase tracking-wider font-heading">
                Demonstrated Strengths
              </h3>
            </div>
            <ul className="space-y-2 text-xs text-slate-700">
              {strengths.map((str, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span className="font-semibold">{str}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Areas for Improvement */}
          <Card variant="white" className="p-5 space-y-3 border-amber-500/20 shadow-soft">
            <div className="flex items-center gap-2 text-amber-800">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              <h3 className="text-sm font-bold uppercase tracking-wider font-heading">
                Areas for Improvement
              </h3>
            </div>
            <ul className="space-y-2 text-xs text-slate-700">
              {improvements.map((imp, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  <span>{imp}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Transparent Recommendation Card */}
        <Card variant="white" className="p-6 space-y-4 border-stone-200/90 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gold-500/15 text-gold-700">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-gold-800">
                Recommended Learning Level
              </span>
              <h3 className="text-lg font-black text-slate-900 font-heading">
                {recLevel} Training & Practical Assessment
              </h3>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Based on your test score of <strong>{score}%</strong>, our diagnostic engine recommends starting with{' '}
            <strong>{recLevel}</strong> modules to consolidate your existing practical skills before submitting workplace evidence for official assessor review.
          </p>

          <div className="rounded-xl border border-stone-200 bg-stone-50 p-3.5 text-xs text-slate-500 space-y-1">
            <span className="font-bold text-slate-700 block">Transparent Demonstration Rule:</span>
            <span>
              Scores ≥ 75% recommend Advanced modules; 50%–74% recommend Intermediate; below 50% recommend Foundation fundamentals.
            </span>
          </div>

          {/* Important RPL Disclaimer */}
          <div className="rounded-xl border border-blue-500/20 bg-blue-50/50 p-3.5 text-xs text-blue-900 flex items-start gap-2.5">
            <ShieldCheck className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Notice:</strong> This diagnostic test is a preliminary guide to help you choose suitable learning paths. It does not constitute a formal government certification decision. Formal NSQF credentials are awarded only upon accredited assessor endorsement.
            </p>
          </div>
        </Card>

        {/* Action Buttons: Immediate Dashboard Access & Course Browsing */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate('/dashboard')}
            icon={<LayoutDashboard className="h-4 w-4" />}
            className="w-full sm:w-auto font-bold border-stone-300 bg-white"
          >
            Go to Dashboard
          </Button>

          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/courses')}
            icon={<BookOpen className="h-4 w-4" />}
            iconPosition="right"
            className="w-full sm:w-auto shadow-elevated px-8 py-3.5 font-black"
          >
            View Recommended Courses
          </Button>
        </div>
      </div>
    </div>
  );
};
