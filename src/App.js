import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import ProtectedRoute from './components/auth/ProtectedRoute';
import CreatePostForm from './components/blog/CreatePostForm';
import Dashboard from './components/common/Dashboard';
import Header from './components/common/Header';
import NotesManager from './components/notes/NotesManager';
import { useAuth } from './contexts/AuthContext';
import BlogList from './components/blog/BlogList';
import BlogPost from './components/blog/BlogPost';
import LandingPage from './components/landing/LandingPage';
import TagFilterView from './components/common/TagFilterView';
import { ThemeProvider } from './contexts/ThemeContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import ProfileSettings from './components/profile/ProfileSettings';
import Toast from './components/common/Toast';
import { useState } from 'react';

// Create a client
const queryClient = new QueryClient();

function AppContent() {
  const { user } = useAuth();
  const [toast, setToast] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100">
      {user && <Header />}
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        
        {/* Protected routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/blog/new" 
          element={
            <ProtectedRoute>
              <CreatePostForm />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/blog" 
          element={
            <ProtectedRoute>
              <BlogList />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/blog/:id" 
          element={
            <ProtectedRoute>
              <BlogPost />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/tasks" 
          element={
            <ProtectedRoute>
              <div>Tasks</div>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/notes" 
          element={
            <ProtectedRoute>
              <NotesManager />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/tags" 
          element={
            <ProtectedRoute>
              <TagFilterView />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <ProfileSettings />
            </ProtectedRoute>
          } 
        />
      </Routes>
      {toast && <Toast {...toast} />}
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AuthProvider>
            <Router>
              <AppContent />
            </Router>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
