import React, { useEffect, useState } from 'react';
import { AlertCircle } from 'lucide-react';

interface SessionTimeoutWarningProps {
  onLogout: () => void;
  onContinue: () => void;
}

export default function SessionTimeoutWarning({ onLogout, onContinue }: SessionTimeoutWarningProps) {
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    if (countdown === 0) {
      onLogout();
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, onLogout]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[100]">
      <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-orange-100 text-orange-600 rounded-lg">
            <AlertCircle size={24} />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Session Timeout Warning</h3>
        </div>
        <p className="text-gray-600 mb-4">
          Your session is about to expire due to inactivity. You will be automatically logged out in{' '}
          <span className="font-bold text-orange-600">{countdown}</span> seconds.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onContinue}
            className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Stay Logged In
          </button>
          <button
            onClick={onLogout}
            className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Logout Now
          </button>
        </div>
      </div>
    </div>
  );
}
