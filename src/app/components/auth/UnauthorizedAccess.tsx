import React from 'react';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

interface UnauthorizedAccessProps {
  onBack: () => void;
}

export default function UnauthorizedAccess({ onBack }: UnauthorizedAccessProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="inline-flex p-4 bg-red-100 text-red-600 rounded-full mb-6">
          <ShieldAlert size={48} />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Access Denied</h1>
        <p className="text-gray-600 mb-8">
          You do not have permission to access this resource. Please contact your administrator if you believe this is an error.
        </p>
        <button
          onClick={onBack}
          className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <ArrowLeft size={20} />
          Go Back
        </button>
      </div>
    </div>
  );
}
