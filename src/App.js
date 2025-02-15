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

// Create a client
const queryClient = new QueryClient();

function AppContent() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      {user && <Header />}
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<div>Home Page</div>} />
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
          path="/blog/:id" 
          element={
            <ProtectedRoute>
              <div>View Blog Post</div>
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
      </Routes>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
