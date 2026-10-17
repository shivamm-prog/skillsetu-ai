import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Mic,
  Camera,
  ShieldCheck,
  Award,
  Volume2,
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';

export const AssessmentFlowPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTrade, setSelectedTrade] = useState('General Electrician (ELE/Q1401)');
  const [experience, setExperience] = useState('7');
  const [selectedLanguage, setSelectedLanguage] = useState('Hindi (हिंदी) & English');
  
  // Step 2 Question State
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedVoice, setRecordedVoice] = useState(false);

  // Step 3 Evidence State
  const [analyzingImage, setAnalyzingImage] = useState(false);
  const [evidenceAnalyzed, setEvidenceAnalyzed] = useState(false);

  const handleSimulateVoice = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setRecordedVoice(true);
    }, 2200);
  };

  const handleSimulateEvidenceAnalysis = () => {
    setAnalyzingImage(true);
    setTimeout(() => {
      setAnalyzingImage(false);
      setEvidenceAnalyzed(true);
    }, 1800);
  };

  return (
    <div className="space-y-6 pb-16 max-w-4xl mx-auto">
      {/* Top Breadcrumb & Return */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Dashboard</span>
        </button>

        <div className="flex items-center gap-2">
          <Badge variant="gold" size="sm">
            <Sparkles className="h-3 w-3 mr-1" />
            AI-Assisted RPL Simulator
          </Badge>
          <span className="text-xs text-slate-400">SIH 2026: PS 26242</span>
        </div>
      </div>

      {/* Stepper Header */}
      <Card variant="white" className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-gold-600 dark:text-gold-400">
              Module: Practical & Diagnostic Evaluation
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
              RPL Competency Assessment: Three-Phase Systems
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Simulated multi-modal assessment aligned with NSQF Level 4 Qualification Pack
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Step {currentStep} of 4
            </span>
            <div className="w-24">
              <ProgressBar value={(currentStep / 4) * 100} color="gold" height="sm" />
            </div>
          </div>
        </div>

        {/* Step Tabs */}
        <div className="grid grid-cols-4 gap-2 mt-6 pt-4 border-t border-stone-100 dark:border-charcoal-700">
          {[
            { num: 1, label: 'Trade & Experience' },
            { num: 2, label: 'AI Voice/Viva' },
            { num: 3, label: 'Work Evidence AI' },
            { num: 4, label: 'NSQF Scorecard' },
          ].map((s) => (
            <div
              key={s.num}
              onClick={() => {
                if (s.num <= currentStep) setCurrentStep(s.num);
              }}
              className={`flex items-center gap-2 rounded-xl p-2 cursor-pointer transition-colors ${
                currentStep === s.num
                  ? 'bg-gold-500/15 text-gold-700 dark:text-gold-300 font-bold border border-gold-500/30'
                  : currentStep > s.num
                  ? 'text-emerald-700 dark:text-emerald-400 font-medium'
                  : 'text-slate-400 dark:text-slate-500'
              }`}
            >
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                  currentStep === s.num
                    ? 'bg-gold-500 text-charcoal-950'
                    : currentStep > s.num
                    ? 'bg-emerald-600 text-white'
                    : 'bg-stone-200 dark:bg-charcoal-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                {currentStep > s.num ? <CheckCircle2 className="h-3.5 w-3.5" /> : s.num}
              </div>
              <span className="text-xs hidden sm:inline truncate">{s.label}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* STEP 1: TRADE & PRIOR LEARNING PROFILE */}
      {currentStep === 1 && (
        <Card variant="white" className="p-6 space-y-6">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Step 1: Prior Learning Profile & Background
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Select your unorganized sector trade background to tune the AI questions to your domain.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Target Trade / Qualification Pack
              </label>
              <select
                value={selectedTrade}
                onChange={(e) => setSelectedTrade(e.target.value)}
                className="w-full rounded-xl border border-stone-200 bg-white p-2.5 text-xs font-medium text-slate-800 dark:border-charcoal-700 dark:bg-charcoal-800 dark:text-slate-200 focus:border-gold-500"
              >
                <option>General Electrician (ELE/Q1401 - NSQF Level 4)</option>
                <option>Solar PV Rooftop Installer (SGJ/Q0101 - NSQF Level 4)</option>
                <option>Automotive Service Technician (ASC/Q1402 - NSQF Level 4)</option>
                <option>Welder & Structural Fabricator (CSC/Q0204 - NSQF Level 3)</option>
                <option>Plumbing & Sanitary Generalist (PSC/Q0104 - NSQF Level 3)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Years of Field Experience (Informal / On-the-job)
              </label>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full rounded-xl border border-stone-200 bg-white p-2.5 text-xs font-medium text-slate-800 dark:border-charcoal-700 dark:bg-charcoal-800 dark:text-slate-200 focus:border-gold-500"
              >
                <option value="3">3 - 4 Years (Eligible for Level 3 / 4)</option>
                <option value="5">5 - 6 Years (Eligible for Level 4)</option>
                <option value="7">7+ Years (Eligible for Level 4 / Master Artisan)</option>
                <option value="10">10+ Years (Master Craftsperson / Assessor Pathway)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Preferred Voice / Assessment Dialect
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { name: 'Hindi (हिंदी)', sub: 'उत्तर भारत' },
                { name: 'Hindi + English', sub: 'Hinglish Mix' },
                { name: 'Marathi (मराठी)', sub: 'महाराष्ट्र' },
                { name: 'Tamil (தமிழ்)', sub: 'தமிழ்நாடு' },
              ].map((lang) => (
                <div
                  key={lang.name}
                  onClick={() => setSelectedLanguage(lang.name)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    selectedLanguage.includes(lang.name.split(' ')[0])
                      ? 'border-gold-500 bg-gold-500/10 dark:bg-gold-500/15'
                      : 'border-stone-200 dark:border-charcoal-700 hover:border-gold-300'
                  }`}
                >
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{lang.name}</p>
                  <span className="text-[10px] text-slate-400">{lang.sub}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-stone-100 dark:border-charcoal-700">
            <Button
              variant="primary"
              size="md"
              onClick={() => setCurrentStep(2)}
              icon={<ArrowRight className="h-4 w-4" />}
              iconPosition="right"
            >
              Continue to AI Diagnostic
            </Button>
          </div>
        </Card>
      )}

      {/* STEP 2: AI VOICE & SCENARIO DIAGNOSTIC */}
      {currentStep === 2 && (
        <Card variant="white" className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Badge variant="gold" size="sm">
                Scenario Diagnostic 1 of 3
              </Badge>
              <h2 className="text-base font-bold text-slate-900 dark:text-white mt-2">
                Three-Phase Motor Overheating & MCB Tripping
              </h2>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-stone-100 dark:bg-charcoal-750 px-3 py-1.5 rounded-xl">
              <Volume2 className="h-4 w-4 text-gold-600" />
              <span>Voice prompt available</span>
            </div>
          </div>

          {/* Bilingual Scenario Prompt Box */}
          <div className="rounded-2xl border border-gold-300/60 bg-gold-50/40 p-4 dark:border-gold-500/30 dark:bg-charcoal-750/70">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gold-500 text-charcoal-950 font-black text-xs">
                AI
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  "एक 7.5 HP का Three-Phase Induction Motor चलने के 10 मिनट बाद गर्म होकर MCB ट्रिप कर
                  रहा है। आप सबसे पहले कौन-सी जांच (Diagnostics) करेंगे?"
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 italic">
                  English: "A 7.5 HP 3-phase induction motor overheats and trips the MCB after 10
                  minutes. What is your primary sequence of diagnostics?"
                </p>
              </div>
            </div>
          </div>

          {/* Option A: Voice Response (Designed for informal workers) */}
          <div className="rounded-2xl border border-stone-200 bg-[#FCFAF5] p-4 dark:border-charcoal-700 dark:bg-charcoal-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Mic className="h-4 w-4 text-gold-600" />
                  Option A: Speak Your Answer in Your Mother Tongue
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  SkillSetu AI uses speech-to-intent to map your spoken explanation directly to
                  occupational standards.
                </p>
              </div>

              <button
                onClick={handleSimulateVoice}
                disabled={isRecording}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all shadow-sm ${
                  isRecording
                    ? 'bg-red-500 text-white animate-pulse'
                    : recordedVoice
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gold-500 text-charcoal-950 hover:bg-gold-600'
                }`}
              >
                <Mic className="h-4 w-4" />
                <span>
                  {isRecording
                    ? 'Listening in Hindi...'
                    : recordedVoice
                    ? 'Voice Recorded & Transcribed'
                    : 'Record Spoken Answer'}
                </span>
              </button>
            </div>

            {recordedVoice && (
              <div className="mt-3 rounded-xl bg-white p-3 border border-emerald-500/30 dark:bg-charcoal-700 text-xs space-y-1">
                <div className="flex items-center justify-between text-emerald-700 dark:text-emerald-400 font-semibold">
                  <span>AI Audio Transcription (Hindi):</span>
                  <Badge variant="emerald" size="sm">96% Intent Match</Badge>
                </div>
                <p className="text-slate-700 dark:text-slate-300">
                  "मैं सबसे पहले क्लिप-ऑन मीटर से तीनों फेज़ का करंट नापूंगा कि कहीं सिंगल-फेज़िंग तो नहीं
                  हो रही। फिर वाइंडिंग का इंसुलेशन रेजिस्टेंस मेगर (Megger) से चेक करूंगा।"
                </p>
              </div>
            )}
          </div>

          {/* Option B: Standard Multiple Choice */}
          <div className="space-y-2.5">
            <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Option B: Or select best practical response:
            </p>
            {[
              {
                id: 1,
                text: 'Check line-to-line voltage balance and use clamp meter to detect single-phasing or unbalanced current across R-Y-B phases.',
                isCorrect: true,
              },
              {
                id: 2,
                text: 'Immediately replace the MCB with a higher rating breaker without checking motor current.',
                isCorrect: false,
              },
              {
                id: 3,
                text: 'Pour water over motor casing to reduce operating temperature.',
                isCorrect: false,
              },
              {
                id: 4,
                text: 'Directly bypass the thermal overload relay in the starter box.',
                isCorrect: false,
              },
            ].map((opt) => (
              <div
                key={opt.id}
                onClick={() => setSelectedAnswer(opt.id)}
                className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                  selectedAnswer === opt.id
                    ? 'border-gold-500 bg-gold-500/10 dark:bg-gold-500/20'
                    : 'border-stone-200 dark:border-charcoal-700 hover:border-gold-300 dark:hover:border-charcoal-600'
                }`}
              >
                <div
                  className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold ${
                    selectedAnswer === opt.id
                      ? 'border-gold-500 bg-gold-500 text-charcoal-950'
                      : 'border-stone-400'
                  }`}
                >
                  {selectedAnswer === opt.id ? '✓' : ''}
                </div>
                <span className="text-xs text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                  {opt.text}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-between pt-4 border-t border-stone-100 dark:border-charcoal-700">
            <Button variant="outline" size="md" onClick={() => setCurrentStep(1)}>
              Previous
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => setCurrentStep(3)}
              icon={<ArrowRight className="h-4 w-4" />}
              iconPosition="right"
            >
              Continue to Evidence Verification
            </Button>
          </div>
        </Card>
      )}

      {/* STEP 3: PRACTICAL EVIDENCE AI VERIFICATION */}
      {currentStep === 3 && (
        <Card variant="white" className="p-6 space-y-6">
          <div>
            <Badge variant="gold" size="sm">
              Computer Vision Rubric
            </Badge>
            <h2 className="text-base font-bold text-slate-900 dark:text-white mt-2">
              Step 3: Work Evidence & PPE Verification
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Upload photos or videos of your actual job work. SkillSetu AI checks wiring standards,
              protective equipment, and tool handling before sending to the sector assessor.
            </p>
          </div>

          {/* Upload Simulation Area */}
          <div className="rounded-2xl border-2 border-dashed border-stone-300 dark:border-charcoal-700 p-6 text-center bg-[#FCFAF5] dark:bg-charcoal-800">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-500/15 text-gold-700 dark:text-gold-300 mb-3">
              <Camera className="h-6 w-6" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Demonstration: Substation Panel Wiring & Earthing
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
              Simulated work photo: Industrial Distribution Board with 4-Pole Isolator, MCB array,
              ferruled wiring, and earth busbar.
            </p>

            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <Button
                variant="primary"
                size="md"
                onClick={handleSimulateEvidenceAnalysis}
                disabled={analyzingImage}
                icon={<Sparkles className="h-4 w-4" />}
              >
                {analyzingImage ? 'AI Vision Analyzing Image...' : 'Run AI Vision Audit'}
              </Button>
            </div>
          </div>

          {/* AI Analysis Result */}
          {evidenceAnalyzed && (
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-50/40 dark:bg-charcoal-750 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                  <ShieldCheck className="h-4 w-4" />
                  AI Vision Checklist Passed (Score: 94/100)
                </span>
                <Badge variant="emerald" size="sm">NSQF Compliant</Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-white dark:bg-charcoal-800 p-2.5 rounded-xl border border-emerald-500/20">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">PPE Check</span>
                  <p className="font-bold text-emerald-700 dark:text-emerald-400 mt-0.5">
                    1000V Insulated Gloves ✓
                  </p>
                </div>
                <div className="bg-white dark:bg-charcoal-800 p-2.5 rounded-xl border border-emerald-500/20">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Color Coding</span>
                  <p className="font-bold text-emerald-700 dark:text-emerald-400 mt-0.5">
                    Red-Yellow-Blue-Black ✓
                  </p>
                </div>
                <div className="bg-white dark:bg-charcoal-800 p-2.5 rounded-xl border border-emerald-500/20">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Earthing Bond</span>
                  <p className="font-bold text-emerald-700 dark:text-emerald-400 mt-0.5">
                    Solid Copper Strip Tested ✓
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-4 border-t border-stone-100 dark:border-charcoal-700">
            <Button variant="outline" size="md" onClick={() => setCurrentStep(2)}>
              Previous
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => setCurrentStep(4)}
              icon={<ArrowRight className="h-4 w-4" />}
              iconPosition="right"
            >
              Generate NSQF Assessment Result
            </Button>
          </div>
        </Card>
      )}

      {/* STEP 4: NSQF SCORECARD & ASSESSOR QUEUE */}
      {currentStep === 4 && (
        <Card variant="white" className="p-6 space-y-6">
          <div className="text-center max-w-md mx-auto space-y-2">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-500 text-charcoal-950 font-black shadow-lg shadow-gold-500/30">
              <Award className="h-8 w-8" />
            </div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              Assessment Completed Successfully!
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Your simulated assessment has been compiled and mapped into your candidate portfolio.
            </p>
          </div>

          {/* Result Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-stone-200 bg-[#FCFAF5] p-4 text-center dark:border-charcoal-700 dark:bg-charcoal-800">
              <span className="text-[11px] font-semibold text-slate-500">Overall Score</span>
              <p className="text-3xl font-extrabold text-gold-600 dark:text-gold-400 mt-1">94%</p>
              <span className="text-[10px] text-emerald-600 font-bold">Grade: Distinguished</span>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-[#FCFAF5] p-4 text-center dark:border-charcoal-700 dark:bg-charcoal-800">
              <span className="text-[11px] font-semibold text-slate-500">Qualification Pack</span>
              <p className="text-lg font-extrabold text-slate-900 dark:text-white mt-1">ELE/Q1401</p>
              <span className="text-[10px] text-gold-600 font-bold">NSQF Level 4 Ready</span>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-[#FCFAF5] p-4 text-center dark:border-charcoal-700 dark:bg-charcoal-800">
              <span className="text-[11px] font-semibold text-slate-500">Assessor Review</span>
              <p className="text-lg font-extrabold text-slate-900 dark:text-white mt-1">Queued</p>
              <span className="text-[10px] text-slate-400">Viva slot: Tomorrow 2:30 PM</span>
            </div>
          </div>

          {/* Action Pathways */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-stone-100 dark:border-charcoal-700">
            <Button
              variant="outline"
              size="md"
              onClick={() => navigate('/')}
              className="flex-1"
            >
              Return to Dashboard
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={() => navigate('/qualifications')}
              className="flex-1"
            >
              View Qualification Packs
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate('/skill-passport')}
              icon={<ShieldCheck className="h-4 w-4" />}
              className="flex-1"
            >
              View Skill Passport
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};
