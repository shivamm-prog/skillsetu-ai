import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Search,
  ArrowRight,
  Plus,
} from 'lucide-react';
import { mockRecentAssessments } from '../data/mockData';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';

export const AssessmentsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialFilter = searchParams.get('filter') || 'all';
  const [filter, setFilter] = useState(initialFilter);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAssessments = mockRecentAssessments.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nosCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.trade.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (filter === 'completed') return item.status === 'Completed';
    if (filter === 'review') return item.status === 'Under Review';
    if (filter === 'in-progress') return item.status === 'In Progress';
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">
              My Skill Assessments
            </h1>
            <Badge variant="gold" size="sm">
              RPL Portfolio
            </Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Track your RPL diagnostic modules, viva sessions, and National Occupational Standards
            verification.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => navigate('/assessments/start')}
          icon={<Plus className="h-4 w-4" />}
        >
          Take New Assessment
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <Card variant="white" className="p-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Status Filter Tabs */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {[
              { id: 'all', label: 'All Modules' },
              { id: 'completed', label: 'Completed (3)' },
              { id: 'review', label: 'Under Review (1)' },
              { id: 'in-progress', label: 'In Progress (1)' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all cursor-pointer ${
                  filter === tab.id
                    ? 'bg-gold-500 text-charcoal-950 shadow-sm'
                    : 'bg-stone-100 text-slate-600 hover:bg-stone-200 dark:bg-charcoal-750 dark:text-slate-300 dark:hover:bg-charcoal-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search assessment title or NOS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-stone-200 bg-white py-1.5 pl-9 pr-3 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-gold-500 dark:border-charcoal-700 dark:bg-charcoal-800 dark:text-slate-200"
            />
          </div>
        </div>
      </Card>

      {/* Assessment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredAssessments.map((item) => (
          <Card key={item.id} variant="white" hoverEffect className="flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-gold-700 dark:text-gold-400">
                  {item.nosCode}
                </span>
                <span className="rounded bg-stone-100 px-2 py-0.5 text-[10px] font-bold text-slate-700 dark:bg-charcoal-700 dark:text-slate-300">
                  NSQF Level {item.nsqfLevel}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white mt-2">
                {item.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Sector: {item.trade} • {item.questionsCount} Diagnostic Questions • {item.evidenceItemsCount} Evidence Uploads
              </p>

              <div className="mt-4 space-y-1.5">
                <div className="flex justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
                  <span>Verification Progress</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {item.progress}%
                  </span>
                </div>
                <ProgressBar
                  value={item.progress}
                  color={item.progress === 100 ? 'emerald' : 'gold'}
                  height="sm"
                />
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-stone-100 pt-3 dark:border-charcoal-700">
              <div className="flex items-center gap-2">
                {item.score ? (
                  <Badge variant="emerald" size="sm">
                    Score: {item.score}%
                  </Badge>
                ) : (
                  <Badge variant="amber" size="sm">
                    {item.status}
                  </Badge>
                )}
                <span className="text-[11px] text-slate-400">{item.date}</span>
              </div>

              <button
                onClick={() => navigate('/assessments/start')}
                className="flex items-center gap-1 text-xs font-bold text-gold-600 hover:text-gold-700 dark:text-gold-400"
              >
                <span>{item.status === 'In Progress' ? 'Resume' : 'View Details'}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
