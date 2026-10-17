import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  AuthUserProfile,
  UserRole,
  UserLanguage,
  OnboardingData,
  EntryAssessmentResult,
  PracticalSubmission,
  EnrolledCourseState,
  TradeId,
} from '../types';

interface AuthContextType {
  user: AuthUserProfile | null;
  allSubmissions: PracticalSubmission[];
  login: (email: string, password?: string, role?: UserRole) => UserRole;
  signup: (
    name: string,
    email: string,
    password: string,
    language: UserLanguage,
    role: UserRole
  ) => UserRole;
  logout: () => void;
  updateProfile: (updates: Partial<AuthUserProfile>) => void;
  saveOnboarding: (data: OnboardingData) => void;
  saveEntryAssessment: (result: EntryAssessmentResult) => void;
  enrollInCourse: (courseId: string) => void;
  submitPracticalAssessment: (submission: Omit<PracticalSubmission, 'id' | 'submittedAt' | 'status'>) => string;
  gradePracticalSubmission: (
    submissionId: string,
    status: 'Accepted' | 'Insufficient' | 'Additional Evidence Requested',
    criteriaScores: { safetyProtocol: number; technicalAccuracy: number; qualityOfWork: number },
    comments: string,
    assessorName: string
  ) => void;
}

const STORAGE_KEY_WORKER = 'skillsetu_worker_profile';
const STORAGE_KEY_ASSESSOR = 'skillsetu_assessor_profile';
const STORAGE_KEY_ROLE = 'skillsetu_active_role';
const STORAGE_KEY_SUBMISSIONS = 'skillsetu_all_practical_submissions';

