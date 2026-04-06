import React, { useState, useRef, useEffect } from 'react';
import { useFinance } from '../context/FinanceContext.jsx';
import { categories } from '../data/mockData.js';
import ExportButton from './ExportButton.jsx';

const TransactionsList = () => {
  const {
    transactions,
    role,
    searchTerm,
    setSearchTerm,
    filterCategory,
    setFilterCategory,
    sortBy,
    setSortBy,
    groupBy,
    setGroupBy,
    dateRange,
    setDateRange,
    typeFilter,
    setTypeFilter,
    currentPage,
    setCurrentPage,
    getFilteredTransactions,
    getGroupedTransactions,
    getPaginatedTransactions,
    getTotalPages,
    goToNextPage,
    goToPreviousPage,
    goToPage,
    resetFilters,
    addTransaction,
    deleteTransaction,
    updateTransaction
  } = useFinance();

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    amount: '',
    category: categories[0],
    type: 'expense',
    description: ''
  });

  const formRef = useRef(null);
  const transactionsListRef = useRef(null);

  const filteredTransactions = getFilteredTransactions();

  const handleAddTransaction = (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.description) {
      alert('Please fill in all fields');
      return;
    }

    if (editingId) {
      updateTransaction(editingId, {
        ...formData,
        amount: parseFloat(formData.amount)
      });
      setEditingId(null);
    } else {
      addTransaction({
        ...formData,
        amount: parseFloat(formData.amount)
      });
    }

    setFormData({
      date: new Date().toISOString().split('T')[0],
      amount: '',
      category: categories[0],
      type: 'expense',
      description: ''
    });
    setShowAddForm(false);
  };

  const handleEditClick = (transaction) => {
    setFormData({
      date: transaction.date,
      amount: transaction.amount.toString(),
      category: transaction.category,
      type: transaction.type,
      description: transaction.description
    });
    setEditingId(transaction.id);
    setShowAddForm(true);
    
    // Scroll to form after a small delay to ensure the form is rendered
    setTimeout(() => {
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingId(null);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      amount: '',
      category: categories[0],
      type: 'expense',
      description: ''
    });
  };

  // Scroll to transactions list when page changes
  useEffect(() => {
    if (transactionsListRef.current && currentPage > 1) {
      transactionsListRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentPage]);

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Transactions</h2>
        {role === 'admin' && (
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="btn-primary text-sm"
          >
            {showAddForm ? '✕ Cancel' : '+ Add Transaction'}
          </button>
        )}
      </div>

      {showAddForm && (
        <form ref={formRef} onSubmit={handleAddTransaction} className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 animate-slide-down">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mb-4">
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="input-field"
            />
            <input
              type="number"
              placeholder="Amount"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              step="0.01"
              className="input-field"
            />
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="input-field"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="input-field"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <input
              type="text"
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="input-field lg:col-span-1"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="btn-primary text-sm"
            >
              {editingId ? 'Update' : 'Add'}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="btn-secondary text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Advanced Filters Section */}
      <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 animate-fade-in">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Advanced Filters</h3>
        
        {/* First Row: Search, Category, Type, Sorting */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mb-3">
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field"
          />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="input-field"
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="input-field"
          >
            <option value="all">All Types</option>
            <option value="income">Income Only</option>
            <option value="expense">Expense Only</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input-field"
          >
            <option value="date-desc">Latest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="amount-desc">Highest Amount</option>
            <option value="amount-asc">Lowest Amount</option>
          </select>
          <select
            value={groupBy}
            onChange={(e) => setGroupBy(e.target.value)}
            className="input-field"
          >
            <option value="none">No Grouping</option>
            <option value="date">Group by Date</option>
            <option value="category">Group by Category</option>
            <option value="type">Group by Type</option>
          </select>
        </div>

        {/* Second Row: Date Range */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-3">
          <div>
            <label className="text-xs text-gray-600 dark:text-gray-400">Start Date</label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="input-field w-full"
            />
          </div>
          <div>
            <label className="text-xs text-gray-600 dark:text-gray-400">End Date</label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="input-field w-full"
            />
          </div>
          <div className="flex gap-2 lg:col-span-3 items-end">
            {(searchTerm || filterCategory || typeFilter !== 'all' || dateRange.start || dateRange.end) && (
              <button
                onClick={resetFilters}
                className="btn-secondary text-sm flex-1"
              >
                ✕ Clear All
              </button>
            )}
            <ExportButton />
          </div>
        </div>
      </div>

      <div ref={transactionsListRef}>
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-12 animate-fade-in">
            <p className="text-gray-400 dark:text-gray-500">No transactions found</p>
          </div>
        ) : groupBy !== 'none' ? (
        // Grouped View
        <div className="space-y-4 animate-fade-in">
          {Object.entries(getGroupedTransactions()).map(([groupKey, groupTransactions]) => (
            <div key={groupKey} className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
              <div className="bg-blue-50 dark:bg-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-600">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                  {groupBy === 'date' ? '📅 ' : groupBy === 'category' ? '📂 ' : groupBy === 'type' ? '🏷️ ' : ''}
                  {groupKey}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {groupTransactions.length} transaction{groupTransactions.length !== 1 ? 's' : ''}
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800">
                      <th className="text-left px-4 py-2 text-xs font-semibold text-gray-700 dark:text-gray-300">Date</th>
                      <th className="text-left px-4 py-2 text-xs font-semibold text-gray-700 dark:text-gray-300">Description</th>
                      <th className="text-left px-4 py-2 text-xs font-semibold text-gray-700 dark:text-gray-300">Category</th>
                      <th className="text-left px-4 py-2 text-xs font-semibold text-gray-700 dark:text-gray-300">Type</th>
                      <th className="text-right px-4 py-2 text-xs font-semibold text-gray-700 dark:text-gray-300">Amount</th>
                      {role === 'admin' && (
                        <th className="text-center px-4 py-2 text-xs font-semibold text-gray-700 dark:text-gray-300">Actions</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {groupTransactions.map((transaction) => (
                      <tr key={transaction.id} className="table-row">
                        <td className="px-4 py-2 text-sm text-primary-dark">
                          {new Date(transaction.date).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-2 text-sm text-primary-dark">{transaction.description}</td>
                        <td className="px-4 py-2 text-sm">
                          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs font-medium">
                            {transaction.category}
                          </span>
                        </td>
                        <td className="px-4 py-2 text-sm">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            transaction.type === 'income'
                              ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                              : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                          }`}>
                            {transaction.type}
                          </span>
                        </td>
                        <td className={`px-4 py-2 text-sm font-semibold text-right ${
                          transaction.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                        }`}>
                          {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                        </td>
                        {role === 'admin' && (
                          <td className="px-4 py-2 text-center">
                            <button
                              onClick={() => handleEditClick(transaction)}
                              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-xs mr-2 transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm('Are you sure?')) {
                                  deleteTransaction(transaction.id);
                                }
                              }}
                              className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-medium text-xs transition-colors"
                            >
                              Delete
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Normal View
        <div className="animate-fade-in">
          <div className="overflow-x-auto mb-4">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800">
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300">Date</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300">Description</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300">Category</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300">Type</th>
                  <th className="text-right px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300">Amount</th>
                  {role === 'admin' && (
                    <th className="text-center px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {getPaginatedTransactions().map((transaction) => (
                  <tr key={transaction.id} className="table-row">
                    <td className="px-4 py-3 text-sm text-primary-dark">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-sm text-primary-dark">{transaction.description}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium">
                        {transaction.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        transaction.type === 'income'
                          ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                          : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                      }`}>
                        {transaction.type}
                      </span>
                    </td>
                    <td className={`px-4 py-3 text-sm font-semibold text-right ${
                      transaction.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                    </td>
                    {role === 'admin' && (
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => handleEditClick(transaction)}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-xs mr-2 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm('Are you sure?')) {
                              deleteTransaction(transaction.id);
                            }
                          }}
                          className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-medium text-xs transition-colors"
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-between mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
            <div className="text-sm text-secondary">
              Showing <span className="font-semibold text-gray-700 dark:text-gray-300">{((currentPage - 1) * 10) + 1}</span> - <span className="font-semibold text-gray-700 dark:text-gray-300">{Math.min(currentPage * 10, getFilteredTransactions().length)}</span> of <span className="font-semibold text-gray-700 dark:text-gray-300">{getFilteredTransactions().length}</span> transactions
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className="btn-secondary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ← Previous
              </button>

              {/* Page Numbers */}
              <div className="flex gap-1">
                {Array.from({ length: getTotalPages() }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => goToPage(pageNum)}
                    className={`px-3 py-2 rounded text-sm font-medium transition-all ${
                      currentPage === pageNum
                        ? 'bg-blue-600 dark:bg-blue-700 text-white'
                        : 'bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>

              <button
                onClick={goToNextPage}
                disabled={currentPage >= getTotalPages()}
                className="btn-secondary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      )}
      </div>

      <div className="mt-4 text-sm text-secondary">
        Total: <span className="font-semibold text-gray-700 dark:text-gray-300">{getFilteredTransactions().length}</span> transaction{getFilteredTransactions().length !== 1 ? 's' : ''} found
      </div>
    </div>
  );
};

export default TransactionsList;
