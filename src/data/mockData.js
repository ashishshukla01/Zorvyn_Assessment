export const mockTransactions = [
  // March 2026
  { id: 1, date: '2026-03-01', amount: 3500, category: 'Salary', type: 'income', description: 'Monthly Salary' },
  { id: 2, date: '2026-03-02', amount: 1200, category: 'Rent', type: 'expense', description: 'Apartment Rent' },
  { id: 3, date: '2026-03-03', amount: 150, category: 'Groceries', type: 'expense', description: 'Weekly groceries' },
  { id: 4, date: '2026-03-05', amount: 45, category: 'Utilities', type: 'expense', description: 'Electricity bill' },
  { id: 5, date: '2026-03-08', amount: 200, category: 'Entertainment', type: 'expense', description: 'Movie and dinner' },
  { id: 6, date: '2026-03-10', amount: 120, category: 'Transportation', type: 'expense', description: 'Gas and parking' },
  { id: 7, date: '2026-03-12', amount: 89, category: 'Shopping', type: 'expense', description: 'Clothing items' },
  { id: 8, date: '2026-03-15', amount: 2000, category: 'Freelance', type: 'income', description: 'Freelance project' },
  { id: 9, date: '2026-03-18', amount: 75, category: 'Dining', type: 'expense', description: 'Restaurant' },
  { id: 10, date: '2026-03-20', amount: 250, category: 'Healthcare', type: 'expense', description: 'Doctor appointment' },
  
  // April 2026 (Current Month)
  { id: 11, date: '2026-04-01', amount: 3500, category: 'Salary', type: 'income', description: 'Monthly Salary' },
  { id: 12, date: '2026-04-02', amount: 1200, category: 'Rent', type: 'expense', description: 'Apartment Rent' },
  { id: 13, date: '2026-04-03', amount: 180, category: 'Groceries', type: 'expense', description: 'Weekly groceries' },
  { id: 14, date: '2026-04-04', amount: 50, category: 'Utilities', type: 'expense', description: 'Internet bill' },
];

export const categories = [
  'Salary',
  'Freelance',
  'Rent',
  'Groceries',
  'Utilities',
  'Entertainment',
  'Transportation',
  'Shopping',
  'Dining',
  'Healthcare'
];

export const calculateBalance = (transactions) => {
  return transactions.reduce((acc, transaction) => {
    if (transaction.type === 'income') {
      return acc + transaction.amount;
    } else {
      return acc - transaction.amount;
    }
  }, 0);
};

export const calculateTotalIncome = (transactions) => {
  return transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);
};

export const calculateTotalExpenses = (transactions) => {
  return transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);
};

export const getMonthlyBalanceData = (transactions) => {
  const monthlyData = {};
  
  transactions.forEach(transaction => {
    const date = new Date(transaction.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = { month: monthKey, balance: 0, income: 0, expenses: 0 };
    }
    
    if (transaction.type === 'income') {
      monthlyData[monthKey].income += transaction.amount;
      monthlyData[monthKey].balance += transaction.amount;
    } else {
      monthlyData[monthKey].expenses += transaction.amount;
      monthlyData[monthKey].balance -= transaction.amount;
    }
  });
  
  return Object.values(monthlyData).sort((a, b) => a.month.localeCompare(b.month));
};

export const getSpendingByCategory = (transactions) => {
  const categoryData = {};
  
  transactions
    .filter(t => t.type === 'expense')
    .forEach(transaction => {
      if (!categoryData[transaction.category]) {
        categoryData[transaction.category] = 0;
      }
      categoryData[transaction.category] += transaction.amount;
    });
  
  return Object.entries(categoryData)
    .map(([category, amount]) => ({
      name: category,
      value: amount
    }))
    .sort((a, b) => b.value - a.value);
};

export const getInsights = (transactions) => {
  const categorySpending = getSpendingByCategory(transactions);
  const monthlyData = getMonthlyBalanceData(transactions);
  const totalIncome = calculateTotalIncome(transactions);
  const totalExpenses = calculateTotalExpenses(transactions);
  
  const insights = [];
  
  if (categorySpending.length > 0) {
    insights.push({
      title: 'Top Spending Category',
      value: categorySpending[0].name,
      amount: `$${categorySpending[0].value.toFixed(2)}`,
      icon: '🔝'
    });
  }
  
  if (monthlyData.length >= 2) {
    const prevMonth = monthlyData[monthlyData.length - 2];
    const currentMonth = monthlyData[monthlyData.length - 1];
    const change = currentMonth.expenses - prevMonth.expenses;
    const changePercent = ((change / prevMonth.expenses) * 100).toFixed(1);
    
    insights.push({
      title: 'Monthly Spending Change',
      value: change > 0 ? `↑ ${changePercent}%` : `↓ ${Math.abs(changePercent)}%`,
      amount: `$${Math.abs(change).toFixed(2)}`,
      icon: change > 0 ? '📈' : '📉'
    });
  }
  
  if (totalIncome > 0 && totalExpenses > 0) {
    const savingsRate = (((totalIncome - totalExpenses) / totalIncome) * 100).toFixed(1);
    insights.push({
      title: 'Savings Rate',
      value: `${savingsRate}%`,
      amount: `$${(totalIncome - totalExpenses).toFixed(2)}`,
      icon: '💰'
    });
  }
  
  return insights;
};
