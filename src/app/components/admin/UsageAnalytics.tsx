import React from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, Eye, Calendar, MessageSquare } from 'lucide-react';
import { initialMetrics } from '../../data/mockData';

export default function UsageAnalytics() {
  const metrics = initialMetrics;

  const monthlyData = [
    { month: 'Jan', users: 2100, views: 6800, enrollments: 1200 },
    { month: 'Feb', users: 2847, views: 8976, enrollments: 1621 },
  ];

  const COLORS = ['#9333ea', '#22c55e', '#f97316', '#3b82f6'];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Usage Analytics</h2>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <MetricCard
          icon={Users}
          title="Total Users"
          value={metrics.totalUsers.toLocaleString()}
          color="purple"
        />
        <MetricCard
          icon={TrendingUp}
          title="Active Users"
          value={metrics.activeUsers.toLocaleString()}
          color="green"
        />
        <MetricCard
          icon={Eye}
          title="Resource Views"
          value={metrics.resourceViews.toLocaleString()}
          color="blue"
        />
        <MetricCard
          icon={Calendar}
          title="Enrollments"
          value={metrics.programEnrollments.toLocaleString()}
          color="orange"
        />
        <MetricCard
          icon={MessageSquare}
          title="Support Requests"
          value={metrics.supportRequests.toLocaleString()}
          color="pink"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Monthly Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="users" stroke="#9333ea" strokeWidth={2} />
              <Line type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="enrollments" stroke="#22c55e" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Category Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={metrics.categoryBreakdown}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ category, percent }) => `${category} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="count"
              >
                {metrics.categoryBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Category Engagement */}
        <div className="bg-white p-6 rounded-lg shadow-sm lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Category Engagement</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={metrics.categoryBreakdown}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#9333ea" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Statistics */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Detailed Statistics</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Metric</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">Current</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">Previous</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">Change</th>
              </tr>
            </thead>
            <tbody>
              <StatRow
                label="Total Users"
                current={2847}
                previous={2100}
              />
              <StatRow
                label="Active Users"
                current={1523}
                previous={1100}
              />
              <StatRow
                label="Resource Views"
                current={8976}
                previous={6800}
              />
              <StatRow
                label="Program Enrollments"
                current={1621}
                previous={1200}
              />
              <StatRow
                label="Support Requests"
                current={234}
                previous={189}
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  icon: Icon,
  title,
  value,
  color,
}: {
  icon: React.ElementType;
  title: string;
  value: string;
  color: string;
}) {
  const colorClasses = {
    purple: 'bg-purple-100 text-purple-600',
    green: 'bg-green-100 text-green-600',
    blue: 'bg-blue-100 text-blue-600',
    orange: 'bg-orange-100 text-orange-600',
    pink: 'bg-pink-100 text-pink-600',
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className={`inline-flex p-2 rounded-lg mb-2 ${colorClasses[color as keyof typeof colorClasses]}`}>
        <Icon size={20} />
      </div>
      <p className="text-sm text-gray-600">{title}</p>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
  );
}

function StatRow({
  label,
  current,
  previous,
}: {
  label: string;
  current: number;
  previous: number;
}) {
  const change = ((current - previous) / previous) * 100;
  const isPositive = change > 0;

  return (
    <tr className="border-b last:border-b-0">
      <td className="py-3 px-4 text-sm text-gray-900">{label}</td>
      <td className="py-3 px-4 text-sm text-gray-900 text-right">{current.toLocaleString()}</td>
      <td className="py-3 px-4 text-sm text-gray-600 text-right">{previous.toLocaleString()}</td>
      <td className={`py-3 px-4 text-sm text-right font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? '+' : ''}{change.toFixed(1)}%
      </td>
    </tr>
  );
}
