import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Sparkles,
  User,
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  Globe,
  Briefcase,
  Award,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';
import type { UserLanguage, UserRole } from '../types';

export const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [language, setLanguage] = useState<UserLanguage>('Hindi');
  const [role, setRole] = useState<UserRole>('worker');
  const [showPassword, setShowPassword] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Form validations
    if (!name.trim()) {
      setError('Please provide your full legal name.');
      return;
    }

    if (!email.trim()) {
      setError('Please enter a valid email address.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError('Please provide a valid email format (e.g. name@example.com).');
      return;
    }

    if (!password || password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }

    if (!agreedTerms) {
      setError('Please accept the simulated terms of service to continue.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const chosenRole = signup(name, email, password, language, role);
      if (chosenRole === 'assessor') {
        navigate('/assessor/dashboard');
      } else {
        navigate('/onboarding');
      }
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#FAF7EE] text-slate-800 flex flex-col justify-between selection:bg-gold-500/20 selection:text-gold-900">
      {/* Top Header */}
      <header className="border-b border-stone-200/80 bg-white/60 backdrop-blur-md px-4 py-4 sm:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-gold-600 via-gold-500 to-amber-300 text-charcoal-950 font-black shadow-md shadow-gold-500/20">
            <Sparkles className="h-4 w-4 text-charcoal-950 stroke-[2.5]" />
          </div>
          <span className="font-black text-xl text-slate-900 tracking-tight">
            SkillSetu <span className="text-gold-600">AI</span>
          </span>
        </Link>

        <Link
          to="/"
          className="text-xs font-bold text-slate-600 hover:text-gold-700 transition"
        >
          ← Return to Home
        </Link>
      </header>

      {/* Main Registration Card */}
      <main className="flex-1 flex items-center justify-center px-4 py-10 relative overflow-hidden">
        {/* Subtle Ambient Glows */}
        <div className="pointer-events-none absolute -left-24 top-1/3 h-80 w-80 rounded-full bg-gold-400/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />

        <div className="w-full max-w-lg relative z-10 space-y-6">
          <Card variant="white" className="p-8 sm:p-10 border-stone-200/90 shadow-elevated">
            {/* Header */}
            <div className="text-center space-y-2 mb-8">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-500/15 text-gold-700 border border-gold-500/25 mb-1">
                <Sparkles className="h-6 w-6" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Create Account
              </h1>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Begin your Recognition of Prior Learning journey. Select your vernacular language and account role.
              </p>
            </div>

            {/* Error Notification */}
            {error && (
              <div
                role="alert"
                className="mb-5 rounded-xl border border-red-500/30 bg-red-50 p-3.5 text-xs text-red-700 flex items-start gap-2.5"
              >
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-600" />
                <span className="font-semibold leading-relaxed">{error}</span>
              </div>
            )}

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Account Type Selection (Worker vs Assessor) */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Account Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole('worker')}
                    className={`flex flex-col items-start p-3.5 rounded-2xl border text-left transition ${
                      role === 'worker'
                        ? 'border-gold-500 bg-gold-500/10 shadow-sm ring-1 ring-gold-500'
                        : 'border-stone-200 bg-stone-50/50 hover:bg-stone-100/50'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="p-1.5 rounded-lg bg-gold-500/20 text-gold-800">
                        <Briefcase className="h-4 w-4" />
                      </span>
                      {role === 'worker' && (
                        <CheckCircle2 className="h-4 w-4 text-gold-600" />
                      )}
                    </div>
                    <span className="text-xs font-bold text-slate-900">Skilled Worker</span>
                    <span className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">
                      Electrician, Artisan, Technician
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole('assessor')}
                    className={`flex flex-col items-start p-3.5 rounded-2xl border text-left transition ${
                      role === 'assessor'
                        ? 'border-charcoal-900 bg-charcoal-900 text-white shadow-sm ring-1 ring-charcoal-900'
                        : 'border-stone-200 bg-stone-50/50 hover:bg-stone-100/50'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className={`p-1.5 rounded-lg ${role === 'assessor' ? 'bg-gold-500 text-charcoal-950' : 'bg-stone-200 text-slate-700'}`}>
                        <Award className="h-4 w-4" />
                      </span>
                      {role === 'assessor' && (
                        <CheckCircle2 className="h-4 w-4 text-gold-400" />
                      )}
                    </div>
                    <span className={`text-xs font-bold ${role === 'assessor' ? 'text-white' : 'text-slate-900'}`}>
                      Assessor
                    </span>
                    <span className={`text-[10px] mt-0.5 line-clamp-1 ${role === 'assessor' ? 'text-slate-300' : 'text-slate-500'}`}>
                      Accredited Evaluator
                    </span>
                  </button>
                </div>
              </div>

              {/* Full Name */}
              <div className="space-y-1.5">
                <label
                  htmlFor="fullname"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
                >
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  <input
                    id="fullname"
                    type="text"
                    name="name"
                    placeholder="e.g. Rahul Sharma"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setError(null);
                    }}
                    className="w-full rounded-xl border border-stone-200 bg-stone-50/50 py-2.5 pl-10 pr-3.5 text-xs font-medium text-slate-900 placeholder-slate-400 outline-none transition focus:border-gold-500 focus:bg-white focus:ring-2 focus:ring-gold-500/20"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-1.5">
                <label
                  htmlFor="signup-email"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  <input
                    id="signup-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="e.g. rahul@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError(null);
                    }}
                    className="w-full rounded-xl border border-stone-200 bg-stone-50/50 py-2.5 pl-10 pr-3.5 text-xs font-medium text-slate-900 placeholder-slate-400 outline-none transition focus:border-gold-500 focus:bg-white focus:ring-2 focus:ring-gold-500/20"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label
                  htmlFor="signup-password"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
                >
                  Password (min. 6 characters)
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  <input
                    id="signup-password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    autoComplete="new-password"
                    placeholder="Create a secure password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError(null);
                    }}
                    className="w-full rounded-xl border border-stone-200 bg-stone-50/50 py-2.5 pl-10 pr-10 text-xs font-medium text-slate-900 placeholder-slate-400 outline-none transition focus:border-gold-500 focus:bg-white focus:ring-2 focus:ring-gold-500/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Preferred Language Selection (Marathi, Hindi, English) */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5 text-gold-600" />
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Preferred Language for Voice Diagnostic
                  </label>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {(['Marathi', 'Hindi', 'English'] as UserLanguage[]).map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => setLanguage(lang)}
                      className={`py-2 px-3 rounded-xl border text-center text-xs font-bold transition ${
                        language === lang
                          ? 'border-gold-500 bg-gold-500/20 text-gold-900 ring-1 ring-gold-500'
                          : 'border-stone-200 bg-stone-50/50 text-slate-600 hover:bg-stone-100'
                      }`}
                    >
                      {lang === 'Marathi' && 'मराठी (Marathi)'}
                      {lang === 'Hindi' && 'हिंदी (Hindi)'}
                      {lang === 'English' && 'English'}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-slate-400">
                  AI viva questions will be spoken in your selected dialect.
                </p>
              </div>

              {/* Terms Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer select-none text-xs text-slate-600">
                  <input
                    type="checkbox"
                    checked={agreedTerms}
                    onChange={(e) => setAgreedTerms(e.target.checked)}
                    className="h-4 w-4 rounded border-stone-300 text-gold-600 focus:ring-gold-500 accent-gold-600 mt-0.5"
                  />
                  <span>
                    I confirm that I have informal work experience and agree to simulated RPL skill evaluation under NCVET guidelines.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={isLoading}
                  className="w-full justify-center py-3 font-bold shadow-soft"
                  icon={!isLoading ? <ArrowRight className="h-4 w-4" /> : undefined}
                  iconPosition="right"
                >
                  {isLoading ? 'Creating Your Profile...' : 'Create Account'}
                </Button>
              </div>
            </form>

            {/* Login Navigation */}
            <div className="mt-6 text-center text-xs text-slate-500">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-bold text-gold-700 hover:text-gold-800 underline underline-offset-2"
              >
                Log In
              </Link>
            </div>
          </Card>

          {/* Simulated Disclaimer */}
          <p className="text-center text-[11px] text-slate-400">
            Simulated RPL registration portal. No sensitive Aadhaar or biometric data is collected.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-[11px] text-slate-400 border-t border-stone-200/60">
        © 2026 SkillSetu AI • Aligned with NCVET & Skill India RPL
      </footer>
    </div>
  );
};
