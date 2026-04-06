import React from 'react';
import { FinanceProvider, useFinance } from './context/FinanceContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import SummaryCards from './components/SummaryCards.jsx';
import BalanceTrendChart from './components/BalanceTrendChart.jsx';
import SpendingBreakdownChart from './components/SpendingBreakdownChart.jsx';
import InsightsSection from './components/InsightsSection.jsx';
import TransactionsList from './components/TransactionsList.jsx';
import RoleSelector from './components/RoleSelector.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';

const DashboardContent = () => {
  const { transactions, role } = useFinance();

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 animate-slide-down">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">💰 Financial Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-400">Track and understand your financial activity</p>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <div className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Current Role</p>
                <p className="text-lg font-bold text-blue-600 dark:text-blue-300 capitalize">{role}</p>
              </div>
            </div>
          </div>
          
          <RoleSelector />
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Summary Section */}
          <SummaryCards transactions={transactions} />

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <BalanceTrendChart transactions={transactions} />
            <SpendingBreakdownChart transactions={transactions} />
          </div>

          {/* Insights Section */}
          <InsightsSection transactions={transactions} />

          {/* Transactions Section */}
          <TransactionsList />
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-gray-600 dark:text-gray-400 text-sm transition-colors">
          <p>Financial Dashboard v2.0 • Built with React, Vite, Tailwind CSS, and Recharts • Dark Mode • Local Storage • Export Features</p>
        </footer>
      </div>
    </main>
  );
};

function App() {
  return (
    <ThemeProvider>
      <FinanceProvider>
        <DashboardContent />
      </FinanceProvider>
    </ThemeProvider>
  );
}

export default App;
