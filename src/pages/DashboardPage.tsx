import React from 'react';
import { WelcomeCard } from '../components/dashboard/WelcomeCard';
import { StatsOverview } from '../components/dashboard/StatsOverview';
import { SkillProgressChart } from '../components/dashboard/SkillProgressChart';
import { RecentAssessmentsTable } from '../components/dashboard/RecentAssessmentsTable';
import { RightActivityPanel } from '../components/dashboard/RightActivityPanel';
import { RecentActivityFeed } from '../components/dashboard/RecentActivityFeed';

export const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6 pb-12">
      {/* 1. TOP WELCOME CARD */}
      <section aria-label="Welcome and Profile Status">
        <WelcomeCard />
      </section>

      {/* 2. FOUR STATISTICS CARDS */}
      <section aria-label="Key RPL Metrics">
        <StatsOverview />
      </section>

      {/* 3. MAIN DASHBOARD SPLIT: MAIN CONTENT (LEFT) & ACTIVITY PANEL (RIGHT) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column (8 cols): Progress Chart, Recent Assessments, Activity Feed */}
        <div className="space-y-6 lg:col-span-8">
          {/* Donut Chart: My Skill Progress */}
          <section aria-label="Skill Progress Donut Chart">
            <SkillProgressChart />
          </section>

          {/* Recent Assessments Table */}
          <section aria-label="Recent Assessments">
            <RecentAssessmentsTable />
          </section>

          {/* Recent Activity Audit Feed */}
          <section aria-label="Recent Activity Stream">
            <RecentActivityFeed />
          </section>
        </div>

        {/* Right Column (4 cols): Upcoming Assessments, Evidence Awaiting Verification, Recommended Next Steps */}
        <aside className="lg:col-span-4" aria-label="Upcoming Assessments and Tasks">
          <RightActivityPanel />
        </aside>
      </div>
    </div>
  );
};
