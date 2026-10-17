import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowLeft,
  ArrowRight,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  FileCheck2,
  X,
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useAuth } from '../context/AuthContext';
import { courseCatalog } from '../data/coursesAndAssessments';

export const PracticalAssessmentPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { user, submitPracticalAssessment } = useAuth();

  const course = courseCatalog.find((c) => c.id === courseId) || courseCatalog[0];
  const task = course.practicalTask;

  // Form State
  const [checklist, setChecklist] = useState<Record<number, boolean>>({});
  const [answers, setAnswers] = useState<Record<string, string>>({
    q0: '',
    q1: '',
  });

  // File Upload State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionId, setSubmissionId] = useState<string | null>(null);

  const toggleChecklist = (idx: number) => {
    setChecklist((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 25MB)
    const maxSize = 25 * 1024 * 1024;
    if (file.size > maxSize) {
      setFileError('File size exceeds the 25MB limit. Please upload a compressed image or video.');
      return;
    }

    // Validate format
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      setFileError('Unsupported format. Please upload JPG, PNG, WEBP image, MP4 video, or PDF.');
      return;
    }

    setSelectedFile(file);

    // Create live preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setFilePreview(null);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setFilePreview(null);
    setFileError(null);
  };

  const allChecklistCompleted = task.safetyChecklist.every((_, idx) => checklist[idx]);
  const hasAnswers = answers.q0.trim().length > 10;
  const isFormValid = allChecklistCompleted && hasAnswers && selectedFile !== null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || !selectedFile) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      const subId = submitPracticalAssessment({
        courseId: course.id,
        courseTitle: course.title,
        workerName: user?.name || 'Skilled Candidate',
        workerRplId: user?.rplId || 'RPL-2026-9428',
        workerEmail: user?.email || 'worker@skillsetu.gov.in',
        trade: course.trade,
        taskTitle: task.title,
        fileName: selectedFile.name,
        fileSize: `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`,
        fileType: selectedFile.type,
        filePreviewUrl: filePreview || undefined,
        taskAnswers: {
          [task.guidingQuestions[0]]: answers.q0,
          [task.guidingQuestions[1] || 'Additional Diagnostic Details']: answers.q1,
        },
        checklistConfirmed: true,
      });

      setSubmissionId(subId);
    }, 900);
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      {/* Back button */}
      <div>
        <button
          onClick={() => navigate(`/course/${course.id}`)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-gold-700 transition"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Course
        </button>
      </div>

      {/* Submission Success Modal */}
      {submissionId && (
        <div className="rounded-3xl border-2 border-emerald-500/40 bg-gradient-to-br from-emerald-50 to-white dark:from-charcoal-800 dark:to-charcoal-850 p-6 sm:p-8 text-center space-y-4 shadow-elevated">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500 text-white font-black shadow-lg shadow-emerald-500/20">
            <CheckCircle2 className="h-8 w-8" />
          </div>

          <div className="space-y-1">
            <span className="font-mono text-xs font-bold text-emerald-700 dark:text-emerald-400">
              Submission ID: {submissionId}
            </span>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white font-heading">
              Practical Task Successfully Submitted!
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto">
              Your practical demonstration has been encrypted and queued into the Assessor Review Terminal. An accredited assessor will evaluate your submission against standardized rubrics.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
            <Button
              variant="outline"
              size="md"
              onClick={() => navigate('/skill-passport')}
              icon={<ShieldCheck className="h-4 w-4" />}
            >
              View in Skill Passport
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate('/dashboard')}
              icon={<ArrowRight className="h-4 w-4" />}
              iconPosition="right"
            >
              Go to Dashboard
            </Button>
          </div>
        </div>
      )}

      {/* Header Banner */}
      {!submissionId && (
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="rounded bg-gold-500/20 px-2.5 py-0.5 text-xs font-bold text-gold-700 border border-gold-500/30">
                {course.trade} Practical Demonstration
              </span>
              <Badge variant="gold" size="sm">
                Assessor Review Required
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-heading">
              {task.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              {task.description}
            </p>
          </div>

          {/* Safety Reminder Banner */}
          <div className="rounded-2xl border border-amber-500/30 bg-amber-50/60 dark:bg-amber-950/20 p-4 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-3 shadow-soft">
            <ShieldCheck className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-sm block">Safety Warning: Do Not Risk Injury</span>
              <p className="text-[11px] leading-relaxed">
                Always ensure electrical circuits are fully de-energized or water mains isolated before taking inspection photos. Never perform hazardous demonstrations for the sake of video submission.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Section 1: Safety Checklist */}
            <Card variant="white" className="p-6 space-y-4">
              <div className="border-b border-stone-100 dark:border-charcoal-700 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">
                    1. Mandatory Safety & Protocol Checklist
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Confirm each required protocol before proceeding with your report.
                  </p>
                </div>
                <span className="text-xs font-bold text-gold-600">
                  {Object.values(checklist).filter(Boolean).length}/{task.safetyChecklist.length} Checked
                </span>
              </div>

              <div className="space-y-2.5">
                {task.safetyChecklist.map((item, idx) => {
                  const isChecked = !!checklist[idx];

                  return (
                    <label
                      key={idx}
                      className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition ${
                        isChecked
                          ? 'border-emerald-500/40 bg-emerald-50/40 dark:bg-emerald-950/20 text-slate-900 dark:text-white font-semibold'
                          : 'border-stone-200 dark:border-charcoal-700 bg-stone-50/50 dark:bg-charcoal-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleChecklist(idx)}
                        className="mt-0.5 h-4 w-4 rounded border-stone-300 text-emerald-600 focus:ring-emerald-500 accent-emerald-600"
                      />
                      <span className="text-xs leading-relaxed">{item}</span>
                    </label>
                  );
                })}
              </div>
            </Card>

            {/* Section 2: Practical Knowledge Questions */}
            <Card variant="white" className="p-6 space-y-4">
              <div className="border-b border-stone-100 dark:border-charcoal-700 pb-3">
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">
                  2. Practical Diagnosis & Explanation
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Explain your practical thought process in clear words (Hindi, Marathi, or English).
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {task.guidingQuestions[0]}
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={answers.q0}
                    onChange={(e) => setAnswers({ ...answers, q0: e.target.value })}
                    placeholder="Describe the steps, tool checks, and safety precautions you took..."
                    className="w-full rounded-xl border border-stone-200 dark:border-charcoal-700 bg-stone-50/50 dark:bg-charcoal-800 p-3 text-xs text-slate-900 dark:text-white outline-none focus:border-gold-500 focus:bg-white"
                  />
                </div>

                {task.guidingQuestions[1] && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {task.guidingQuestions[1]}
                    </label>
                    <textarea
                      rows={3}
                      value={answers.q1}
                      onChange={(e) => setAnswers({ ...answers, q1: e.target.value })}
                      placeholder="Explain findings, measurements, or corrective actions taken..."
                      className="w-full rounded-xl border border-stone-200 dark:border-charcoal-700 bg-stone-50/50 dark:bg-charcoal-800 p-3 text-xs text-slate-900 dark:text-white outline-none focus:border-gold-500 focus:bg-white"
                    />
                  </div>
                )}
              </div>
            </Card>

            {/* Section 3: Evidence File Upload */}
            <Card variant="white" className="p-6 space-y-4">
              <div className="border-b border-stone-100 dark:border-charcoal-700 pb-3">
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">
                  3. Upload Practical Worksite Proof
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {task.evidenceTypeNeeded} (Supported: JPG, PNG, WEBP, MP4, PDF • Max 25MB)
                </p>
              </div>

              {fileError && (
                <div className="rounded-xl border border-red-500/30 bg-red-50 p-3 text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{fileError}</span>
                </div>
              )}

              {!selectedFile ? (
                <div className="relative border-2 border-dashed border-stone-300 dark:border-charcoal-600 rounded-2xl p-8 text-center hover:border-gold-500 dark:hover:border-gold-400 transition-colors bg-stone-50/40 dark:bg-charcoal-800/40">
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,video/mp4,application/pdf"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="space-y-2 pointer-events-none">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-500/15 text-gold-700 dark:text-gold-400">
                      <UploadCloud className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="font-bold text-sm text-slate-900 dark:text-white">
                        Click to upload or drag photo/video
                      </span>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Clear photo showing tools, safe wiring dressing, or plumbing joint
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-stone-200 dark:border-charcoal-700 bg-stone-50 dark:bg-charcoal-800 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-gold-500/20 text-gold-700 dark:text-gold-400 font-bold">
                        <FileCheck2 className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-xs sm:max-w-md">
                          {selectedFile.name}
                        </h4>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">
                          {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • {selectedFile.type}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 transition"
                      title="Remove file"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Live Image Preview */}
                  {filePreview && (
                    <div className="relative rounded-xl overflow-hidden border border-stone-200 dark:border-charcoal-700 max-h-60 bg-black/5 flex items-center justify-center">
                      <img
                        src={filePreview}
                        alt="Uploaded demonstration proof"
                        className="max-h-60 w-auto object-contain"
                      />
                    </div>
                  )}

                  {/* Prototype Automated Observation Callout */}
                  <div className="rounded-xl border border-gold-500/25 bg-gold-500/10 p-3 text-[11px] text-slate-700 dark:text-slate-300 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-gold-800 dark:text-gold-300">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>Prototype Automated Observation (Demo Feature)</span>
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">
                      Image metadata detected. Conductor dressing and safety tool check pre-screened. Final grading is reserved exclusively for the accredited human assessor.
                    </p>
                  </div>
                </div>
              )}
            </Card>

            {/* Submission CTA */}
            <div className="flex justify-end pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={!isFormValid || isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 font-black shadow-elevated"
                icon={!isSubmitting ? <CheckCircle2 className="h-5 w-5" /> : undefined}
                iconPosition="right"
              >
                {isSubmitting ? 'Securing & Submitting Evidence...' : 'Submit Task for Assessor Review'}
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
