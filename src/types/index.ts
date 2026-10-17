export type AssessmentStatus = 'Completed' | 'Under Review' | 'In Progress' | 'Evidence Required';

export type UserRole = 'worker' | 'assessor';
export type UserLanguage = 'Marathi' | 'Hindi' | 'English';

export interface AssessmentItem {
  id: string;
  title: string;
  trade: string;
  nsqfLevel: number;
  date: string;
  status: AssessmentStatus;
  progress: number;
  score?: number;
  nosCode: string; // National Occupational Standards code
  questionsCount: number;
  evidenceItemsCount: number;
}

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'assessment' | 'evidence' | 'qualification' | 'assessor' | 'course';
  badge: string;
  iconName: string;
}

export interface UpcomingAssessment {
  id: string;
  title: string;
  type: 'Practical Viva' | 'AI Voice Diagnostics' | 'Written Theory' | 'Safety Simulation';
  scheduledDate: string;
  timeSlot: string;
  durationMinutes: number;
  assessorName: string;
}

export interface PendingEvidence {
  id: string;
  title: string;
  trade: string;
  submittedOn: string;
  status: 'AI Verified' | 'Assessor Queued' | 'Action Needed' | 'Approved';
  evidenceType: 'Geo-Tagged Photo' | 'Worksite Video' | 'Employer Voucher' | 'Workshop Slip';
  filePreview?: string;
  fileName?: string;
}

export interface NextStepRecommendation {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  actionText: string;
  actionLink: string;
  estimatedMinutes: number;
}

export interface CandidateProfile {
  name: string;
  rplId: string;
  trade: string;
  experienceYears: number;
  location: string;
  targetNsqfLevel: number;
  profileCompletion: number;
  verifiedCompetenciesCount: number;
  completedAssessmentsCount: number;
  awaitingReviewCount: number;
  matchedOpportunitiesCount: number;
  preferredLanguage: string;
  avatarUrl?: string;
}

export interface QualificationPack {
  qpCode: string;
  roleName: string;
  sector: string;
  nsqfLevel: number;
  description: string;
  totalNOS: number;
  demonstratedNOS: number;
  status: 'Eligible for Certification' | '75% Complete' | 'Prerequisites Needed';
  minimumExperienceMonths: number;
}

export interface OpportunityItem {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-Time' | 'Apprenticeship (NAPS)' | 'Govt Scheme' | 'Sub-Contract';
  salaryOrStipend: string;
  matchScore: number;
  deadline: string;
  tags: string[];
  requiredSkills?: string[];
  requiredLevel?: string;
}

// ==========================================
// NEW WORKER ONBOARDING & ASSESSMENT TYPES
// ==========================================

export type TradeId =
  | 'Electrician'
  | 'Plumber'
  | 'Carpenter'
  | 'Mechanic'
  | 'Mason'
  | 'Welder'
  | 'Tailor'
  | 'Painter'
  | 'Other';

export interface OnboardingData {
  fullName: string;
  ageRange: string;
  preferredLanguage: UserLanguage;
  district: string;
  state: string;
  primaryTrade: TradeId;
  experienceYears: string;
  learningSource: string;
  performedTasks: string[];
  completedTraining: string;
  existingCertificates: string[];
  additionalSkills: string[];
}

export interface EntryQuestion {
  id: number;
  trade: TradeId;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: 'Safety' | 'Basic Knowledge' | 'Practical Scenario' | 'Troubleshooting';
}

export interface EntryAssessmentResult {
  completed: boolean;
  trade: TradeId;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  userAnswers: Record<number, number>;
  strengths: string[];
  improvements: string[];
  recommendationLevel: 'Foundation' | 'Intermediate' | 'Advanced';
  completedAt: string;
}

// ==========================================
// COURSE RECOMMENDATIONS & PRACTICAL ASSESSMENTS
// ==========================================

export interface CourseModule {
  id: string;
  title: string;
  duration: string;
  description: string;
  topics: string[];
}

export interface CourseItem {
  id: string;
  trade: TradeId;
  title: string;
  level: 'Foundation' | 'Intermediate' | 'Advanced';
  levelTag: string;
  demoPrice: string;
  duration: string;
  skillsCovered: string[];
  eligibility: string;
  assessmentRequirements: string;
  description: string;
  modules: CourseModule[];
  practicalTask: {
    title: string;
    description: string;
    safetyChecklist: string[];
    guidingQuestions: string[];
    evidenceTypeNeeded: string;
  };
}

export interface EnrolledCourseState {
  courseId: string;
  enrolledAt: string;
  progressPercent: number;
  completedModules: string[];
  practicalSubmitted: boolean;
}

export interface PracticalSubmission {
  id: string;
  courseId: string;
  courseTitle: string;
  workerName: string;
  workerRplId: string;
  workerEmail: string;
  trade: TradeId;
  taskTitle: string;
  fileName: string;
  fileSize: string;
  fileType: string;
  filePreviewUrl?: string;
  taskAnswers: Record<string, string>;
  checklistConfirmed: boolean;
  submittedAt: string;
  status: 'Awaiting Review' | 'Accepted' | 'Insufficient' | 'Additional Evidence Requested';
  assessorComments?: string;
  criteriaScores?: {
    safetyProtocol: number; // 1 to 5
    technicalAccuracy: number; // 1 to 5
    qualityOfWork: number; // 1 to 5
  };
  totalScore?: number;
  assessorName?: string;
  assessedAt?: string;
}

// ==========================================
// COMPLETE USER PROFILE STATE
// ==========================================

export interface AuthUserProfile {
  name: string;
  email: string;
  role: UserRole;
  language: UserLanguage;
  rplId: string;
  isLoggedIn: boolean;
  onboardingCompleted?: boolean;
  onboardingData?: OnboardingData;
  entryAssessment?: EntryAssessmentResult;
  enrolledCourses?: EnrolledCourseState[];
  practicalSubmissions?: PracticalSubmission[];
  verifiedCompetencies?: string[];
  badges?: string[];
}
