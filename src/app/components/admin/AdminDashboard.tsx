import React, { useState } from 'react';
import {
  LayoutDashboard,
  FileText,
  Calendar,
  BarChart3,
  MessageSquare,
  Plus,
} from 'lucide-react';
import ResourceManagement from './ResourceManagement';
import ProgramManagement from './ProgramManagement';
import UsageAnalytics from './UsageAnalytics';
import SupportManagement from './SupportManagement';

type AdminTab = 'overview' | 'resources' | 'programs' | 'analytics' | 'support';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  const tabs = [
    { id: 'overview' as AdminTab, name: 'Overview', icon: LayoutDashboard },
    { id: 'resources' as AdminTab, name: 'Resources', icon: FileText },
    { id: 'programs' as AdminTab, name: 'Programs', icon: Calendar },
    { id: 'analytics' as AdminTab, name: 'Analytics', icon: BarChart3 },
    { id: 'support' as AdminTab, name: 'Support', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen pb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1565C0] to-[#C2185B] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
              <p className="mt-2 text-lg text-blue-100">
                Manage health resources and wellness programs
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b-2 border-pink-100 shadow-sm">
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
                      ? 'border-[#C2185B] text-[#C2185B]'
                      : 'border-transparent text-gray-500 hover:text-[#1565C0] hover:border-blue-300'
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
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'resources' && <ResourceManagement />}
        {activeTab === 'programs' && <ProgramManagement />}
        {activeTab === 'analytics' && <UsageAnalytics />}
        {activeTab === 'support' && <SupportManagement />}
      </div>
    </div>
  );
}

function OverviewTab() {
  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Resources"
          value="6"
          change="+2 this week"
          icon={FileText}
          color="blue"
        />
        <StatCard
          title="Active Programs"
          value="4"
          change="1,621 enrolled"
          icon={Calendar}
          color="pink"
        />
        <StatCard
          title="Support Requests"
          value="3"
          change="1 pending"
          icon={MessageSquare}
          color="lightblue"
        />
        <StatCard
          title="Active Users"
          value="1,523"
          change="+128 this month"
          icon={BarChart3}
          color="lightpink"
        />
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-pink-100">
        <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-[#1565C0] to-[#C2185B] bg-clip-text text-transparent">Recent Activity</h3>
        <div className="space-y-3">
          <ActivityItem
            title="New resource published"
            description="Sleep Hygiene for Better Rest"
            time="2 hours ago"
            type="resource"
          />
          <ActivityItem
            title="Support request received"
            description="John Doe - Mental Health Support"
            time="5 hours ago"
            type="support"
          />
          <ActivityItem
            title="Program enrollment milestone"
            description="Campus Fitness Challenge reached 500 participants"
            time="1 day ago"
            type="program"
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  change,
  icon: Icon,
  color,
}: {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
  color: string;
}) {
  const colorClasses = {
    blue: 'bg-gradient-to-br from-blue-100 to-blue-200 text-[#1565C0]',
    pink: 'bg-gradient-to-br from-pink-100 to-pink-200 text-[#C2185B]',
    lightblue: 'bg-gradient-to-br from-blue-50 to-blue-100 text-[#64B5F6]',
    lightpink: 'bg-gradient-to-br from-pink-50 to-pink-100 text-[#F06292]',
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-pink-50 hover:shadow-xl transition-all transform hover:scale-105">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl shadow-md ${colorClasses[color as keyof typeof colorClasses]}`}>
          <Icon size={24} />
        </div>
      </div>
      <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
      <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
      <p className="text-xs text-gray-500 font-medium">{change}</p>
    </div>
  );
}

function ActivityItem({
  title,
  description,
  time,
  type,
}: {
  title: string;
  description: string;
  time: string;
  type: string;
}) {
  const typeColors = {
    resource: 'bg-gradient-to-br from-blue-100 to-blue-200 text-[#1565C0]',
    support: 'bg-gradient-to-br from-pink-100 to-pink-200 text-[#C2185B]',
    program: 'bg-gradient-to-br from-blue-50 to-pink-50 text-[#64B5F6]',
  };

  return (
    <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-pink-50 transition-all border border-transparent hover:border-pink-200">
      <div className={`p-2 rounded-lg shadow-sm ${typeColors[type as keyof typeof typeColors]}`}>
        {type === 'resource' && <FileText size={16} />}
        {type === 'support' && <MessageSquare size={16} />}
        {type === 'program' && <Calendar size={16} />}
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-gray-900">{title}</p>
        <p className="text-xs text-gray-600 mt-0.5">{description}</p>
      </div>
      <span className="text-xs text-gray-500 font-medium">{time}</span>
    </div>
  );
}