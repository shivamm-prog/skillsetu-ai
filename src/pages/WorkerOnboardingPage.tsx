import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Mic,
  MicOff,
  User,
  MapPin,
  Zap,
  Wrench,
  Hammer,
  Car,
  Flame,
  Scissors,
  Paintbrush,
  Layers,
  HelpCircle,
  Check,
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useAuth } from '../context/AuthContext';
import type { OnboardingData, TradeId, UserLanguage } from '../types';

export const WorkerOnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, saveOnboarding } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  // Form State initialized from user signup if available
  const [fullName, setFullName] = useState(user?.name || '');
  const [ageRange, setAgeRange] = useState('26-35');
  const [preferredLanguage, setPreferredLanguage] = useState<UserLanguage>(user?.language || 'Hindi');
  const [district, setDistrict] = useState('Jaipur');
  const [state, setState] = useState('Rajasthan');

  // Trade & Experience
  const [primaryTrade, setPrimaryTrade] = useState<TradeId>('Electrician');
  const [experienceYears, setExperienceYears] = useState('5–10 years');

  // Skills & Learning
  const [learningSource, setLearningSource] = useState('Informal apprenticeship with senior ustad / contractor');
  const [performedTasks, setPerformedTasks] = useState<string[]>([
    'Concealed wiring & conduits',
    'Main distribution board assembly',
    'Earth pit testing & earthing'
  ]);
  const [completedTraining, setCompletedTraining] = useState('Informal on-the-job training only (No formal college)');
  const [existingCertificates, setExistingCertificates] = useState<string[]>(['Prior Contractor Affidavit']);
  const [additionalSkills, setAdditionalSkills] = useState<string[]>([
    'Multimeter & diagnostic tools',
    'Workplace safety & PPE adherence',
    'Solar PV rooftop installation'
  ]);

  // Prototype Voice Input Simulation
  const [isRecording, setIsRecording] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState(
    'I have been doing domestic and commercial electrical wiring for 7 years. I install 3-phase DBs, troubleshoot RCCB trips, and wire solar rooftop inverters.'
  );

  const toggleTask = (task: string) => {
    setPerformedTasks((prev) =>
      prev.includes(task) ? prev.filter((t) => t !== task) : [...prev, task]
    );
  };

  const toggleCertificate = (cert: string) => {
    setExistingCertificates((prev) =>
      prev.includes(cert) ? prev.filter((c) => c !== cert) : [...prev, cert]
    );
  };

  const toggleSkill = (skill: string) => {
    setAdditionalSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleVoiceSimulate = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
    }, 2500);
  };

  const handleCompleteOnboarding = () => {
    const onboardingPayload: OnboardingData = {
      fullName: fullName.trim() || user?.name || 'Skilled Candidate',
      ageRange,
      preferredLanguage,
      district,
      state,
      primaryTrade,
      experienceYears,
      learningSource,
      performedTasks,
      completedTraining,
      existingCertificates,
      additionalSkills,
    };

    saveOnboarding(onboardingPayload);
    // Proceed directly to customized Entry-level assessment
    navigate('/entry-assessment');
  };

  // Trade specific task suggestions
  const tradeTasks: Record<TradeId, string[]> = {
    Electrician: [
      'Concealed wiring & conduits',
      'Main distribution board assembly',
      'Earth pit testing & earthing',
      '3-Phase motor starter wiring',
      'Solar PV rooftop inverter connection',
      'Fault diagnosis of tripping MCB/RCCB'
    ],
    Plumber: [
      'CPVC/UPVC water supply piping',
      'Concealed sanitary fitting & traps',
      'Booster pump & pressure tank setup',
      'Leak detection & joint soldering',
      'Drainage vent & sewer line connection',
      'Bathroom mixer & shower valve repairs'
    ],
    Carpenter: ['Cabinet making & joinery', 'Door framing & locks', 'Formwork & scaffolding', 'Furniture polishing'],
    Mechanic: ['Engine diagnostics', 'Brake & hydraulic overhaul', 'Transmission servicing', 'Auto electrical wiring'],
    Mason: ['Bricklaying & mortar mixing', 'Plastering & finishing', 'Tile laying', 'Concrete foundation work'],
    Welder: ['Shielded Metal Arc (SMAW)', 'TIG & MIG welding', 'Gas cutting', 'Structural steel fabrication'],
    Tailor: ['Pattern cutting & sizing', 'Garment stitching', 'Alterations', 'Industrial sewing machine handling'],
    Painter: ['Surface priming & putty', 'Airless spray painting', 'Waterproof coating', 'Texture finishing'],
    Other: ['General fabrication', 'Machinery maintenance', 'HVAC assistance', 'Tool operation']
  };

  const tradesList: { id: TradeId; label: string; icon: React.ElementType }[] = [
    { id: 'Electrician', label: 'Electrician', icon: Zap },
    { id: 'Plumber', label: 'Plumber', icon: Wrench },
    { id: 'Carpenter', label: 'Carpenter', icon: Hammer },
    { id: 'Mechanic', label: 'Mechanic', icon: Car },
    { id: 'Mason', label: 'Mason', icon: Layers },
    { id: 'Welder', label: 'Welder', icon: Flame },
    { id: 'Tailor', label: 'Tailor', icon: Scissors },
    { id: 'Painter', label: 'Painter', icon: Paintbrush },
    { id: 'Other', label: 'Other Trade', icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7EE] text-slate-800 py-10 px-4 sm:px-6 lg:px-8 selection:bg-gold-500/20 selection:text-gold-900">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-gold-500/15 px-3 py-1 text-xs font-bold text-gold-800 border border-gold-500/25">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Worker Recognition of Prior Learning (RPL)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-heading">
            Tell Us About Your Skills
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
            Your experience matters. Let's discover what you can do.
          </p>
        </div>

        {/* Stepper Progress Bar */}
        <div className="bg-white rounded-2xl p-4 border border-stone-200/90 shadow-soft">
          <div className="flex items-center justify-between mb-2 text-xs font-bold text-slate-600">
            <span>Step {currentStep} of {totalSteps}</span>
            <span className="text-gold-700">
              {currentStep === 1 && 'Personal Information'}
              {currentStep === 2 && 'Trade & Experience'}
              {currentStep === 3 && 'Practical Tasks & Learning'}
              {currentStep === 4 && 'Certifications & Voice Viva'}
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-stone-100 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-gold-500 to-amber-500 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* STEP 1: PERSONAL INFORMATION */}
        {currentStep === 1 && (
          <Card variant="white" className="p-6 sm:p-8 space-y-6 border-stone-200/90 shadow-soft">
            <div className="border-b border-stone-100 pb-3">
              <h2 className="text-xl font-bold text-slate-900 font-heading">
                Step 1: Personal Details
              </h2>
              <p className="text-xs text-slate-500">
                Ensure your full name matches your official government ID (Aadhaar/Voter ID) for certification.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Full Legal Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Ramesh Kumar / Priya Sharma"
                    className="w-full rounded-xl border border-stone-200 bg-stone-50/50 py-2.5 pl-10 pr-3.5 text-xs font-medium text-slate-900 outline-none focus:border-gold-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Age Range
                </label>
                <select
                  value={ageRange}
                  onChange={(e) => setAgeRange(e.target.value)}
                  className="w-full rounded-xl border border-stone-200 bg-stone-50/50 p-2.5 text-xs font-medium text-slate-900 outline-none focus:border-gold-500 focus:bg-white"
                >
                  <option value="18-25">18–25 years</option>
                  <option value="26-35">26–35 years</option>
                  <option value="36-45">36–45 years</option>
                  <option value="46+">46+ years</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Preferred Dialect / Language
                </label>
                <select
                  value={preferredLanguage}
                  onChange={(e) => setPreferredLanguage(e.target.value as UserLanguage)}
                  className="w-full rounded-xl border border-stone-200 bg-stone-50/50 p-2.5 text-xs font-medium text-slate-900 outline-none focus:border-gold-500 focus:bg-white"
                >
                  <option value="Hindi">Hindi (हिंदी)</option>
                  <option value="Marathi">Marathi (मराठी)</option>
                  <option value="English">English</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  District
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder="e.g. Pune, Jaipur, Nagpur"
                    className="w-full rounded-xl border border-stone-200 bg-stone-50/50 py-2.5 pl-10 pr-3.5 text-xs font-medium text-slate-900 outline-none focus:border-gold-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  State / Union Territory
                </label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="e.g. Maharashtra, Rajasthan"
                  className="w-full rounded-xl border border-stone-200 bg-stone-50/50 py-2.5 px-3.5 text-xs font-medium text-slate-900 outline-none focus:border-gold-500 focus:bg-white"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button
                variant="primary"
                onClick={() => setCurrentStep(2)}
                icon={<ArrowRight className="h-4 w-4" />}
                iconPosition="right"
              >
                Continue to Trade Selection
              </Button>
            </div>
          </Card>
        )}

        {/* STEP 2: PRIMARY TRADE & EXPERIENCE */}
        {currentStep === 2 && (
          <Card variant="white" className="p-6 sm:p-8 space-y-6 border-stone-200/90 shadow-soft">
            <div className="border-b border-stone-100 pb-3">
              <h2 className="text-xl font-bold text-slate-900 font-heading">
                Step 2: Choose Your Primary Trade
              </h2>
              <p className="text-xs text-slate-500">
                Select the trade you have the most practical experience in. Your preliminary assessment will be tailored to this trade.
              </p>
            </div>

            {/* Visual Trade Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {tradesList.map((t) => {
                const Icon = t.icon;
                const isSelected = primaryTrade === t.id;

                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setPrimaryTrade(t.id)}
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl border text-center transition-all ${
                      isSelected
                        ? 'border-gold-500 bg-gold-500/15 ring-2 ring-gold-500/40 shadow-sm'
                        : 'border-stone-200 bg-stone-50/50 hover:bg-stone-100'
                    }`}
                  >
                    <div
                      className={`p-3 rounded-2xl mb-2 ${
                        isSelected
                          ? 'bg-gold-500 text-charcoal-950 font-black'
                          : 'bg-stone-200 text-slate-700'
                      }`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-bold text-slate-900">{t.label}</span>
                    {isSelected && (
                      <span className="mt-1 flex items-center gap-0.5 text-[10px] font-bold text-gold-800">
                        <Check className="h-3 w-3" /> Selected
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Experience Level */}
            <div className="space-y-2 pt-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Total Hands-on Experience
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {[
                  'Less than 1 year',
                  '1–3 years',
                  '3–5 years',
                  '5–10 years',
                  'More than 10 years',
                ].map((exp) => (
                  <button
                    key={exp}
                    type="button"
                    onClick={() => setExperienceYears(exp)}
                    className={`py-2 px-2.5 rounded-xl border text-xs font-semibold text-center transition ${
                      experienceYears === exp
                        ? 'border-gold-500 bg-gold-500/20 text-gold-900 font-bold ring-1 ring-gold-500'
                        : 'border-stone-200 bg-stone-50/50 text-slate-600 hover:bg-stone-100'
                    }`}
                  >
                    {exp}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(1)}
                icon={<ArrowLeft className="h-4 w-4" />}
              >
                Back
              </Button>
              <Button
                variant="primary"
                onClick={() => setCurrentStep(3)}
                icon={<ArrowRight className="h-4 w-4" />}
                iconPosition="right"
              >
                Continue to Tasks
              </Button>
            </div>
          </Card>
        )}

        {/* STEP 3: PRACTICAL TASKS & LEARNING BACKGROUND */}
        {currentStep === 3 && (
          <Card variant="white" className="p-6 sm:p-8 space-y-6 border-stone-200/90 shadow-soft">
            <div className="border-b border-stone-100 pb-3">
              <h2 className="text-xl font-bold text-slate-900 font-heading">
                Step 3: Which Tasks Can You Perform?
              </h2>
              <p className="text-xs text-slate-500">
                Check all tasks you have completed on job sites. These map directly into National Occupational Standards (NOS).
              </p>
            </div>

            {/* Task Multi-select */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Practical Tasks in {primaryTrade} (Select all that apply)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {(tradeTasks[primaryTrade] || tradeTasks.Electrician).map((task) => {
                  const isChecked = performedTasks.includes(task);

                  return (
                    <label
                      key={task}
                      className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition ${
                        isChecked
                          ? 'border-gold-500 bg-gold-500/10 text-slate-900 font-bold'
                          : 'border-stone-200 bg-stone-50/50 text-slate-700 hover:bg-stone-100'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleTask(task)}
                        className="mt-0.5 h-4 w-4 rounded border-stone-300 text-gold-600 focus:ring-gold-500 accent-gold-600"
                      />
                      <span className="text-xs leading-relaxed">{task}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Where did they learn? */}
            <div className="space-y-2 pt-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Where did you learn your skills?
              </label>
              <select
                value={learningSource}
                onChange={(e) => setLearningSource(e.target.value)}
                className="w-full rounded-xl border border-stone-200 bg-stone-50/50 p-2.5 text-xs font-medium text-slate-900 outline-none focus:border-gold-500 focus:bg-white"
              >
                <option value="Informal apprenticeship with senior ustad / contractor">
                  Informal apprenticeship with senior ustad / contractor
                </option>
                <option value="Family trade passed down through generations">
                  Family trade passed down through generations
                </option>
                <option value="Self-taught through job sites & practical experience">
                  Self-taught through job sites & practical experience
                </option>
                <option value="Local workshop / garage helper">
                  Local workshop / garage helper
                </option>
                <option value="Short training / NGO skill workshop">
                  Short training / NGO skill workshop
                </option>
              </select>
            </div>

            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(2)}
                icon={<ArrowLeft className="h-4 w-4" />}
              >
                Back
              </Button>
              <Button
                variant="primary"
                onClick={() => setCurrentStep(4)}
                icon={<ArrowRight className="h-4 w-4" />}
                iconPosition="right"
              >
                Continue to Certifications
              </Button>
            </div>
          </Card>
        )}

        {/* STEP 4: CERTIFICATES & VOICE INPUT PROTOTYPE */}
        {currentStep === 4 && (
          <Card variant="white" className="p-6 sm:p-8 space-y-6 border-stone-200/90 shadow-soft">
            <div className="border-b border-stone-100 pb-3">
              <h2 className="text-xl font-bold text-slate-900 font-heading">
                Step 4: Certifications & Prototype Voice Intake
              </h2>
              <p className="text-xs text-slate-500">
                Declare any prior vouchers or employer affidavits, and try our simulated vernacular voice intake.
              </p>
            </div>

            {/* Completed Training */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Prior Training Completed
              </label>
              <select
                value={completedTraining}
                onChange={(e) => setCompletedTraining(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-slate-800 text-xs font-medium focus:ring-2 focus:ring-gold-500 focus:outline-none"
              >
                <option value="Informal on-the-job training only (No formal college)">Informal on-the-job training only (Learned under Contractor/Ustad)</option>
                <option value="Short-term skill workshop / PMKVY center">Short-term skill workshop / PMKVY center</option>
                <option value="ITI / Polytechnic diploma">ITI / Polytechnic diploma</option>
                <option value="Apprenticeship Scheme (NAPS)">Apprenticeship Scheme (NAPS)</option>
              </select>
            </div>

            {/* Existing certificates & affidavits */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Existing Vouchers or Prior Proof
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  'Prior Contractor Affidavit',
                  'ITI or Polytech Certificate',
                  'PMKVY / PM Vishwakarma ID',
                  'Employer Experience Letter',
                  'None (Informal Experience)',
                ].map((cert) => {
                  const isChecked = existingCertificates.includes(cert);

                  return (
                    <button
                      key={cert}
                      type="button"
                      onClick={() => toggleCertificate(cert)}
                      className={`p-2.5 rounded-xl border text-left text-xs font-medium transition ${
                        isChecked
                          ? 'border-gold-500 bg-gold-500/15 text-gold-900 font-bold ring-1 ring-gold-500'
                          : 'border-stone-200 bg-stone-50/50 text-slate-600 hover:bg-stone-100'
                      }`}
                    >
                      {cert}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Additional Competencies */}
            <div className="space-y-2 pt-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Additional Skills
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  'Multimeter & diagnostic tools',
                  'Workplace safety & PPE adherence',
                  'Solar PV rooftop installation',
                  'Cost estimation & material quoting',
                  'Basic electrical wiring blueprint reading',
                  'Customer handling & site communication',
                ].map((skill) => {
                  const isChecked = additionalSkills.includes(skill);

                  return (
                    <label
                      key={skill}
                      className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer text-xs transition ${
                        isChecked
                          ? 'border-emerald-500 bg-emerald-50/50 text-emerald-900 font-bold'
                          : 'border-stone-200 bg-stone-50/50 text-slate-600'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleSkill(skill)}
                        className="h-3.5 w-3.5 rounded border-stone-300 text-emerald-600 focus:ring-emerald-500 accent-emerald-600"
                      />
                      <span>{skill}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Prototype Voice Input Box */}
            <div className="rounded-2xl border border-gold-500/30 bg-gold-500/5 p-4 sm:p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-gold-500 text-charcoal-950 font-bold">
                    <Mic className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Prototype Voice Intake
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Speak your trade experience in Hindi or Marathi (Demo Prototype)
                    </p>
                  </div>
                </div>

                <Badge variant="gold" size="sm">
                  AI Prototype
                </Badge>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant={isRecording ? 'secondary' : 'primary'}
                  size="sm"
                  onClick={handleVoiceSimulate}
                  icon={isRecording ? <MicOff className="h-4 w-4 animate-pulse" /> : <Mic className="h-4 w-4" />}
                >
                  {isRecording ? 'Listening in Hindi...' : 'Test Voice Input (Demo)'}
                </Button>

                {isRecording && (
                  <div className="flex items-center gap-1.5 text-xs text-amber-700 font-semibold animate-pulse">
                    <span className="h-2 w-2 rounded-full bg-red-500" />
                    <span>Processing speech signals...</span>
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-slate-600">
                  Voice Transcription / Manual Edit:
                </label>
                <textarea
                  rows={3}
                  value={voiceTranscript}
                  onChange={(e) => setVoiceTranscript(e.target.value)}
                  className="w-full rounded-xl border border-stone-200 bg-white p-3 text-xs text-slate-800 leading-relaxed outline-none focus:border-gold-500"
                  placeholder="You can also manually edit or type your experience here..."
                />
                <span className="text-[10px] text-slate-400">
                  Note: Speech recognition is demonstrated via simulated voice parser. Manual text editing is fully supported.
                </span>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-stone-100">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(3)}
                icon={<ArrowLeft className="h-4 w-4" />}
              >
                Back
              </Button>
              <Button
                variant="primary"
                onClick={handleCompleteOnboarding}
                icon={<Sparkles className="h-4 w-4" />}
                iconPosition="right"
                className="shadow-elevated px-6 py-2.5 font-bold"
              >
                Save & Begin Skill Assessment
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};
