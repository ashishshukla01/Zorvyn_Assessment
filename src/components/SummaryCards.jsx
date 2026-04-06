import React from 'react';
import { calculateBalance, calculateTotalIncome, calculateTotalExpenses } from '../data/mockData.js';

const SummaryCards = ({ transactions }) => {
  const balance = calculateBalance(transactions);
  const income = calculateTotalIncome(transactions);
  const expenses = calculateTotalExpenses(transactions);

  const cards = [
    {
      title: 'Total Balance',
      amount: balance,
      icon: '💼',
      color: 'bg-blue-50 dark:bg-blue-900',
      textColor: 'text-blue-600 dark:text-blue-300',
      borderColor: 'border-blue-200 dark:border-blue-700'
    },
    {
      title: 'Total Income',
      amount: income,
      icon: '📈',
      color: 'bg-green-50 dark:bg-green-900',
      textColor: 'text-green-600 dark:text-green-300',
      borderColor: 'border-green-200 dark:border-green-700'
    },
    {
      title: 'Total Expenses',
      amount: expenses,
      icon: '📉',
      color: 'bg-red-50 dark:bg-red-900',
      textColor: 'text-red-600 dark:text-red-300',
      borderColor: 'border-red-200 dark:border-red-700'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`card ${card.color} border-l-4 ${card.borderColor} transform transition-all hover:scale-105 animate-slide-up`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">
                {card.title}
              </p>
              <p className={`text-3xl font-bold ${card.textColor}`}>
                ${card.amount.toFixed(2)}
              </p>
            </div>
            <div className="text-4xl opacity-30 group-hover:opacity-50 transition-opacity">
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
