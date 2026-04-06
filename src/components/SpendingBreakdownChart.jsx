import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts';
import { getSpendingByCategory } from '../data/mockData.js';

const COLORS = [
  '#3b82f6',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#8b5cf6',
  '#ec4899',
  '#06b6d4',
  '#f97316',
  '#6366f1',
  '#14b8a6'
];

const SpendingBreakdownChart = ({ transactions }) => {
  const data = getSpendingByCategory(transactions);

  if (data.length === 0) {
    return (
      <div className="card h-96 flex items-center justify-center">
        <p className="text-gray-400">No expense data available</p>
      </div>
    );
  }

  const totalExpenses = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="card mb-8 animate-slide-up">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">Spending Breakdown by Category</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => `$${value.toFixed(2)}`}
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="lg:col-span-2">
          <div className="space-y-3">
            <div className="mb-4">
              <p className="text-sm text-secondary font-medium">Total Expenses</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">${totalExpenses.toFixed(2)}</p>
            </div>
            
            {data.map((item, index) => {
              const percentage = ((item.value / totalExpenses) * 100).toFixed(1);
              return (
                <div key={index} className="flex items-center gap-3 transition-all hover:opacity-80">
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-primary-dark">{item.name}</span>
                      <span className="text-sm text-secondary">${item.value.toFixed(2)}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: COLORS[index % COLORS.length]
                        }}
                      />
                    </div>
                    <div className="text-xs text-secondary text-right mt-1">{percentage}%</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpendingBreakdownChart;
