import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { getMonthlyBalanceData } from '../data/mockData.js';

const BalanceTrendChart = ({ transactions }) => {
  const data = getMonthlyBalanceData(transactions);

  if (data.length === 0) {
    return (
      <div className="card h-96 flex items-center justify-center">
        <p className="text-gray-400">No transaction data available</p>
      </div>
    );
  }

  return (
    <div className="card mb-8 animate-slide-up">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">Balance Trend</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="month" 
            tick={{ fill: '#6b7280', fontSize: 12 }}
          />
          <YAxis 
            tick={{ fill: '#6b7280', fontSize: 12 }}
            label={{ value: 'Amount ($)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px'
            }}
            formatter={(value) => `$${value.toFixed(2)}`}
          />
          <Legend />
          <Bar dataKey="income" fill="#10b981" name="Income" radius={[8, 8, 0, 0]} />
          <Bar dataKey="expenses" fill="#ef4444" name="Expenses" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BalanceTrendChart;
