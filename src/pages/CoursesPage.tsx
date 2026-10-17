import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  ArrowRight,
  Clock,
  Award,
  Check,
  Info,
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useAuth } from '../context/AuthContext';
import { courseCatalog } from '../data/coursesAndAssessments';
import type { TradeId } from '../types';

export const CoursesPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, enrollInCourse } = useAuth();

  const userTrade: TradeId = (user?.onboardingData?.primaryTrade as TradeId) || 'Electrician';
  const recLevel = user?.entryAssessment?.recommendationLevel;

  const [selectedTrade, setSelectedTrade] = useState<TradeId | 'All'>(userTrade);
  const [selectedLevel, setSelectedLevel] = useState<'all' | 'recommended' | 'Foundation' | 'Intermediate' | 'Advanced'>('all');

  const enrolledCourseIds = (user?.enrolledCourses || []).map((c) => c.courseId);

  const filteredCourses = courseCatalog.filter((course) => {
    if (selectedTrade !== 'All' && course.trade !== selectedTrade) {
      return false;
    }
    if (selectedLevel === 'recommended') {
      return recLevel ? course.level === recLevel : true;
    }
    if (selectedLevel !== 'all' && course.level !== selectedLevel) {
      return false;
    }
    return true;
  });

  const handleEnroll = (courseId: string) => {
    enrollInCourse(courseId);
    navigate(`/course/${courseId}`);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-heading">
              Your Recommended Learning Paths
            </h1>
            <Badge variant="gold" size="sm">
              Demonstration Catalog
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Build competencies and prepare for practical workplace tasks. Browse all levels or filter by your assessment recommendation.
          </p>
        </div>
      </div>

      {/* Critical Transparency & Distinction Banner */}
      <div className="rounded-2xl border border-gold-500/30 bg-gradient-to-r from-gold-500/10 via-[#FAF7EE] to-amber-500/10 dark:from-charcoal-800 dark:to-charcoal-850 p-4 sm:p-5 text-xs text-slate-700 dark:text-slate-300 space-y-2 shadow-soft">
        <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm font-heading">
          <Info className="h-4 w-4 text-gold-600" />
          <span>Understanding Credential Types on SkillSetu AI</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-1">
          <div className="rounded-xl bg-white/80 dark:bg-charcoal-800 p-2.5 border border-stone-200/80 dark:border-charcoal-700">
            <span className="font-bold text-slate-900 dark:text-white block">1. Course Completion</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              Acknowledges self-paced completion of learning modules.
            </span>
          </div>
          <div className="rounded-xl bg-white/80 dark:bg-charcoal-800 p-2.5 border border-stone-200/80 dark:border-charcoal-700">
            <span className="font-bold text-slate-900 dark:text-white block">2. Platform Badge</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              Diagnostic recognition based on quiz accuracy.
            </span>
          </div>
          <div className="rounded-xl bg-white/80 dark:bg-charcoal-800 p-2.5 border border-stone-200/80 dark:border-charcoal-700">
            <span className="font-bold text-slate-900 dark:text-white block">3. Assessor-Verified</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              Requires accredited human assessor evaluation of workplace evidence.
            </span>
          </div>
          <div className="rounded-xl bg-white/80 dark:bg-charcoal-800 p-2.5 border border-stone-200/80 dark:border-charcoal-700">
            <span className="font-bold text-slate-900 dark:text-white block">4. Formal Certification</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              Official NCVET credential issued via DigiLocker.
            </span>
          </div>
        </div>
        <p className="text-[10px] text-slate-400 dark:text-slate-400 pt-1">
          *Notice: Demonstration courses and prices shown are simulated for prototype testing. Paying a higher course fee does not automatically provide formal government certification.
        </p>
      </div>

      {/* Filter and Trade Selection Controls */}
      <Card variant="white" className="p-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Trade Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Trade:</span>
            <div className="flex flex-wrap gap-1.5">
              {(['Electrician', 'Plumber', 'All'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTrade(t)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    selectedTrade === t
                      ? 'bg-gold-500 text-charcoal-950 font-black'
                      : 'bg-stone-100 dark:bg-charcoal-700 text-slate-600 dark:text-slate-300 hover:bg-stone-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Level Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: 'All Levels' },
              ...(recLevel ? [{ id: 'recommended', label: `Recommended (${recLevel})` }] : []),
              { id: 'Foundation', label: 'Foundation' },
              { id: 'Intermediate', label: 'Intermediate' },
              { id: 'Advanced', label: 'Advanced' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedLevel(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 ${
                  selectedLevel === tab.id
                    ? 'bg-charcoal-900 text-white dark:bg-gold-500 dark:text-charcoal-950'
                    : 'bg-stone-100 dark:bg-charcoal-750 text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const isEnrolled = enrolledCourseIds.includes(course.id);
          const isRecommended = recLevel === course.level;

          return (
            <Card
              key={course.id}
              variant="white"
              hoverEffect
              className="flex flex-col justify-between p-6 relative overflow-hidden"
            >
              {isRecommended && (
                <div className="absolute top-0 right-0 bg-gold-500 text-charcoal-950 font-black text-[10px] uppercase px-3 py-1 rounded-bl-xl shadow-sm">
                  Recommended For You
                </div>
              )}

              <div className="space-y-4">
                {/* Trade & Level */}
                <div className="flex items-center gap-2">
                  <span className="rounded-lg bg-stone-100 dark:bg-charcoal-700 px-2 py-0.5 text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    {course.trade}
                  </span>
                  <Badge variant={course.level === 'Foundation' ? 'blue' : course.level === 'Intermediate' ? 'gold' : 'charcoal'} size="sm">
                    {course.level}
                  </Badge>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug font-heading">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                {/* Duration & Demo Price */}
                <div className="flex items-center justify-between text-xs py-2 border-y border-stone-100 dark:border-charcoal-700">
                  <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                    <Clock className="h-3.5 w-3.5" /> {course.duration}
                  </span>
                  <div className="text-right">
                    <span className="text-[10px] uppercase text-slate-400 block">Demo Price</span>
                    <span className="font-bold text-slate-900 dark:text-white">{course.demoPrice}</span>
                  </div>
                </div>

                {/* Skills Covered */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                    Key Competencies Covered:
                  </span>
                  <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                    {course.skillsCovered.slice(0, 3).map((skill, i) => (
                      <li key={i} className="flex items-center gap-1.5 truncate">
                        <Check className="h-3 w-3 text-emerald-500 shrink-0" />
                        <span className="truncate">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Practical Assessment Task Teaser */}
                <div className="rounded-xl bg-stone-50 dark:bg-charcoal-800 p-3 text-xs space-y-1 border border-stone-200/70 dark:border-charcoal-700">
                  <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                    <Award className="h-3.5 w-3.5 text-gold-600" /> Practical Task Included:
                  </span>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                    {course.practicalTask.title}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-stone-100 dark:border-charcoal-700">
                {isEnrolled ? (
                  <Button
                    variant="primary"
                    className="w-full justify-between"
                    onClick={() => navigate(`/course/${course.id}`)}
                    icon={<ArrowRight className="h-4 w-4" />}
                    iconPosition="right"
                  >
                    <span>Continue Learning</span>
                  </Button>
                ) : (
                  <Button
                    variant={isRecommended ? 'primary' : 'outline'}
                    className="w-full justify-between"
                    onClick={() => handleEnroll(course.id)}
                    icon={<BookOpen className="h-4 w-4" />}
                  >
                    <span>Enroll Now ({course.demoPrice})</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
