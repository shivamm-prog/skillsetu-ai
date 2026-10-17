import React, { useState } from 'react';
import {
  Search,
  MapPin,
  ArrowRight,
  IndianRupee,
  Calendar,
  CheckCircle2,
  Building,
  ShieldCheck,
  Lock,
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

export interface OpportunityListing {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-Time' | 'Apprenticeship (NAPS)' | 'Govt Scheme' | 'Contract';
  salaryOrStipend: string;
  requiredLevel: 'Foundation' | 'Level 3' | 'Level 4' | 'Level 5';
  requiredCompetencies: string[];
  requiresAssessorVerification: boolean;
  deadline: string;
  isRemoteOrOnsite: 'On-site' | 'Hybrid' | 'Field Work';
}

const demoOpportunities: OpportunityListing[] = [
  {
    id: 'OPP-01',
    title: 'Senior Solar PV Rooftop Technician',
    company: 'Tata Power Renewable Energy Ltd.',
    location: 'Jaipur & Jodhpur, Rajasthan',
    type: 'Full-Time',
    salaryOrStipend: '₹28,000 - ₹34,000 / month',
    requiredLevel: 'Level 4',
    requiredCompetencies: ['Solar PV Inverter Synchronization', 'Workplace Electrical Safety'],
    requiresAssessorVerification: true,
    deadline: '24 Nov 2026',
    isRemoteOrOnsite: 'Field Work',
  },
  {
    id: 'OPP-02',
    title: 'Commercial Control Panel Wireman & Maintenance',
    company: 'Schneider Electric Certified Partner',
    location: 'Pune Industrial Area, Maharashtra',
    type: 'Full-Time',
    salaryOrStipend: '₹24,000 - ₹30,000 / month',
    requiredLevel: 'Level 4',
    requiredCompetencies: ['Distribution Board Wiring', 'Earth Resistance Testing'],
    requiresAssessorVerification: true,
    deadline: '30 Nov 2026',
    isRemoteOrOnsite: 'On-site',
  },
  {
    id: 'OPP-03',
    title: 'Assistant Electrician & Domestic Repair Helper',
    company: 'Urban Company Service Partner Network',
    location: 'All Metro & Tier-2 Cities',
    type: 'Contract',
    salaryOrStipend: '₹18,000 - ₹22,000 / month',
    requiredLevel: 'Foundation',
    requiredCompetencies: ['Basic Circuit Troubleshooting', 'Multimeter Inspection'],
    requiresAssessorVerification: false,
    deadline: 'Open Cohort 2026',
    isRemoteOrOnsite: 'On-site',
  },
  {
    id: 'OPP-04',
    title: 'Commercial Plumbing & Sanitary Fixture Technician',
    company: 'L&T Construction - Metro Rail Facilities',
    location: 'Ahmedabad / Surat, Gujarat',
    type: 'Apprenticeship (NAPS)',
    salaryOrStipend: '₹19,500 / month + NAPS Subsidy',
    requiredLevel: 'Level 3',
    requiredCompetencies: ['CPVC Pressure Jointing', 'Sanitary Waste Lines'],
    requiresAssessorVerification: false,
    deadline: '05 Dec 2026',
    isRemoteOrOnsite: 'On-site',
  },
  {
    id: 'OPP-05',
    title: 'PM Vishwakarma Artisan Tool-Kit & Collateral-Free Credit',
    company: 'Ministry of MSME / Skill India Portal',
    location: 'All Districts Across India',
    type: 'Govt Scheme',
    salaryOrStipend: '₹15,000 Toolkit Voucher + 5% Subsidized Loan',
    requiredLevel: 'Level 3',
    requiredCompetencies: ['Declared Prior Informal Work Experience'],
    requiresAssessorVerification: false,
    deadline: 'Open Cohort 2026',
    isRemoteOrOnsite: 'Field Work',
  },
  {
    id: 'OPP-06',
    title: 'Industrial High-Rise Hydraulic Riser Specialist',
    company: 'DLF Estates & Facility Operations',
    location: 'Gurugram / NCR',
    type: 'Full-Time',
    salaryOrStipend: '₹32,000 - ₹38,000 / month',
    requiredLevel: 'Level 5',
    requiredCompetencies: ['Pressure Booster Pumps', 'Commercial PRV Balancing'],
    requiresAssessorVerification: true,
    deadline: '12 Dec 2026',
    isRemoteOrOnsite: 'On-site',
  },
];

export const OpportunitiesPage: React.FC = () => {
  const { user } = useAuth();
  const [filterType, setFilterType] = useState('all');
  const [search, setSearch] = useState('');
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);

  const verifiedCount = user?.verifiedCompetencies?.length || 0;
  const hasAssessorVerification = verifiedCount > 0;

  const filteredOpportunities = demoOpportunities.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.company.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase()) ||
      item.requiredCompetencies.some((c) => c.toLowerCase().includes(search.toLowerCase()));

    if (!matchesSearch) return false;
    if (filterType === 'jobs') return item.type === 'Full-Time';
    if (filterType === 'schemes') return item.type === 'Govt Scheme';
    if (filterType === 'apprenticeship') return item.type.includes('Apprenticeship');
    if (filterType === 'verified-eligible') return item.requiresAssessorVerification ? hasAssessorVerification : true;
    return true;
  });

  const handleApply = (id: string, requiresVerification: boolean) => {
    if (requiresVerification && !hasAssessorVerification) {
      alert('This advanced opportunity requires an assessor-verified competency on your Skill Passport. Please complete your practical assessment review first.');
      return;
    }
    if (!appliedJobs.includes(id)) {
      setAppliedJobs((prev) => [...prev, id]);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-heading">
              Opportunities & Apprenticeship Board
            </h1>
            <Badge variant="gold" size="sm">
              Competency-Matched
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Jobs, National Apprenticeships (NAPS), and PM Vishwakarma incentives aligned with your verified competencies.
          </p>
        </div>
      </div>

      {/* Notice Banner */}
      <div className="rounded-2xl border border-stone-200 dark:border-charcoal-700 bg-white dark:bg-charcoal-800 p-4 text-xs text-slate-600 dark:text-slate-300 space-y-1 shadow-soft">
        <span className="font-bold text-slate-900 dark:text-white block">
          Transparent Skill Matching Policy:
        </span>
        <p className="text-[11px] leading-relaxed">
          Opportunities below are demonstration listings. Advanced roles require demonstrated or assessor-verified competencies on your Skill Passport rather than course purchases alone.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <Card variant="white" className="p-4">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by job title, location, skill..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-stone-200 bg-white py-1.5 pl-9 pr-3 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-gold-500 dark:border-charcoal-700 dark:bg-charcoal-800 dark:text-slate-200"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto">
            {[
              { id: 'all', label: 'All Listings' },
              { id: 'jobs', label: 'Full-Time Jobs' },
              { id: 'schemes', label: 'Govt Schemes' },
              { id: 'apprenticeship', label: 'Apprenticeships' },
              { id: 'verified-eligible', label: 'My Eligible Matches' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  filterType === tab.id
                    ? 'bg-gold-500 text-charcoal-950 font-bold'
                    : 'bg-stone-100 text-slate-600 dark:bg-charcoal-700 dark:text-slate-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Opportunities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredOpportunities.map((item) => {
          const isApplied = appliedJobs.includes(item.id);
          const isGated = item.requiresAssessorVerification && !hasAssessorVerification;

          return (
            <Card key={item.id} variant="white" hoverEffect className="flex flex-col justify-between p-5">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-gold-500/15 text-gold-700 dark:text-gold-400 px-2 py-0.5 text-[10px] font-bold border border-gold-500/20">
                        {item.type}
                      </span>
                      <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> Ends: {item.deadline}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white mt-2 font-heading">
                      {item.title}
                    </h3>

                    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 mt-1">
                      <Building className="h-3.5 w-3.5 text-slate-400" />
                      <span>{item.company}</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <Badge variant={item.requiredLevel === 'Level 4' ? 'gold' : item.requiredLevel === 'Level 5' ? 'charcoal' : 'blue'} size="sm">
                      {item.requiredLevel}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400 pt-1">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-gold-600 shrink-0" />
                    <span>{item.location} ({item.isRemoteOrOnsite})</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200">
                    <IndianRupee className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span>{item.salaryOrStipend}</span>
                  </div>
                </div>

                {/* Required Competencies */}
                <div className="pt-1 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Required Competencies:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.requiredCompetencies.map((comp, idx) => (
                      <span
                        key={idx}
                        className="rounded bg-stone-100 dark:bg-charcoal-700 px-2 py-0.5 text-[10px] font-medium text-slate-600 dark:text-slate-300"
                      >
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>

                {item.requiresAssessorVerification && (
                  <div className="rounded-xl border border-amber-500/25 bg-amber-50/50 p-2 text-[10px] text-amber-800 flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                    <span>Requires Assessor-Verified endorsement on Skill Passport.</span>
                  </div>
                )}
              </div>

              <div className="mt-5 border-t border-stone-100 dark:border-charcoal-700 pt-3 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">1-Click RPL Fast Track</span>
                <Button
                  variant={isApplied ? 'outline' : isGated ? 'outline' : 'primary'}
                  size="sm"
                  onClick={() => handleApply(item.id, item.requiresAssessorVerification)}
                  disabled={isApplied}
                  icon={
                    isApplied ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    ) : isGated ? (
                      <Lock className="h-3.5 w-3.5 text-slate-400" />
                    ) : (
                      <ArrowRight className="h-3.5 w-3.5" />
                    )
                  }
                  iconPosition="right"
                >
                  {isApplied
                    ? 'Application Sent'
                    : isGated
                    ? 'Assessor Sign-off Needed'
                    : 'Apply with SkillSetu'}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
