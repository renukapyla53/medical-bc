import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Clock, Filter } from 'lucide-react';
import { initialSupportRequests } from '../../data/mockData';
import type { SupportRequest } from '../../types';

export default function SupportManagement() {
  const [requests, setRequests] = useState<SupportRequest[]>(initialSupportRequests);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');

  const filteredRequests = requests.filter((request) => {
    const matchesStatus = selectedStatus === 'all' || request.status === selectedStatus;
    const matchesPriority = selectedPriority === 'all' || request.priority === selectedPriority;
    return matchesStatus && matchesPriority;
  });

  const handleStatusChange = (id: string, newStatus: SupportRequest['status']) => {
    setRequests((prevRequests) =>
      prevRequests.map((req) =>
        req.id === id ? { ...req, status: newStatus } : req
      )
    );
  };

  const statusCounts = {
    pending: requests.filter((r) => r.status === 'pending').length,
    inProgress: requests.filter((r) => r.status === 'in-progress').length,
    resolved: requests.filter((r) => r.status === 'resolved').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Support Requests</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatusCard
          title="Pending"
          count={statusCounts.pending}
          icon={Clock}
          color="orange"
        />
        <StatusCard
          title="In Progress"
          count={statusCounts.inProgress}
          icon={AlertCircle}
          color="blue"
        />
        <StatusCard
          title="Resolved"
          count={statusCounts.resolved}
          icon={CheckCircle}
          color="green"
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>

          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <RequestCard
            key={request.id}
            request={request}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-gray-500">
            No support requests found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
}

function StatusCard({
  title,
  count,
  icon: Icon,
  color,
}: {
  title: string;
  count: number;
  icon: React.ElementType;
  color: 'orange' | 'blue' | 'green';
}) {
  const colorClasses: Record<'orange' | 'blue' | 'green', string> = {
    orange: 'bg-orange-100 text-orange-600',
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center gap-3">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon size={24} />
        </div>
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{count}</p>
        </div>
      </div>
    </div>
  );
}

function RequestCard({
  request,
  onStatusChange,
}: {
  request: SupportRequest;
  onStatusChange: (id: string, status: SupportRequest['status']) => void;
}) {
  const statusColors: Record<string, string> = {
    pending: 'bg-orange-100 text-orange-700',
    'in-progress': 'bg-blue-100 text-blue-700',
    resolved: 'bg-green-100 text-green-700',
  };

  const priorityColors: Record<string, string> = {
    high: 'bg-red-100 text-red-700',
    medium: 'bg-yellow-100 text-yellow-700',
    low: 'bg-gray-100 text-gray-700',
  };

  const categoryColors: Record<string, string> = {
    'mental-health': 'bg-purple-100 text-purple-700',
    'physical-health': 'bg-green-100 text-green-700',
    nutrition: 'bg-orange-100 text-orange-700',
    other: 'bg-gray-100 text-gray-700',
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[request.status] || 'bg-gray-100 text-gray-700'}`}>
              {request.status
                .split('-')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')}
            </span>

            <span className={`px-2 py-1 rounded text-xs font-medium ${priorityColors[request.priority] || 'bg-gray-100 text-gray-700'}`}>
              {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)} Priority
            </span>

            <span className={`px-2 py-1 rounded text-xs font-medium ${categoryColors[request.category] || 'bg-gray-100 text-gray-700'}`}>
              {request.category
                .split('-')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')}
            </span>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-1">{request.subject}</h3>
          <p className="text-sm text-gray-600 mb-3">{request.message}</p>

          <div className="flex items-center gap-4 text-xs text-gray-500 flex-wrap">
            <span>From: {request.studentName}</span>
            <span>•</span>
            <span>{request.email}</span>
            <span>•</span>
            <span>{request.date}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-2 pt-4 border-t flex-wrap">
        <button
          onClick={() => onStatusChange(request.id, 'pending')}
          disabled={request.status === 'pending'}
          className="px-3 py-2 text-sm rounded-lg bg-orange-50 text-orange-700 hover:bg-orange-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Mark Pending
        </button>

        <button
          onClick={() => onStatusChange(request.id, 'in-progress')}
          disabled={request.status === 'in-progress'}
          className="px-3 py-2 text-sm rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Mark In Progress
        </button>

        <button
          onClick={() => onStatusChange(request.id, 'resolved')}
          disabled={request.status === 'resolved'}
          className="px-3 py-2 text-sm rounded-lg bg-green-50 text-green-700 hover:bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Mark Resolved
        </button>
      </div>
    </div>
  );
}