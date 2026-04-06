import React from 'react';
import { getInsights } from '../data/mockData.js';

const InsightsSection = ({ transactions }) => {
  const insights = getInsights(transactions);

  if (insights.length === 0) {
    return (
      <div className="card">
        <p className="text-gray-400">No insights available yet</p>
      </div>
    );
  }

  return (
    <div className="card mb-8 animate-fade-in">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">Financial Insights</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900 dark:to-blue-900 border border-indigo-100 dark:border-indigo-700 rounded-lg p-4 transition-all hover:shadow-lg dark:hover:shadow-lg transform hover:scale-105 animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{insight.title}</p>
                <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-300 mt-1">{insight.value}</p>
              </div>
              <span className="text-3xl">{insight.icon}</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">{insight.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsightsSection;
