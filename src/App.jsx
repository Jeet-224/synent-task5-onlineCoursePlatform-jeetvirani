import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Layout components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';
import Loader from './components/common/Loader';

// Pages
import Home            from './pages/Home';
import NotFound        from './pages/NotFound';
import Login           from './pages/auth/Login';
import Register        from './pages/auth/Register';
import CourseCatalog   from './pages/student/CourseCatalog';
import CourseDetail    from './pages/student/CourseDetail';
import Dashboard       from './pages/student/Dashboard';
import MyLearning      from './pages/student/MyLearning';
import CoursePlayer    from './pages/student/CoursePlayer';

/* ── Layouts ─────────────────────────────────────────────── */
const MainLayout = ({ children }) => (
  <>
    <Navbar />
    <main className="min-h-screen">{children}</main>
    <Footer />
  </>
);

const PlayerLayout = ({ children }) => (
  <div className="h-screen flex flex-col overflow-hidden bg-stone-900">
    {children}
  </div>
);

/* ── App ─────────────────────────────────────────────────── */
export default function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-stone-50">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <Routes>
      {/* Public */}
      <Route path="/"          element={<MainLayout><Home /></MainLayout>} />
      <Route path="/courses"   element={<MainLayout><CourseCatalog /></MainLayout>} />
      <Route path="/courses/:id" element={<MainLayout><CourseDetail /></MainLayout>} />
      <Route path="/login"     element={<MainLayout><Login /></MainLayout>} />
      <Route path="/register"  element={<MainLayout><Register /></MainLayout>} />

      {/* Protected — student */}
      <Route path="/student/dashboard" element={
        <ProtectedRoute roles={['student', 'instructor', 'admin']}>
          <MainLayout><Dashboard /></MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/student/my-learning" element={
        <ProtectedRoute roles={['student', 'instructor', 'admin']}>
          <MainLayout><MyLearning /></MainLayout>
        </ProtectedRoute>
      } />

      {/* Course player — full-screen */}
      <Route path="/learn/:courseId" element={
        <ProtectedRoute>
          <PlayerLayout><CoursePlayer /></PlayerLayout>
        </ProtectedRoute>
      } />

      {/* Convenience redirects */}
      <Route path="/dashboard" element={<Navigate to="/student/dashboard" replace />} />
      <Route path="/my-learning" element={<Navigate to="/student/my-learning" replace />} />

      {/* 404 */}
      <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
    </Routes>
  );
}
