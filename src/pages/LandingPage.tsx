import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Mic,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  Award,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF7EE] text-slate-800 antialiased selection:bg-gold-500/20 selection:text-gold-900 transition-colors duration-200">
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#14161D] text-slate-200 px-4 py-2 text-center text-xs font-medium border-b border-charcoal-750">
        <div className="flex items-center justify-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-gold-500/20 px-2 py-0.5 text-[10px] font-bold text-gold-400 border border-gold-500/30">
            <Sparkles className="h-3 w-3" /> SIH 2026 Initiative
          </span>
          <span className="hidden sm:inline text-slate-300">
            Aligning Informal Sector Skills with National Skills Qualification Framework (NSQF).
          </span>
          <button
            onClick={() => navigate('/signup')}
            className="text-gold-400 font-bold hover:underline flex items-center gap-0.5"
          >
            Explore RPL Pilot <ChevronRight className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* 2. MAIN NAVBAR */}
      <nav className="sticky top-0 z-50 bg-[#FAF7EE]/90 backdrop-blur-md border-b border-stone-200/80 transition-all">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <div
              onClick={() => navigate('/')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-gold-600 via-gold-500 to-amber-300 text-charcoal-950 font-black shadow-lg shadow-gold-500/25 transition-transform group-hover:scale-105">
                <Sparkles className="h-5 w-5 text-charcoal-950 stroke-[2.5]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-2xl tracking-tight text-slate-900">
                    SkillSetu
                  </span>
                  <span className="rounded bg-gold-500/20 px-1.5 py-0.2 text-[11px] font-black text-gold-700 uppercase tracking-widest border border-gold-500/30">
                    AI
                  </span>
                </div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Recognition of Prior Learning
                </p>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#about"
                className="text-sm font-semibold text-slate-600 hover:text-gold-700 transition"
              >
                About
              </a>
              <a
                href="#how-it-works"
                className="text-sm font-semibold text-slate-600 hover:text-gold-700 transition"
              >
                How It Works
              </a>
              <a
                href="#features"
                className="text-sm font-semibold text-slate-600 hover:text-gold-700 transition"
              >
                Features
              </a>
              <a
                href="#impact"
                className="text-sm font-semibold text-slate-600 hover:text-gold-700 transition"
              >
                Impact
              </a>
              <a
                href="#help"
                className="text-sm font-semibold text-slate-600 hover:text-gold-700 transition"
              >
                Help
              </a>
            </div>

            {/* CTAs */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-2 rounded-xl text-sm font-bold text-slate-700 hover:text-slate-900 hover:bg-stone-200/50 transition"
              >
                Log In
              </button>
              <Button
                variant="primary"
                size="md"
                onClick={() => navigate('/signup')}
                icon={<ArrowRight className="h-4 w-4" />}
                iconPosition="right"
                className="shadow-premium"
              >
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-700 hover:bg-stone-200"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-stone-200 bg-[#FAF7EE] px-4 pt-2 pb-6 space-y-3">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-slate-700"
            >
              About
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-slate-700"
            >
              How It Works
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-slate-700"
            >
              Features
            </a>
            <a
              href="#impact"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-slate-700"
            >
              Impact
            </a>
            <a
              href="#help"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-slate-700"
            >
              Help
            </a>
            <div className="pt-3 flex flex-col gap-2">
              <Button
                variant="outline"
                className="w-full justify-center"
                onClick={() => navigate('/login')}
              >
                Log In
              </Button>
              <Button
                variant="primary"
                className="w-full justify-center"
                onClick={() => navigate('/signup')}
              >
                Get Started
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* 3. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-28">
        {/* Ambient Warm Golden Halos */}
        <div className="pointer-events-none absolute -left-20 top-20 h-96 w-96 rounded-full bg-gold-400/15 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-1/4 h-[30rem] w-[30rem] rounded-full bg-amber-500/10 blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Pill badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-3.5 py-1.5 text-xs font-bold text-gold-800">
                <span className="flex h-2 w-2 rounded-full bg-gold-600 animate-pulse" />
                <span>Empowering India's Informal Workforce • RPL 2026</span>
              </div>

              {/* Exact Requested Hero Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
                Your Skills.{' '}
                <span className="bg-gradient-to-r from-gold-600 via-amber-600 to-gold-700 bg-clip-text text-transparent">
                  Your Recognition.
                </span>{' '}
                Your Future.
              </h1>

              {/* Exact Requested Description */}
              <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-2xl">
                Turn your experience into recognized skills. Discover your strengths, demonstrate your abilities, and unlock better opportunities.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate('/signup')}
                  icon={<ArrowRight className="h-5 w-5" />}
                  iconPosition="right"
                  className="shadow-elevated px-8 py-3.5 text-base font-black"
                >
                  Get Started
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/login')}
                  className="border-stone-300 bg-white/80 hover:bg-white text-slate-800 font-bold px-7 py-3.5 text-base"
                >
                  Log In
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-stone-200/90 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="space-y-0.5">
                  <div className="text-xl font-black text-slate-900">400M+</div>
                  <div className="text-xs text-slate-500 font-medium">Informal Workers</div>
                </div>
                <div className="space-y-0.5">
                  <div className="text-xl font-black text-gold-700">40+ Trades</div>
                  <div className="text-xs text-slate-500 font-medium">Electrician, Solar & More</div>
                </div>
                <div className="space-y-0.5">
                  <div className="text-xl font-black text-emerald-700">NCVET Aligned</div>
                  <div className="text-xs text-slate-500 font-medium">National Standards</div>
                </div>
                <div className="space-y-0.5">
                  <div className="text-xl font-black text-slate-900">Vernacular AI</div>
                  <div className="text-xs text-slate-500 font-medium">Hindi, Marathi, English</div>
                </div>
              </div>
            </div>

            {/* Right Visual: Professional visual representing India's skilled workforce (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Visual Frame */}
                <div className="relative overflow-hidden rounded-3xl border-2 border-stone-200/90 bg-white p-3 shadow-2xl">
                  <div className="relative h-96 sm:h-[28rem] rounded-2xl overflow-hidden bg-charcoal-900">
                    <img
                      src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
                      alt="Skilled Indian solar and electrical technician at work"
                      className="h-full w-full object-cover object-center filter brightness-95"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/40 to-transparent" />

                    {/* Top Floating Badge: NSQF Verified */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                      <div className="rounded-xl border border-white/20 bg-black/60 backdrop-blur-md px-3 py-1.5 flex items-center gap-2 text-white">
                        <Award className="h-4 w-4 text-gold-400" />
                        <span className="text-xs font-bold">NSQF Level 4 Aligned</span>
                      </div>
                      <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/70 backdrop-blur-md px-3 py-1.5 flex items-center gap-1.5 text-emerald-300">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-xs font-bold">DigiLocker Ready</span>
                      </div>
                    </div>

                    {/* Bottom Floating Candidate Card */}
                    <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/20 bg-charcoal-900/90 backdrop-blur-md p-4 text-white space-y-2 shadow-2xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="h-10 w-10 rounded-xl bg-gold-500 text-charcoal-950 flex items-center justify-center font-black">
                            <Sparkles className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="font-bold text-sm text-white">Rahul Sharma</h4>
                            <p className="text-[11px] text-gold-300">General Electrician • 7 Yrs Exp</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-mono text-xs font-bold text-gold-400">RPL-2026-9428</span>
                          <span className="block text-[10px] text-slate-400">Verified Prior Learning</span>
                        </div>
                      </div>

                      <div className="rounded-xl bg-charcoal-800/80 p-2.5 flex items-center justify-between text-xs border border-white/10">
                        <span className="text-slate-300 flex items-center gap-1">
                          <Mic className="h-3.5 w-3.5 text-gold-400" /> Voice Diagnostic:
                        </span>
                        <span className="font-bold text-emerald-400">94% Competency Score</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative floating decorative tag */}
                <div className="absolute -bottom-5 -left-5 rounded-2xl border border-gold-500/30 bg-white p-3.5 shadow-xl hidden sm:flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-700">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-900">Zero Paperwork Barrier</div>
                    <div className="text-[11px] text-slate-500">100% Vernacular Audio Viva</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THREE PRIMARY FEATURE CARDS (Requested exactly) */}
      <section id="features" className="py-20 bg-[#F4EFE2] border-y border-stone-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="rounded-full bg-gold-500/15 px-3 py-1 text-xs font-bold text-gold-800 border border-gold-500/25 uppercase tracking-wider">
              Core Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Designed for Artisans, Electricians, and Skilled Trades
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Breaking literacy and formal education bottlenecks with intelligent conversational technology aligned with National Occupational Standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Voice-First Assessment */}
            <Card variant="white" hoverEffect className="p-8 flex flex-col justify-between border-stone-200/90 shadow-soft">
              <div className="space-y-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-500/15 text-gold-700 border border-gold-500/25">
                  <Mic className="h-7 w-7" />
                </div>

                <h3 className="text-xl font-black text-slate-900">
                  Voice-First Assessment
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  Explain your real-world trade knowledge naturally in your spoken language — Marathi, Hindi, or English. No computer literacy or written exams required.
                </p>

                <div className="pt-2 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Real-time technical dialect comprehension</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Audio viva with interactive voice bot</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Multilingual speech-to-competency scoring</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-stone-100 flex items-center justify-between">
                <span className="text-xs font-bold text-gold-700">Vernacular Enabled</span>
                <button
                  onClick={() => navigate('/signup')}
                  className="text-xs font-bold text-slate-900 hover:text-gold-700 flex items-center gap-1"
                >
                  Try Voice Demo <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </Card>

            {/* Card 2: AI-Assisted Skill Discovery */}
            <Card variant="white" hoverEffect className="p-8 flex flex-col justify-between border-stone-200/90 shadow-soft">
              <div className="space-y-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-charcoal-900 text-gold-400 border border-charcoal-700">
                  <Cpu className="h-7 w-7" />
                </div>

                <h3 className="text-xl font-black text-slate-900">
                  AI-Assisted Skill Discovery
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  Automatic intelligent translation of your on-site practical experience into accredited National Occupational Standards (NOS) and Qualification Packs (QP).
                </p>

                <div className="pt-2 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Instant gap analysis against NSQF Level 3 to 5</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Geo-tagged photo & tool verification</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Pre-populates formal RPL portfolio automatically</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-stone-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Automated Mapping</span>
                <button
                  onClick={() => navigate('/signup')}
                  className="text-xs font-bold text-slate-900 hover:text-gold-700 flex items-center gap-1"
                >
                  Map Your Trade <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </Card>

            {/* Card 3: Verified Skill Recognition */}
            <Card variant="white" hoverEffect className="p-8 flex flex-col justify-between border-stone-200/90 shadow-soft">
              <div className="space-y-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-700 border border-emerald-500/25">
                  <ShieldCheck className="h-7 w-7" />
                </div>

                <h3 className="text-xl font-black text-slate-900">
                  Verified Skill Recognition
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  Receive a cryptographically signed Digital Skill Passport backed by NCVET and DigiLocker, unlocking formal contracts, bank loans, and higher wages.
                </p>

                <div className="pt-2 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Tamper-proof QR verification for employers</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>DigiLocker credential integration</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Fast-track to PM Vishwakarma & NAPS</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-stone-100 flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-700">Government Aligned</span>
                <button
                  onClick={() => navigate('/signup')}
                  className="text-xs font-bold text-slate-900 hover:text-gold-700 flex items-center gap-1"
                >
                  View Credential <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="rounded-full bg-gold-500/15 px-3 py-1 text-xs font-bold text-gold-800 border border-gold-500/25 uppercase tracking-wider">
              Simple 3-Step RPL Flow
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              How SkillSetu AI Certifies You
            </h2>
            <p className="text-sm text-slate-600">
              No pen and paper. From voice diagnostic to certified passport in 3 straightforward stages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="rounded-3xl border border-stone-200 bg-white p-7 space-y-4 shadow-soft">
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500 text-charcoal-950 font-black text-base">
                  01
                </span>
                <span className="text-xs font-bold text-gold-700 uppercase">5 Minutes</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">Conversational Voice Intake</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Answer simple questions in Hindi or Marathi about your daily electrical or technical work. The AI transcribes and maps your skills to relevant NSQF standards.
              </p>
            </div>

            {/* Step 2 */}
            <div className="rounded-3xl border border-stone-200 bg-white p-7 space-y-4 shadow-soft">
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-charcoal-900 text-white font-black text-base">
                  02
                </span>
                <span className="text-xs font-bold text-slate-500 uppercase">Quick Upload</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">Practical Work Proof</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Snap photos of your wiring, distribution boards, or safety gear. Our AI vision detects correct ferruling, earth pit readings, and validates genuine field work.
              </p>
            </div>

            {/* Step 3 */}
            <div className="rounded-3xl border border-stone-200 bg-white p-7 space-y-4 shadow-soft">
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white font-black text-base">
                  03
                </span>
                <span className="text-xs font-bold text-emerald-700 uppercase">Accredited</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">Claim Digital Passport</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                An accredited NCVET assessor validates the AI summary. Your Digital Skill Passport is instantly issued with a verifiable QR code for jobs and loan subsidies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. IMPACT & TESTIMONIAL BANNER */}
      <section id="impact" className="py-16 bg-[#14161D] text-white relative overflow-hidden">
        <div className="pointer-events-none absolute right-10 top-0 h-80 w-80 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <Badge variant="gold" size="sm">Real Impact Across India</Badge>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                "From Informal Daily Helper to Certified Solar Technician"
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                "I worked with local contractors for 7 years without any certificate. With SkillSetu AI, I answered the viva in Hindi on my phone, uploaded two photos of my inverter wiring, and received my NSQF Level 4 certificate. Today I am a permanent maintenance technician earning double."
              </p>
              <div className="pt-2 flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                  alt="Rahul Sharma"
                  className="h-12 w-12 rounded-xl object-cover border border-gold-400/40"
                />
                <div>
                  <h4 className="font-bold text-sm text-white">Rahul Sharma</h4>
                  <p className="text-xs text-gold-400">Jaipur, Rajasthan • Certified General Electrician</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
                <div className="text-3xl font-black text-gold-400">15,000+</div>
                <div className="text-xs text-slate-400 mt-1">Workers Evaluated</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
                <div className="text-3xl font-black text-emerald-400">84%</div>
                <div className="text-xs text-slate-400 mt-1">Income Increment</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
                <div className="text-3xl font-black text-white">28</div>
                <div className="text-xs text-slate-400 mt-1">Sector Skill Councils</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
                <div className="text-3xl font-black text-gold-400">100%</div>
                <div className="text-xs text-slate-400 mt-1">Vernacular Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PRE-FOOTER CTA SECTION */}
      <section className="py-20 bg-gradient-to-b from-[#FAF7EE] to-[#F1ECE0]">
        <div className="mx-auto max-w-4xl px-4 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Ready to Get Your Skills Recognized?
          </h2>
          <p className="text-base text-slate-600 max-w-xl mx-auto">
            Take the 5-minute diagnostic voice assessment today. No fees, no exam anxiety, direct government-recognized NSQF mapping.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/signup')}
              icon={<ArrowRight className="h-5 w-5" />}
              iconPosition="right"
              className="shadow-elevated px-8 py-3.5 font-black text-base w-full sm:w-auto"
            >
              Get Started Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/login')}
              className="bg-white border-stone-300 text-slate-800 font-bold px-7 py-3.5 w-full sm:w-auto"
            >
              Assessor & Candidate Login
            </Button>
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer id="help" className="border-t border-stone-200 bg-[#FAF7EE] py-12 text-slate-600 text-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold-500 text-charcoal-950 font-black">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <span className="font-extrabold text-base text-slate-900">SkillSetu AI</span>
                <p className="text-[11px] text-slate-500">Recognition of Prior Learning (RPL) Platform</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-600 font-medium">
              <a href="#about" className="hover:text-gold-700">Ministry Alignment (MSDE)</a>
              <a href="#how-it-works" className="hover:text-gold-700">NSQF Framework</a>
              <a href="#help" className="hover:text-gold-700">Toll-Free Support: 1800-SKILL-IN</a>
              <button onClick={() => navigate('/login')} className="hover:text-gold-700 font-bold">
                Assessor Portal
              </button>
            </div>

            <div className="text-slate-400 text-[11px]">
              © 2026 SkillSetu AI. Aligned with NCVET & Skill India Mission.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
