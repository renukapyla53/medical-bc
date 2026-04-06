import React, { useState } from 'react';
import { Lock, Mail, Eye, EyeOff, AlertCircle, Heart, Activity, Shield } from 'lucide-react';
import { useAuth } from '../../auth/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isSignUp) {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }

      setError('Sign up feature is for demonstration only. Please use existing credentials to login.');
      return;
    }

    try {
      const success = await login(formData.email, formData.password);

      if (!success) {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Login failed. Please check backend and database connection.');
    }
  };

  const demoCredentials = [
    { email: 'student@university.edu', password: 'student123', role: 'Student' },
    { email: 'admin@university.edu', password: 'admin123', role: 'Admin' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-blue-100 flex items-center justify-center p-4">
      <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-[#0D47A1] to-[#880E4F] text-white py-3 px-4 z-50 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-2 text-sm font-medium">
          <Shield size={16} />
          <span>🔒 Secure Authentication Required - All users must login to access the platform</span>
        </div>
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mt-12">
        <div className="hidden lg:block">
          <div className="bg-gradient-to-br from-[#1565C0] via-[#64B5F6] to-[#F06292] rounded-3xl p-12 text-white shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-white bg-opacity-20 rounded-lg">
                <Heart size={32} />
              </div>
              <h1 className="text-3xl font-bold">Student Wellness Hub</h1>
            </div>

            <p className="text-xl text-blue-50 mb-8">
              Your comprehensive platform for health and wellness resources
            </p>

            <div className="space-y-4">
              <FeatureItem
                icon={Activity}
                text="Access mental health support and counseling"
              />
              <FeatureItem
                icon={Activity}
                text="Join fitness programs and track progress"
              />
              <FeatureItem
                icon={Activity}
                text="Get personalized nutrition advice"
              />
              <FeatureItem
                icon={Activity}
                text="Monitor your wellness journey"
              />
            </div>
          </div>
        </div>

        <div className="w-full max-w-md mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-pink-100">
            <div className="text-center mb-8">
              <div className="inline-flex p-4 bg-gradient-to-br from-blue-100 to-pink-100 text-[#1565C0] rounded-full mb-4 shadow-md">
                <Lock size={32} />
              </div>

              <h2 className="text-3xl font-bold bg-gradient-to-r from-[#1565C0] to-[#C2185B] bg-clip-text text-transparent mb-2">
                {isSignUp ? 'Create Account' : 'Welcome Back'}
              </h2>

              <p className="text-gray-600">
                {isSignUp
                  ? 'Sign up to access wellness resources'
                  : 'Sign in to your account'}
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-start gap-3">
                <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {isSignUp && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="your.email@university.edu"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {isSignUp && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({ ...formData, confirmPassword: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Confirm your password"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-[#1565C0] to-[#C2185B] text-white rounded-xl font-semibold hover:from-[#0D47A1] hover:to-[#880E4F] transition-all shadow-lg hover:shadow-2xl transform hover:scale-[1.02]"
              >
                {isSignUp ? 'Create Account' : 'Sign In'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                  setFormData({ email: '', password: '', confirmPassword: '', name: '' });
                }}
                className="text-[#1565C0] hover:text-[#C2185B] font-semibold text-sm transition-colors"
              >
                {isSignUp
                  ? 'Already have an account? Sign In'
                  : "Don't have an account? Sign Up"}
              </button>
            </div>

            <div className="mt-8 pt-6 border-t-2 border-pink-100">
              <p className="text-xs font-semibold text-gray-700 mb-3 text-center">
                Demo Credentials (for testing):
              </p>

              <div className="space-y-2">
                {demoCredentials.map((cred, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        email: cred.email,
                        password: cred.password,
                      });
                      setError('');
                    }}
                    className="w-full p-3 bg-gradient-to-r from-blue-50 to-pink-50 hover:from-blue-100 hover:to-pink-100 rounded-xl text-left transition-all border-2 border-blue-100 hover:border-pink-200 shadow-sm hover:shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold text-[#1565C0]">{cred.role}</p>
                        <p className="text-xs text-gray-600">{cred.email}</p>
                      </div>
                      <span className="text-xs text-[#C2185B] font-mono font-medium">
                        {cred.password}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:hidden mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Student Wellness Hub - Your health & wellness platform
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="p-2 bg-white bg-opacity-20 rounded-lg flex-shrink-0">
        <Icon size={20} />
      </div>
      <p className="text-blue-50">{text}</p>
    </div>
  );
}