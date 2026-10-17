import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ClipboardCheck,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Award,
  Search,
  ExternalLink,
  FileCheck2,
  Save,
  X,
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import type { PracticalSubmission } from '../types';

export const AssessorDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, allSubmissions, gradePracticalSubmission } = useAuth();

  const [activeTab, setActiveTab] = useState<'pending' | 'completed'>('pending');
  const [search, setSearch] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState<PracticalSubmission | null>(null);

  // Rubric Grading Modal State
  const [safetyScore, setSafetyScore] = useState(5);
  const [techScore, setTechScore] = useState(4);
  const [qualityScore, setQualityScore] = useState(5);
  const [feedback, setFeedback] = useState('Work demonstrated proper de-energization and neat wiring ferrule termination.');
  const [decision, setDecision] = useState<'Accepted' | 'Insufficient' | 'Additional Evidence Requested'>('Accepted');
  const [alertSuccess, setAlertSuccess] = useState<string | null>(null);

  const pendingSubmissions = allSubmissions.filter((s) => s.status === 'Awaiting Review');
  const completedSubmissions = allSubmissions.filter((s) => s.status !== 'Awaiting Review');

  const displayedList = (activeTab === 'pending' ? pendingSubmissions : completedSubmissions).filter(
    (s) =>
      s.workerName.toLowerCase().includes(search.toLowerCase()) ||
      s.trade.toLowerCase().includes(search.toLowerCase()) ||
      s.taskTitle.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenReview = (submission: PracticalSubmission) => {
    setSelectedSubmission(submission);
    setSafetyScore(submission.criteriaScores?.safetyProtocol || 5);
    setTechScore(submission.criteriaScores?.technicalAccuracy || 4);
    setQualityScore(submission.criteriaScores?.qualityOfWork || 5);
    setFeedback(submission.assessorComments || 'Inspected evidence conforms to National Skills Qualification Framework requirements.');
    setDecision(submission.status === 'Awaiting Review' ? 'Accepted' : submission.status);
  };

  const handleSaveReview = () => {
    if (!selectedSubmission) return;

    const assessorDisplayName = user?.name ? `${user.name} (Assessor)` : 'Accredited NCVET Assessor';

    gradePracticalSubmission(
      selectedSubmission.id,
      decision,
      {
        safetyProtocol: safetyScore,
        technicalAccuracy: techScore,
        qualityOfWork: qualityScore,
      },
      feedback,
      assessorDisplayName
    );

    setAlertSuccess(`Review for ${selectedSubmission.workerName} successfully recorded as "${decision}"!`);
    setSelectedSubmission(null);
    setTimeout(() => setAlertSuccess(null), 4000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Assessor Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-stone-200 bg-gradient-to-r from-[#171A21] via-[#14161E] to-[#0E1015] p-6 sm:p-8 text-white shadow-xl">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold-500/15 blur-3xl" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="rounded bg-gold-500/20 px-2.5 py-0.5 text-[11px] font-bold text-gold-400 border border-gold-500/30">
                Official NCVET / NSDC Assessor Terminal
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Assessor: {user?.name || 'Dr. V. K. Nambiar'} ({user?.rplId || 'ASSR-NCVET-2026'})
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-heading">
              Assessor Review & Competency Scoring
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Evaluate practical tasks, verify uploaded worksite proofs, score standardized rubrics, and issue official endorsements for Recognition of Prior Learning (RPL).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="text-white border-white/20 hover:bg-white/10"
              icon={<ExternalLink className="h-3.5 w-3.5" />}
            >
              Switch to Worker View
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate('/courses')}
              icon={<Award className="h-3.5 w-3.5" />}
            >
              Course Standards
            </Button>
          </div>
        </div>
      </div>

      {alertSuccess && (
        <div className="rounded-2xl border border-emerald-500/40 bg-emerald-50 dark:bg-emerald-950/30 p-4 text-emerald-800 dark:text-emerald-300 flex items-center gap-3 shadow-soft">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <div className="text-xs font-semibold">{alertSuccess}</div>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card variant="white" className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Pending Review Queue</p>
              <h3 className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1 font-heading">
                {pendingSubmissions.length}
              </h3>
              <p className="text-[11px] text-slate-500 mt-1">Awaiting your evaluation</p>
            </div>
            <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Clock className="h-6 w-6" />
            </div>
          </div>
        </Card>

        <Card variant="white" className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Evaluated</p>
              <h3 className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1 font-heading">
                {completedSubmissions.length}
              </h3>
              <p className="text-[11px] text-emerald-600 font-medium mt-1">Endorsements recorded</p>
            </div>
            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="h-6 w-6" />
            </div>
          </div>
        </Card>

        <Card variant="white" className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Assessor Mode</p>
              <h3 className="text-base font-black text-slate-900 dark:text-white mt-1">
                Standardized Rubric
              </h3>
              <p className="text-[11px] text-gold-600 font-medium mt-1">Safety + Accuracy + Quality</p>
            </div>
            <div className="p-3 rounded-2xl bg-gold-500/10 text-gold-600 dark:text-gold-400">
              <Award className="h-6 w-6" />
            </div>
          </div>
        </Card>

        <Card variant="white" className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">NCVET Compliance</p>
              <h3 className="text-base font-black text-emerald-600 dark:text-emerald-400 mt-1">
                Tamper-Proof Audit
              </h3>
              <p className="text-[11px] text-slate-500 mt-1">All decisions logged</p>
            </div>
            <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <FileCheck2 className="h-6 w-6" />
            </div>
          </div>
        </Card>
      </div>

      {/* Main Review Queue Table */}
      <Card variant="white" className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-charcoal-700 pb-5">
          <div>
            <h2 className="text-lg font-black text-slate-900 dark:text-white font-heading">
              Practical Assessment Submissions
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Select any candidate submission to inspect uploaded worksite proofs, score the 3-part rubric, and record decision.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search worker or task..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-stone-200 bg-white py-1.5 pl-9 pr-3 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-gold-500 dark:border-charcoal-700 dark:bg-charcoal-800 dark:text-slate-200"
              />
            </div>

            <div className="flex items-center rounded-xl bg-stone-100 p-1 dark:bg-charcoal-750 shrink-0">
              <button
                onClick={() => setActiveTab('pending')}
                className={`rounded-lg px-3 py-1 text-xs font-bold transition ${
                  activeTab === 'pending'
                    ? 'bg-white text-slate-900 shadow-sm dark:bg-charcoal-850 dark:text-white'
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
                }`}
              >
                Pending ({pendingSubmissions.length})
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`rounded-lg px-3 py-1 text-xs font-bold transition ${
                  activeTab === 'completed'
                    ? 'bg-white text-slate-900 shadow-sm dark:bg-charcoal-850 dark:text-white'
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
                }`}
              >
                Reviewed ({completedSubmissions.length})
              </button>
            </div>
          </div>
        </div>

        {/* List of Submissions */}
        <div className="divide-y divide-stone-100 dark:divide-charcoal-750 mt-2">
          {displayedList.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-500">
              No practical submissions found in this tab.
            </div>
          ) : (
            displayedList.map((sub) => (
              <div
                key={sub.id}
                className="py-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 rounded-2xl transition p-3 hover:bg-stone-50 dark:hover:bg-charcoal-800"
              >
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-gold-700 dark:text-gold-400 bg-gold-500/10 px-2 py-0.5 rounded border border-gold-500/20">
                      {sub.id}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {sub.workerName}
                    </h3>
                    <span className="font-mono text-[11px] text-slate-400">
                      ({sub.workerRplId})
                    </span>
                    <Badge variant={sub.status === 'Accepted' ? 'emerald' : sub.status === 'Awaiting Review' ? 'blue' : 'amber'} size="sm">
                      {sub.status}
                    </Badge>
                  </div>

                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Task: {sub.taskTitle}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Trade: {sub.trade} • Submitted: {sub.submittedAt} • File: {sub.fileName} ({sub.fileSize})
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {sub.totalScore !== undefined && (
                    <div className="text-right">
                      <span className="text-xs font-black text-emerald-600 block">
                        Score: {sub.totalScore}%
                      </span>
                      <span className="text-[10px] text-slate-400">by {sub.assessorName}</span>
                    </div>
                  )}

                  <Button
                    variant={sub.status === 'Awaiting Review' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => handleOpenReview(sub)}
                    icon={<ClipboardCheck className="h-4 w-4" />}
                  >
                    {sub.status === 'Awaiting Review' ? 'Review & Grade' : 'Inspect Score'}
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      {/* Review & Grading Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white dark:bg-charcoal-850 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl border border-stone-200 dark:border-charcoal-700 max-h-[90vh] overflow-y-auto my-8">
            <div className="flex items-center justify-between border-b border-stone-200 dark:border-charcoal-700 pb-4">
              <div>
                <span className="text-[10px] font-bold text-gold-600 uppercase tracking-wider block">
                  Candidate Evaluation
                </span>
                <h3 className="text-lg font-black text-slate-900 dark:text-white font-heading">
                  Reviewing: {selectedSubmission.workerName}
                </h3>
                <span className="text-xs text-slate-400 font-mono">
                  {selectedSubmission.taskTitle} • {selectedSubmission.trade}
                </span>
              </div>

              <button
                onClick={() => setSelectedSubmission(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Evidence & Answers Preview */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Submitted Worksite Proof & Answers
              </h4>

              {selectedSubmission.filePreviewUrl && (
                <div className="rounded-2xl overflow-hidden border border-stone-200 dark:border-charcoal-700 max-h-56 bg-black/5 flex items-center justify-center">
                  <img
                    src={selectedSubmission.filePreviewUrl}
                    alt="Candidate evidence"
                    className="max-h-56 w-auto object-contain"
                  />
                </div>
              )}

              <div className="rounded-xl bg-stone-50 dark:bg-charcoal-800 p-3.5 text-xs space-y-2 border border-stone-200/80 dark:border-charcoal-700">
                <div className="flex justify-between text-slate-500">
                  <span>File: {selectedSubmission.fileName} ({selectedSubmission.fileSize})</span>
                  <span>Safety Checklist Confirmed: {selectedSubmission.checklistConfirmed ? 'Yes ✓' : 'No'}</span>
                </div>
                {Object.entries(selectedSubmission.taskAnswers).map(([q, ans], idx) => (
                  <div key={idx} className="space-y-0.5 pt-1">
                    <span className="font-bold text-slate-800 dark:text-slate-200 block">{q}:</span>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed italic">"{ans}"</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Standardized Scoring Rubric */}
            <div className="space-y-4 border-t border-stone-200 dark:border-charcoal-700 pt-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Standardized Assessment Rubric (1 to 5 Points Each)
                </h4>
                <span className="text-xs font-bold text-gold-600">
                  Total: {safetyScore + techScore + qualityScore} / 15
                </span>
              </div>

              {/* Criterion 1: Safety Protocol */}
              <div className="flex items-center justify-between gap-4 p-3 rounded-xl bg-stone-50 dark:bg-charcoal-800">
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">
                    1. Safety Protocol & PPE Compliance
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Isolation, zero-energy check, safe tool usage
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((pts) => (
                    <button
                      key={pts}
                      type="button"
                      onClick={() => setSafetyScore(pts)}
                      className={`h-7 w-7 rounded-lg text-xs font-bold transition ${
                        safetyScore === pts
                          ? 'bg-gold-500 text-charcoal-950 font-black'
                          : 'bg-white dark:bg-charcoal-700 text-slate-600 hover:bg-stone-200'
                      }`}
                    >
                      {pts}
                    </button>
                  ))}
                </div>
              </div>

              {/* Criterion 2: Technical Accuracy */}
              <div className="flex items-center justify-between gap-4 p-3 rounded-xl bg-stone-50 dark:bg-charcoal-800">
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">
                    2. Technical Accuracy & Diagnosis
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Correct component sizing, root-cause identification
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((pts) => (
                    <button
                      key={pts}
                      type="button"
                      onClick={() => setTechScore(pts)}
                      className={`h-7 w-7 rounded-lg text-xs font-bold transition ${
                        techScore === pts
                          ? 'bg-gold-500 text-charcoal-950 font-black'
                          : 'bg-white dark:bg-charcoal-700 text-slate-600 hover:bg-stone-200'
                      }`}
                    >
                      {pts}
                    </button>
                  ))}
                </div>
              </div>

              {/* Criterion 3: Quality of Work */}
              <div className="flex items-center justify-between gap-4 p-3 rounded-xl bg-stone-50 dark:bg-charcoal-800">
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">
                    3. Workmanship & Evidence Quality
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Neat dressing, authentic verifiable photos
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((pts) => (
                    <button
                      key={pts}
                      type="button"
                      onClick={() => setQualityScore(pts)}
                      className={`h-7 w-7 rounded-lg text-xs font-bold transition ${
                        qualityScore === pts
                          ? 'bg-gold-500 text-charcoal-950 font-black'
                          : 'bg-white dark:bg-charcoal-700 text-slate-600 hover:bg-stone-200'
                      }`}
                    >
                      {pts}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Decision Radio Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                Assessor Final Decision
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {(['Accepted', 'Insufficient', 'Additional Evidence Requested'] as const).map((dec) => (
                  <button
                    key={dec}
                    type="button"
                    onClick={() => setDecision(dec)}
                    className={`p-2.5 rounded-xl border text-center text-xs font-bold transition ${
                      decision === dec
                        ? dec === 'Accepted'
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-500'
                          : dec === 'Insufficient'
                          ? 'border-red-500 bg-red-50 text-red-900 ring-1 ring-red-500'
                          : 'border-amber-500 bg-amber-50 text-amber-900 ring-1 ring-amber-500'
                        : 'border-stone-200 dark:border-charcoal-700 bg-stone-50 dark:bg-charcoal-800 text-slate-600'
                    }`}
                  >
                    {dec}
                  </button>
                ))}
              </div>
            </div>

            {/* Feedback / Comments */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                Assessor Feedback & Endorsement Notes
              </label>
              <textarea
                rows={3}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Enter feedback to be recorded in the candidate's Skill Passport..."
                className="w-full rounded-xl border border-stone-200 dark:border-charcoal-700 bg-white dark:bg-charcoal-800 p-3 text-xs text-slate-900 dark:text-white outline-none focus:border-gold-500"
              />
            </div>

            {/* Save Buttons */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-200 dark:border-charcoal-700">
              <Button
                variant="outline"
                size="md"
                onClick={() => setSelectedSubmission(null)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={handleSaveReview}
                icon={<Save className="h-4 w-4" />}
                className="font-bold px-6 shadow-soft"
              >
                Save Review Outcome
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
