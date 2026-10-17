import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Zap,
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useAuth } from '../context/AuthContext';
import { entryAssessmentQuestions } from '../data/coursesAndAssessments';
import type { EntryAssessmentResult, TradeId } from '../types';

export const EntryAssessmentPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, saveEntryAssessment } = useAuth();

  // Primary trade from onboarding or profile
  const selectedTrade: TradeId = (user?.onboardingData?.primaryTrade as TradeId) || 'Electrician';

  const questions = entryAssessmentQuestions[selectedTrade] || [];
  const totalQuestions = questions.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>(() => {
    // Restore answers if user already partially answered
    try {
      const saved = localStorage.getItem(`skillsetu_answers_${selectedTrade}`);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {};
  });

  // Save partial progress in localStorage so browser refresh doesn't erase answers
  useEffect(() => {
    localStorage.setItem(`skillsetu_answers_${selectedTrade}`, JSON.stringify(answers));
  }, [answers, selectedTrade]);

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const currentQ = questions[currentIndex];
  const isLastQuestion = currentIndex === totalQuestions - 1;

  // Handle deterministic scoring upon submission
  const handleSubmit = () => {
    let correctCount = 0;
    const strengthsSet = new Set<string>();
    const improvementSet = new Set<string>();

    questions.forEach((q) => {
      const chosen = answers[q.id];
      if (chosen === q.correctIndex) {
        correctCount += 1;
        strengthsSet.add(q.category);
      } else {
        improvementSet.add(q.category);
      }
    });

    const calculatedScore = Math.round((correctCount / totalQuestions) * 100);

    let recLevel: 'Foundation' | 'Intermediate' | 'Advanced' = 'Foundation';
    if (calculatedScore >= 75) {
      recLevel = 'Advanced';
    } else if (calculatedScore >= 50) {
      recLevel = 'Intermediate';
    } else {
      recLevel = 'Foundation';
    }

    const result: EntryAssessmentResult = {
      completed: true,
      trade: selectedTrade,
      score: calculatedScore,
      totalQuestions,
      correctAnswers: correctCount,
      userAnswers: answers,
      strengths: Array.from(strengthsSet),
      improvements: Array.from(improvementSet),
      recommendationLevel: recLevel,
      completedAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    };

    saveEntryAssessment(result);
    // Clear temp answers
    localStorage.removeItem(`skillsetu_answers_${selectedTrade}`);

    navigate('/assessment-results');
  };

  // If questions are not available for this trade yet
  if (totalQuestions === 0) {
    return (
      <div className="min-h-screen bg-[#FAF7EE] text-slate-800 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto text-center space-y-6">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-amber-500/15 text-amber-700 border border-amber-500/25">
            <Clock className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 font-heading">
            Assessment Coming Soon
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            The preliminary skill assessment for <strong>{selectedTrade}</strong> is currently being validated by our National Sector Skill Council experts.
          </p>
          <div className="rounded-2xl border border-stone-200 bg-white p-5 text-left text-xs space-y-3 shadow-soft">
            <h4 className="font-bold text-slate-900">Available Prototype Assessments:</h4>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  if (user) {
                    saveEntryAssessment({
                      completed: false,
                      trade: 'Electrician',
                      score: 0,
                      totalQuestions: 10,
                      correctAnswers: 0,
                      userAnswers: {},
                      strengths: [],
                      improvements: [],
                      recommendationLevel: 'Foundation',
                      completedAt: ''
                    });
                  }
                  window.location.reload();
                }}
                className="flex items-center gap-2 p-3 rounded-xl border border-gold-500/30 bg-gold-500/10 text-gold-900 font-bold hover:bg-gold-500/20 transition flex-1"
              >
                <Zap className="h-4 w-4 text-gold-700" />
                <span>Try Electrician Assessment</span>
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2 p-3 rounded-xl border border-stone-200 bg-stone-100 text-slate-800 font-bold hover:bg-stone-200 transition flex-1 justify-center"
              >
                <span>Skip to Dashboard</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const selectedAnswer = answers[currentQ.id];
  const isAnswered = selectedAnswer !== undefined;
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-[#FAF7EE] text-slate-800 py-10 px-4 sm:px-6 lg:px-8 selection:bg-gold-500/20 selection:text-gold-900">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-gold-500/15 px-3 py-1 text-xs font-bold text-gold-800 border border-gold-500/25">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Preliminary Skill Identification • {selectedTrade}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-heading">
            Discover Your Skill Level
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            This preliminary assessment identifies your practical knowledge and safety fundamentals. Scores are calculated transparently from your actual answers.
          </p>
        </div>

        {/* Progress & Question Pill */}
        <div className="bg-white rounded-2xl p-4 border border-stone-200/90 shadow-soft space-y-2">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-700">
              Question {currentIndex + 1} of {totalQuestions}
            </span>
            <span className="text-gold-700">{progressPercent}% Completed</span>
          </div>
          <div className="h-2 w-full rounded-full bg-stone-100 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-gold-500 to-amber-500 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <Card variant="white" className="p-6 sm:p-8 space-y-6 border-stone-200/90 shadow-soft">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <Badge variant="gold" size="sm">
              {currentQ.category}
            </Badge>
            <span className="text-[11px] font-mono font-bold text-slate-400">
              Q{currentQ.id} • 10 Points
            </span>
          </div>

          {/* Question Text */}
          <div className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug font-heading">
              {currentQ.question}
            </h2>
            <p className="text-xs text-slate-500">
              Select the best practical answer based on standard trade practices.
            </p>
          </div>

          {/* Multiple Choice Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt, idx) => {
              const isChecked = selectedAnswer === idx;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectOption(currentQ.id, idx)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                    isChecked
                      ? 'border-gold-500 bg-gold-500/15 ring-2 ring-gold-500/30 text-slate-900 font-bold shadow-sm'
                      : 'border-stone-200 bg-stone-50/50 hover:bg-stone-100 text-slate-700'
                  }`}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-black mt-0.5 ${
                      isChecked
                        ? 'bg-gold-500 text-charcoal-950'
                        : 'border border-stone-300 bg-white text-slate-500'
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-xs sm:text-sm leading-relaxed">{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-stone-100">
            <Button
              variant="outline"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              icon={<ArrowLeft className="h-4 w-4" />}
            >
              Previous
            </Button>

            {!isLastQuestion ? (
              <Button
                variant="primary"
                disabled={!isAnswered}
                onClick={() => setCurrentIndex((prev) => Math.min(totalQuestions - 1, prev + 1))}
                icon={<ArrowRight className="h-4 w-4" />}
                iconPosition="right"
              >
                Next Question
              </Button>
            ) : (
              <Button
                variant="primary"
                disabled={!isAnswered}
                onClick={handleSubmit}
                icon={<CheckCircle2 className="h-4 w-4" />}
                iconPosition="right"
                className="shadow-elevated px-6 py-2.5 font-bold"
              >
                Submit Assessment
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};
