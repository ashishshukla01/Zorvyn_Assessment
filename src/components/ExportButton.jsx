import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext.jsx';
import { exportToJSON, exportToCSV, exportToCSVAdvanced, getExportFilename } from '../utils/exportUtils.js';

const ExportButton = () => {
  const { getFilteredTransactions, getGroupedTransactions, groupBy } = useFinance();
  const [loading, setLoading] = useState(false);

  const handleExport = async (format) => {
    try {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));

      const transactions = getFilteredTransactions();
      const filename = getExportFilename(format);

      if (format === 'json') {
        exportToJSON(transactions, filename);
      } else if (format === 'csv') {
        if (groupBy !== 'none') {
          const grouped = getGroupedTransactions();
          exportToCSVAdvanced(grouped, groupBy, filename);
        } else {
          exportToCSV(transactions, filename);
        }
      }

      // Show success toast-like feedback
      console.log(`✅ Exported ${transactions.length} transactions as ${format.toUpperCase()}`);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => handleExport('json')}
        disabled={loading}
        className="btn-secondary text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 transition-all"
      >
        {loading ? '⏳' : '📥'} JSON
      </button>
      <button
        onClick={() => handleExport('csv')}
        disabled={loading}
        className="btn-secondary text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 transition-all"
      >
        {loading ? '⏳' : '📊'} CSV
      </button>
    </div>
  );
};

export default ExportButton;
