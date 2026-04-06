import React, { createContext, useState, useCallback, useEffect } from 'react';
import { mockTransactions } from '../data/mockData.js';

export const FinanceContext = createContext();

const STORAGE_KEY = 'financial-dashboard-transactions';
const ITEMS_PER_PAGE = 10;

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    // Load from localStorage or use mock data
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : mockTransactions;
    } catch (error) {
      console.error('Failed to load transactions from localStorage:', error);
      return mockTransactions;
    }
  });

  const [role, setRole] = useState(()=>{
    const storedRole = localStorage.getItem('user-role');
    return storedRole ? storedRole : 'viewer';
  }); // 'viewer' or 'admin'
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [sortBy, setSortBy] = useState('date-desc'); // 'date-asc', 'date-desc', 'amount-asc', 'amount-desc'
  const [groupBy, setGroupBy] = useState('none'); // 'none', 'date', 'category', 'type'
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [typeFilter, setTypeFilter] = useState('all'); // 'all', 'income', 'expense'
  const [currentPage, setCurrentPage] = useState(1); // Pagination state

  // Save to localStorage whenever transactions change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    } catch (error) {
      console.error('Failed to save transactions to localStorage:', error);
    }
  }, [transactions]);

  useEffect(() => {
    if(role === 'admin') {
      localStorage.setItem('user-role', 'admin');
    }else{
      localStorage.setItem('user-role', 'viewer');
    }
  }, [role]);

  const addTransaction = useCallback((transaction) => {
    if (role !== 'admin') {
      alert('Only admins can add transactions');
      return;
    }
    const newTransaction = {
      ...transaction,
      id: Math.max(...transactions.map(t => t.id), 0) + 1
    };
    setTransactions([...transactions, newTransaction]);
  }, [transactions, role]);

  const updateTransaction = useCallback((id, updatedData) => {
    if (role !== 'admin') {
      alert('Only admins can edit transactions');
      return;
    }
    setTransactions(transactions.map(t => 
      t.id === id ? { ...t, ...updatedData } : t
    ));
  }, [transactions, role]);

  const deleteTransaction = useCallback((id) => {
    if (role !== 'admin') {
      alert('Only admins can delete transactions');
      return;
    }
    setTransactions(transactions.filter(t => t.id !== id));
  }, [transactions, role]);

  const getFilteredTransactions = useCallback(() => {
    let filtered = transactions;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(t =>
        t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (filterCategory) {
      filtered = filtered.filter(t => t.category === filterCategory);
    }

    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(t => t.type === typeFilter);
    }

    // Date range filter
    if (dateRange.start) {
      filtered = filtered.filter(t => new Date(t.date) >= new Date(dateRange.start));
    }
    if (dateRange.end) {
      const endDate = new Date(dateRange.end);
      endDate.setHours(23, 59, 59, 999);
      filtered = filtered.filter(t => new Date(t.date) <= endDate);
    }

    // Sorting
    const sorted = [...filtered];
    switch (sortBy) {
      case 'date-asc':
        sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'date-desc':
        sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'amount-asc':
        sorted.sort((a, b) => a.amount - b.amount);
        break;
      case 'amount-desc':
        sorted.sort((a, b) => b.amount - a.amount);
        break;
      default:
        break;
    }

    return sorted;
  }, [transactions, searchTerm, filterCategory, sortBy, typeFilter, dateRange]);

  const getGroupedTransactions = useCallback(() => {
    const filtered = getFilteredTransactions();
    
    if (groupBy === 'none') {
      return filtered;
    }

    const grouped = {};
    filtered.forEach(transaction => {
      let key;
      
      switch (groupBy) {
        case 'date':
          key = new Date(transaction.date).toLocaleDateString();
          break;
        case 'category':
          key = transaction.category;
          break;
        case 'type':
          key = transaction.type;
          break;
        default:
          key = 'all';
      }

      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(transaction);
    });

    return grouped;
  }, [getFilteredTransactions, groupBy]);

  const resetFilters = useCallback(() => {
    setSearchTerm('');
    setFilterCategory('');
    setTypeFilter('all');
    setDateRange({ start: '', end: '' });
    setCurrentPage(1); // Reset to first page when filters are cleared
  }, []);

  const getPaginatedTransactions = useCallback(() => {
    const filtered = getFilteredTransactions();
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filtered.slice(startIndex, endIndex);
  }, [getFilteredTransactions, currentPage]);

  const getTotalPages = useCallback(() => {
    const filtered = getFilteredTransactions();
    return Math.ceil(filtered.length / ITEMS_PER_PAGE);
  }, [getFilteredTransactions]);

  const goToNextPage = useCallback(() => {
    const totalPages = getTotalPages();
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, getTotalPages]);

  const goToPreviousPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage]);

  const goToPage = useCallback((pageNumber) => {
    const totalPages = getTotalPages();
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  }, [getTotalPages]);

  const value = {
    transactions,
    role,
    setRole,
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
    addTransaction,
    updateTransaction,
    deleteTransaction,
    getFilteredTransactions,
    getGroupedTransactions,
    getPaginatedTransactions,
    getTotalPages,
    goToNextPage,
    goToPreviousPage,
    goToPage,
    resetFilters,
    ITEMS_PER_PAGE
  };

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = React.useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within FinanceProvider');
  }
  return context;
};
