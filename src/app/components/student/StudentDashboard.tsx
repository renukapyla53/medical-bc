import React, { useState } from 'react';
import {
  Home,
  BookOpen,
  Calendar,
  MessageCircle,
  Activity,
} from 'lucide-react';
import StudentHome from './StudentHome';
import ResourceBrowser from './ResourceBrowser';
import ProgramBrowser from './ProgramBrowser';
import SupportServices from './SupportServices';
import WellnessTracker from './WellnessTracker';

type StudentTab = 'home' | 'resources' | 'programs' | 'support' | 'tracker';

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState<StudentTab>('home');

  const tabs = [
    { id: 'home' as StudentTab, name: 'Home', icon: Home },
    { id: 'resources' as StudentTab, name: 'Resources', icon: BookOpen },
    { id: 'programs' as StudentTab, name: 'Programs', icon: Calendar },
    { id: 'support' as StudentTab, name: 'Support', icon: MessageCircle },
    { id: 'tracker' as StudentTab, name: 'Wellness Tracker', icon: Activity },
  ];

  return (
    <div className="min-h-screen pb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#64B5F6] via-[#1565C0] to-[#F06292] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white">Student Health & Wellness</h1>
              <p className="mt-2 text-lg text-blue-100">
                Your personal wellness hub
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b-2 border-blue-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 text-sm font-semibold transition-all ${
                    activeTab === tab.id
                      ? 'border-[#1565C0] text-[#1565C0]'
                      : 'border-transparent text-gray-500 hover:text-[#F06292] hover:border-pink-300'
                  }`}
                >
                  <Icon size={18} />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'home' && <StudentHome onNavigate={setActiveTab} />}
        {activeTab === 'resources' && <ResourceBrowser />}
        {activeTab === 'programs' && <ProgramBrowser />}
        {activeTab === 'support' && <SupportServices />}
        {activeTab === 'tracker' && <WellnessTracker />}
      </div>
    </div>
  );
}