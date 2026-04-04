import React from 'react';
import { AuthProvider, useAuth } from './auth/AuthContext';
import LoginPage from './components/auth/LoginPage';
import AdminDashboard from './components/admin/AdminDashboard';
import StudentDashboard from './components/student/StudentDashboard';
import { Shield, LogOut, User } from 'lucide-react';

function AppContent() {
  const { user, logout, isAuthenticated } = useAuth();

  // If not authenticated, show login page
  if (!isAuthenticated || !user) {
    return <LoginPage />;
  }

  // Role-based access control
  // Only admins can access admin dashboard
  // Only students can access student dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-blue-100">
      {/* User Info and Logout Bar */}
      <div className="fixed top-4 right-4 z-50 bg-white rounded-2xl shadow-2xl p-3 flex items-center gap-3 border-2 border-pink-100">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-xl ${user.role === 'admin' ? 'bg-gradient-to-br from-pink-100 to-pink-200 text-[#C2185B]' : 'bg-gradient-to-br from-blue-100 to-blue-200 text-[#1565C0]'}`}>
            {user.role === 'admin' ? <Shield size={18} /> : <User size={18} />}
          </div>
          <div className="text-sm">
            <p className="font-semibold text-gray-900">{user.name}</p>
            <p className="text-xs capitalize" style={{ color: user.role === 'admin' ? '#C2185B' : '#1565C0' }}>{user.role}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="ml-2 flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-red-50 to-pink-50 text-red-600 rounded-xl hover:from-red-100 hover:to-pink-100 transition-all border border-red-200 shadow-sm hover:shadow-md"
          title="Logout"
        >
          <LogOut size={18} />
          <span className="text-sm font-semibold">Logout</span>
        </button>
      </div>

      {/* Render dashboard based on user role */}
      {user.role === 'admin' ? <AdminDashboard /> : <StudentDashboard />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}