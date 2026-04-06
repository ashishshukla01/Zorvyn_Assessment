import React from 'react';
import { useFinance } from '../context/FinanceContext.jsx';

const RoleSelector = () => {
  const { role, setRole } = useFinance();

  return (
    <div className="flex items-center gap-2 mb-6 animate-slide-down">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Role:</span>
      <div className="flex gap-2">
        <button
          onClick={() => setRole('viewer')}
          className={`px-4 py-2 rounded-lg font-medium transition-all transform ${
            role === 'viewer'
              ? 'bg-blue-600 dark:bg-blue-700 text-white shadow-lg scale-105'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          👁️ Viewer
        </button>
        <button
          onClick={() => setRole('admin')}
          className={`px-4 py-2 rounded-lg font-medium transition-all transform ${
            role === 'admin'
              ? 'bg-purple-600 dark:bg-purple-700 text-white shadow-lg scale-105'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          🔧 Admin
        </button>
      </div>
    </div>
  );
};

export default RoleSelector;
