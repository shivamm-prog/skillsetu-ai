import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Sparkles,
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
  User,
  Award,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [forgotPasswordMsg, setForgotPasswordMsg] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Form validation
    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError('Please enter a valid email address (e.g., rahul@example.com).');
      return;
    }

    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const targetRole = login(email, password);
      if (targetRole === 'assessor') {
        navigate('/assessor/dashboard');
      } else {
        // Check if user has completed onboarding
        try {
          const storedWorker = localStorage.getItem('skillsetu_worker_profile');
          if (storedWorker) {
            const parsed = JSON.parse(storedWorker);
            if (parsed.onboardingCompleted) {
              navigate('/dashboard');
              return;
            }
          }
        } catch {
          // ignore
        }
        navigate('/onboarding');
      }
    }, 600);
  };

  const handleQuickDemo = (role: 'worker' | 'assessor') => {
    setError(null);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (role === 'worker') {
        login('worker.demo@skillsetu.gov.in', 'demo123456', 'worker');
        try {
          const storedWorker = localStorage.getItem('skillsetu_worker_profile');
          if (storedWorker && JSON.parse(storedWorker).onboardingCompleted) {
            navigate('/dashboard');
            return;
          }
        } catch {
          // ignore
        }
        navigate('/onboarding');
      } else {
        login('assessor.lead@skillsetu.gov.in', 'assessor123', 'assessor');
        navigate('/assessor/dashboard');
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#FAF7EE] text-slate-800 flex flex-col justify-between selection:bg-gold-500/20 selection:text-gold-900">
      {/* Top Header with Back to Home */}
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

      {/* Main Login Card Section */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 relative overflow-hidden">
        {/* Warm Ambient Accents */}
        <div className="pointer-events-none absolute -left-20 top-1/4 h-80 w-80 rounded-full bg-gold-400/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />

        <div className="w-full max-w-md relative z-10 space-y-6">
          <Card variant="white" className="p-8 sm:p-10 border-stone-200/90 shadow-elevated">
            {/* Header */}
            <div className="text-center space-y-2 mb-8">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-500/15 text-gold-700 border border-gold-500/25 mb-1">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Log In
              </h1>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Access your RPL Skill Portfolio, diagnostic viva records, and verified digital credentials.
              </p>
            </div>

            {/* Error Notification */}
            {error && (
              <div
                role="alert"
                className="mb-5 rounded-xl border border-red-500/30 bg-red-50 dark:bg-red-950/20 p-3.5 text-xs text-red-700 flex items-start gap-2.5"
              >
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-600" />
                <span className="font-semibold leading-relaxed">{error}</span>
              </div>
            )}

            {/* Forgot Password Success Message */}
            {forgotPasswordMsg && (
              <div
                role="status"
                className="mb-5 rounded-xl border border-emerald-500/30 bg-emerald-50 p-3.5 text-xs text-emerald-800 flex items-start gap-2.5"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-emerald-600" />
                <span>
                  Demo Mode: A password reset link has been dispatched to your email address.
                </span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Email */}
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  <input
                    id="email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="e.g. rahul.sharma@example.com"
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
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setForgotPasswordMsg(true)}
                    className="text-xs font-bold text-gold-700 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    autoComplete="current-password"
                    placeholder="Enter your password"
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
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-stone-300 text-gold-600 focus:ring-gold-500 accent-gold-600"
                  />
                  <span className="text-xs font-medium text-slate-600">Remember me</span>
                </label>
              </div>

              {/* Submit CTA */}
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
                  {isLoading ? 'Verifying Account...' : 'Log In'}
                </Button>
              </div>
            </form>

            {/* Quick Demo Credentials */}
            <div className="mt-6 pt-5 border-t border-stone-100 space-y-2.5">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 text-center">
                One-Click Demo Credentials
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickDemo('worker')}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-gold-500/30 bg-gold-500/10 p-2.5 text-xs font-bold text-gold-900 hover:bg-gold-500/20 transition"
                >
                  <User className="h-3.5 w-3.5 text-gold-700" /> Worker Demo
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemo('assessor')}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-charcoal-700 bg-charcoal-900 p-2.5 text-xs font-bold text-white hover:bg-charcoal-800 transition"
                >
                  <Award className="h-3.5 w-3.5 text-gold-400" /> Assessor Demo
                </button>
              </div>
            </div>

            {/* Navigation to Sign-up */}
            <div className="mt-6 text-center text-xs text-slate-500">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="font-bold text-gold-700 hover:text-gold-800 underline underline-offset-2"
              >
                Sign up
              </Link>
            </div>
          </Card>

          {/* Simulated Disclaimer */}
          <p className="text-center text-[11px] text-slate-400">
            Simulated demonstration environment. No real credentials or sensitive biometric records are transmitted.
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