// Initial sample demonstration submissions for Assessor queue (clearly labelled as demo submissions)
const initialDemoSubmissions: PracticalSubmission[] = [
  {
    id: 'DEMO-SUB-01',
    courseId: 'ele-course-201',
    courseTitle: 'Electrical Installation and Troubleshooting',
    workerName: 'Suresh Patil',
    workerRplId: 'RPL-2026-6291',
    workerEmail: 'suresh.patil@example.com',
    trade: 'Electrician',
    taskTitle: 'Household Installation Safety Inspection',
    fileName: 'distribution_board_earthing_check.jpg',
    fileSize: '2.4 MB',
    fileType: 'image/jpeg',
    filePreviewUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80',
    taskAnswers: {
      'What specific condition did you inspect?': 'Verified main 32A DP isolator and 30mA RCCB wiring. Checked 2.5 sq mm copper earth lead connected to busbar.',
      'What hazard was identified?': 'Loose terminal screw on kitchen power circuit breaker was causing heat discoloration. Re-torqued and replaced connector.'
    },
    checklistConfirmed: true,
    submittedAt: 'Yesterday, 3:45 PM',
    status: 'Awaiting Review'
  },
  {
    id: 'DEMO-SUB-02',
    courseId: 'plumb-course-201',
    courseTitle: 'Advanced Sanitary and Pressure Diagnostics',
    workerName: 'Kishore Jadhav',
    workerRplId: 'RPL-2026-7302',
    workerEmail: 'kishore.jadhav@example.com',
    trade: 'Plumber',
    taskTitle: 'Diagnose and Repair Leaking Connection Safely',
    fileName: 'cpvc_pressure_relief_joint.jpg',
    fileSize: '3.1 MB',
    fileType: 'image/jpeg',
    filePreviewUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
    taskAnswers: {
      'What was the cause of the leak?': 'Cracked CPVC female threaded adapter due to overtightening on water heater outlet.',
      'What repair steps were taken?': 'Shut off cold inlet valve, drained line, cut defective fitting, solvent welded new brass-insert CPVC adapter with PTFE tape.'
    },
    checklistConfirmed: true,
    submittedAt: 'Today, 10:15 AM',
    status: 'Awaiting Review'
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. All Submissions (for assessor review)
  const [allSubmissions, setAllSubmissions] = useState<PracticalSubmission[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_SUBMISSIONS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to parse practical submissions', e);
    }
    return initialDemoSubmissions;
  });

  // 2. Active User Profile
  const [user, setUser] = useState<AuthUserProfile | null>(() => {
    try {
      const activeRole = localStorage.getItem(STORAGE_KEY_ROLE) as UserRole | null;
      if (activeRole === 'assessor') {
        const storedAssessor = localStorage.getItem(STORAGE_KEY_ASSESSOR);
        if (storedAssessor) return JSON.parse(storedAssessor);
      } else if (activeRole === 'worker') {
        const storedWorker = localStorage.getItem(STORAGE_KEY_WORKER);
        if (storedWorker) return JSON.parse(storedWorker);
      }
    } catch (e) {
      console.warn('Failed to parse active user from localStorage', e);
    }
    // Never return hardcoded fictional names as active user
    return null;
  });

  // Save changes to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY_ROLE, user.role);
      if (user.role === 'worker') {
        localStorage.setItem(STORAGE_KEY_WORKER, JSON.stringify(user));
      } else {
        localStorage.setItem(STORAGE_KEY_ASSESSOR, JSON.stringify(user));
      }
    } else {
      localStorage.removeItem(STORAGE_KEY_ROLE);
    }
  }, [user]);

  // Save all practical submissions
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_SUBMISSIONS, JSON.stringify(allSubmissions));
  }, [allSubmissions]);

  // Sign up method: captures real entered user name
  const signup = (
    name: string,
    email: string,
    _password: string,
    language: UserLanguage,
    role: UserRole
  ): UserRole => {
    const cleanName = name.trim();
    const rplId = role === 'assessor'
      ? `ASSR-${Math.floor(1000 + Math.random() * 9000)}`
      : `RPL-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newProfile: AuthUserProfile = {
      name: cleanName,
      email: email.trim().toLowerCase(),
      role,
      language,
      rplId,
      isLoggedIn: true,
      onboardingCompleted: false,
      enrolledCourses: [],
      practicalSubmissions: [],
      verifiedCompetencies: [],
      badges: []
    };

    setUser(newProfile);
    return role;
  };

  // Login method: loads existing saved profile if matching email exists
  const login = (email: string, _password?: string, role?: UserRole): UserRole => {
    const normalizedEmail = email.trim().toLowerCase();
    const resolvedRole: UserRole =
      role || (normalizedEmail.includes('assessor') ? 'assessor' : 'worker');

    // Check if profile exists in storage for this role
    let existingProfile: AuthUserProfile | null = null;
    try {
      const storageKey = resolvedRole === 'worker' ? STORAGE_KEY_WORKER : STORAGE_KEY_ASSESSOR;
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.email === normalizedEmail || !email) {
          existingProfile = parsed;
        }
      }
    } catch (e) {
      console.warn('Error reading stored profile on login', e);
    }

    if (existingProfile) {
      existingProfile.isLoggedIn = true;
      setUser(existingProfile);
      return existingProfile.role;
    }

    // If new login without prior signup, create clean profile with email username
    const usernamePart = normalizedEmail.split('@')[0] || '';
    const formattedName = usernamePart
      ? usernamePart.charAt(0).toUpperCase() + usernamePart.slice(1)
      : (resolvedRole === 'assessor' ? 'Accredited Assessor' : 'Skilled Candidate');

    const newProfile: AuthUserProfile = {
      name: formattedName,
      email: normalizedEmail || `${usernamePart || 'demo'}@skillsetu.gov.in`,
      role: resolvedRole,
      language: 'Hindi',
      rplId: resolvedRole === 'assessor' ? 'ASSR-NCVET-2026' : `RPL-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      isLoggedIn: true,
      onboardingCompleted: resolvedRole === 'worker' ? false : true,
      enrolledCourses: [],
      practicalSubmissions: [],
      verifiedCompetencies: [],
      badges: []
    };

    setUser(newProfile);
    return resolvedRole;
  };

  const logout = () => {
    if (user) {
      const loggedOutUser = { ...user, isLoggedIn: false };
      if (user.role === 'worker') {
        localStorage.setItem(STORAGE_KEY_WORKER, JSON.stringify(loggedOutUser));
      } else {
        localStorage.setItem(STORAGE_KEY_ASSESSOR, JSON.stringify(loggedOutUser));
      }
    }
    localStorage.removeItem(STORAGE_KEY_ROLE);
    setUser(null);
  };

  const updateProfile = (updates: Partial<AuthUserProfile>) => {
    setUser(prev => {
      if (!prev) return null;
      return { ...prev, ...updates };
    });
  };

  const saveOnboarding = (data: OnboardingData) => {
    setUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        onboardingCompleted: true,
        onboardingData: data,
        language: data.preferredLanguage
      };
    });
  };

  const saveEntryAssessment = (result: EntryAssessmentResult) => {
    setUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        entryAssessment: result
      };
    });
  };

  const enrollInCourse = (courseId: string) => {
    setUser(prev => {
      if (!prev) return null;
      const enrolled = prev.enrolledCourses || [];
      if (enrolled.some(c => c.courseId === courseId)) return prev;

      const newEnrolled: EnrolledCourseState = {
        courseId,
        enrolledAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        progressPercent: 25,
        completedModules: ['m1'],
        practicalSubmitted: false
      };

      return {
        ...prev,
        enrolledCourses: [...enrolled, newEnrolled]
      };
    });
  };

  const submitPracticalAssessment = (
    submissionData: Omit<PracticalSubmission, 'id' | 'submittedAt' | 'status'>
  ): string => {
    const subId = `SUB-${Date.now().toString().slice(-6)}`;
    const newSubmission: PracticalSubmission = {
      ...submissionData,
      id: subId,
      submittedAt: 'Just now',
      status: 'Awaiting Review'
    };

    // 1. Update user profile
    setUser(prev => {
      if (!prev) return null;
      const currentSubs = prev.practicalSubmissions || [];
      const updatedCourses = (prev.enrolledCourses || []).map(c => {
        if (c.courseId === submissionData.courseId) {
          return { ...c, practicalSubmitted: true, progressPercent: 85 };
        }
        return c;
      });

      return {
        ...prev,
        enrolledCourses: updatedCourses,
        practicalSubmissions: [newSubmission, ...currentSubs]
      };
    });

    // 2. Add to global submissions list for Assessor
    setAllSubmissions(prev => [newSubmission, ...prev]);

    return subId;
  };

  const gradePracticalSubmission = (
    submissionId: string,
    status: 'Accepted' | 'Insufficient' | 'Additional Evidence Requested',
    criteriaScores: { safetyProtocol: number; technicalAccuracy: number; qualityOfWork: number },
    comments: string,
    assessorName: string
  ) => {
    const totalScore = Math.round(
      ((criteriaScores.safetyProtocol + criteriaScores.technicalAccuracy + criteriaScores.qualityOfWork) / 15) * 100
    );

    // 1. Update global submissions list
    let targetWorkerRplId = '';
    let targetTrade: TradeId = 'Electrician';

    setAllSubmissions(prev =>
      prev.map(sub => {
        if (sub.id === submissionId) {
          targetWorkerRplId = sub.workerRplId;
          targetTrade = sub.trade;
          return {
            ...sub,
            status,
            criteriaScores,
            totalScore,
            assessorComments: comments,
            assessorName,
            assessedAt: 'Just now'
          };
        }
        return sub;
      })
    );

    // 2. If the active user is the worker or if stored in localStorage, update their verified competencies
    setUser(prev => {
      if (!prev) return null;
      if (prev.role === 'worker' && prev.rplId === targetWorkerRplId) {
        const updatedSubs = (prev.practicalSubmissions || []).map(s => {
          if (s.id === submissionId) {
            return {
              ...s,
              status,
              criteriaScores,
              totalScore,
              assessorComments: comments,
              assessorName,
              assessedAt: 'Just now'
            };
          }
          return s;
        });

        const newVerified = [...(prev.verifiedCompetencies || [])];
        if (status === 'Accepted') {
          const compName = `${targetTrade}: Practical Safety & Installation Protocol`;
          if (!newVerified.includes(compName)) newVerified.push(compName);
        }

        return {
          ...prev,
          practicalSubmissions: updatedSubs,
          verifiedCompetencies: newVerified
        };
      }
      return prev;
    });

    // Also update stored worker if active user is an assessor
    try {
      const storedWorker = localStorage.getItem(STORAGE_KEY_WORKER);
      if (storedWorker) {
        const parsed: AuthUserProfile = JSON.parse(storedWorker);
        if (parsed.rplId === targetWorkerRplId) {
          const updatedSubs = (parsed.practicalSubmissions || []).map(s => {
            if (s.id === submissionId) {
              return {
                ...s,
                status,
                criteriaScores,
                totalScore,
                assessorComments: comments,
                assessorName,
                assessedAt: 'Just now'
              };
            }
            return s;
          });

          const newVerified = [...(parsed.verifiedCompetencies || [])];
          if (status === 'Accepted') {
            const compName = `${targetTrade}: Practical Safety & Installation Protocol`;
            if (!newVerified.includes(compName)) newVerified.push(compName);
          }

          parsed.practicalSubmissions = updatedSubs;
          parsed.verifiedCompetencies = newVerified;
          localStorage.setItem(STORAGE_KEY_WORKER, JSON.stringify(parsed));
        }
      }
    } catch (e) {
      console.warn('Error syncing worker profile from assessor review', e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        allSubmissions,
        login,
        signup,
        logout,
        updateProfile,
        saveOnboarding,
        saveEntryAssessment,
        enrollInCourse,
        submitPracticalAssessment,
        gradePracticalSubmission
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
