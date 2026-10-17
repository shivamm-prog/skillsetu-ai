import React, { useState } from 'react';
import {
  User,
  Globe,
  Save,
  CheckCircle2,
  Award,
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import type { UserLanguage } from '../types';

export const SettingsPage: React.FC = () => {
  const { user, updateProfile } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [trade, setTrade] = useState(user?.onboardingData?.primaryTrade || 'Electrician');
  const [language, setLanguage] = useState<UserLanguage>(user?.language || 'Hindi');
  const [location, setLocation] = useState(
    user?.onboardingData ? `${user.onboardingData.district}, ${user.onboardingData.state}` : 'Jaipur, Rajasthan'
  );
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    updateProfile({
      name: name.trim(),
      language,
    });

    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 dark:text-white font-heading">
              Candidate Profile & Preferences
            </h1>
            <Badge variant="gold" size="sm">
              RPL Account
            </Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage your personal credentials, vernacular language options, and NSQF alignment goals.
          </p>
        </div>
      </div>

      {saved && (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/20 p-4 text-emerald-800 dark:text-emerald-300 flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <div className="text-xs">
            <span className="font-bold">Preferences saved successfully!</span> Your profile name, dialect, and credentials have been updated across your Skill Passport.
          </div>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Personal Details */}
        <Card variant="white" className="p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-stone-200 dark:border-charcoal-700 pb-3">
            <User className="h-5 w-5 text-gold-600" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading">
              Personal Information
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Full Legal Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your legal full name"
                className="mt-1 w-full rounded-xl border border-stone-200 bg-white p-2.5 text-xs text-slate-900 focus:border-gold-500 focus:outline-none dark:border-charcoal-700 dark:bg-charcoal-800 dark:text-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">RPL Identification Number</label>
              <input
                type="text"
                disabled
                value={user?.rplId || 'RPL-2026-9428'}
                className="mt-1 w-full rounded-xl border border-stone-200 bg-stone-100 p-2.5 text-xs text-slate-500 font-mono dark:border-charcoal-700 dark:bg-charcoal-700/50 dark:text-slate-400"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Primary Trade</label>
              <input
                type="text"
                value={trade}
                onChange={(e) => setTrade(e.target.value as any)}
                className="mt-1 w-full rounded-xl border border-stone-200 bg-white p-2.5 text-xs text-slate-900 focus:border-gold-500 focus:outline-none dark:border-charcoal-700 dark:bg-charcoal-800 dark:text-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Work Location & District</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-1 w-full rounded-xl border border-stone-200 bg-white p-2.5 text-xs text-slate-900 focus:border-gold-500 focus:outline-none dark:border-charcoal-700 dark:bg-charcoal-800 dark:text-white"
              />
            </div>
          </div>
        </Card>

        {/* Vernacular Language Preferences */}
        <Card variant="white" className="p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-stone-200 dark:border-charcoal-700 pb-3">
            <Globe className="h-5 w-5 text-gold-600" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading">
              Language & AI Voice Dialect
            </h2>
          </div>

          <div className="space-y-3">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              SkillSetu AI supports multilingual spoken viva and audio diagnostics in Indian vernaculars:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'Hindi', label: 'Hindi (हिंदी)' },
                { id: 'Marathi', label: 'Marathi (मराठी)' },
                { id: 'English', label: 'English' },
              ].map((lang) => (
                <label
                  key={lang.id}
                  className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition ${
                    language === lang.id
                      ? 'border-gold-500 bg-gold-500/10 text-gold-900 dark:text-gold-200 font-bold'
                      : 'border-stone-200 dark:border-charcoal-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="language"
                    checked={language === lang.id}
                    onChange={() => setLanguage(lang.id as UserLanguage)}
                    className="accent-gold-500"
                  />
                  <span className="text-xs">{lang.label}</span>
                </label>
              ))}
            </div>
          </div>
        </Card>

        {/* Target Qualification Pack */}
        <Card variant="white" className="p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-stone-200 dark:border-charcoal-700 pb-3">
            <Award className="h-5 w-5 text-gold-600" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading">
              NSQF Level Target
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { level: 3, role: 'Assistant Technician', req: '1+ yrs prior exp' },
              { level: 4, role: `${trade} Specialist`, req: '3+ yrs prior exp (Active Target)' },
              { level: 5, role: 'Master Craftsman / Supervisor', req: '5+ yrs prior exp' },
            ].map((lvl) => (
              <div
                key={lvl.level}
                className={`p-4 rounded-xl border text-xs space-y-1 ${
                  lvl.level === 4
                    ? 'border-gold-500 bg-gold-500/10 dark:border-gold-500/30'
                    : 'border-stone-200 dark:border-charcoal-700'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900 dark:text-white">NSQF Level {lvl.level}</span>
                  {lvl.level === 4 && <Badge variant="gold" size="sm">Current</Badge>}
                </div>
                <p className="font-medium text-slate-700 dark:text-slate-300">{lvl.role}</p>
                <span className="text-[11px] text-slate-400 block pt-1">{lvl.req}</span>
              </div>
            ))}
          </div>
        </Card>

        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            size="md"
            icon={<Save className="h-4 w-4" />}
          >
            Save Preferences
          </Button>
        </div>
      </form>
    </div>
  );
};
