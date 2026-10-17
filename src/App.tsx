import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { MainLayout } from './components/layout/MainLayout';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { WorkerOnboardingPage } from './pages/WorkerOnboardingPage';
import { EntryAssessmentPage } from './pages/EntryAssessmentPage';
import { AssessmentResultsPage } from './pages/AssessmentResultsPage';
import { DashboardPage } from './pages/DashboardPage';
import { CoursesPage } from './pages/CoursesPage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { PracticalAssessmentPage } from './pages/PracticalAssessmentPage';
import { AssessorDashboardPage } from './pages/AssessorDashboardPage';
import { AssessmentsPage } from './pages/AssessmentsPage';
import { AssessmentFlowPage } from './pages/AssessmentFlowPage';
import { QualificationsPage } from './pages/QualificationsPage';
import { EvidenceVaultPage } from './pages/EvidenceVaultPage';
import { SkillPassportPage } from './pages/SkillPassportPage';
import { OpportunitiesPage } from './pages/OpportunitiesPage';
import { SettingsPage } from './pages/SettingsPage';

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Landing & Authentication Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />

            {/* Worker Onboarding & Initial Assessment Workflow */}
            <Route path="/onboarding" element={<WorkerOnboardingPage />} />
            <Route path="/entry-assessment" element={<EntryAssessmentPage />} />
            <Route path="/assessment-results" element={<AssessmentResultsPage />} />

            {/* Authenticated Application Shell */}
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/course/:courseId" element={<CourseDetailPage />} />
              <Route path="/practical-assessment/:courseId" element={<PracticalAssessmentPage />} />
              <Route path="/assessor-dashboard" element={<AssessorDashboardPage />} />
              <Route path="/assessor/dashboard" element={<AssessorDashboardPage />} />
              <Route path="/assessor/reviews" element={<AssessorDashboardPage />} />
              <Route path="/assessments" element={<AssessmentsPage />} />
              <Route path="/assessments/start" element={<AssessmentFlowPage />} />
              <Route path="/qualifications" element={<QualificationsPage />} />
              <Route path="/evidence-vault" element={<EvidenceVaultPage />} />
              <Route path="/skill-passport" element={<SkillPassportPage />} />
              <Route path="/opportunities" element={<OpportunitiesPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
