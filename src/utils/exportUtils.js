// Export utility functions for CSV and JSON formats

export const exportToJSON = (transactions, filename = 'transactions.json') => {
  const dataStr = JSON.stringify(transactions, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  downloadFile(dataBlob, filename);
};

export const exportToCSV = (transactions, filename = 'transactions.csv') => {
  // Define CSV headers
  const headers = ['ID', 'Date', 'Description', 'Category', 'Type', 'Amount'];
  
  // Convert transactions to CSV rows
  const rows = transactions.map(t => [
    t.id,
    t.date,
    `"${t.description}"`, // Wrap in quotes to handle commas
    t.category,
    t.type,
    t.amount
  ]);

  // Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  const dataBlob = new Blob([csvContent], { type: 'text/csv' });
  downloadFile(dataBlob, filename);
};

export const exportToCSVAdvanced = (groupedTransactions, groupBy, filename = 'transactions.csv') => {
  let csvContent = [];

  if (typeof groupedTransactions === 'object' && !Array.isArray(groupedTransactions)) {
    // Grouped data
    Object.entries(groupedTransactions).forEach(([groupKey, transactions]) => {
      csvContent.push(`\n${groupBy?.toUpperCase()}: ${groupKey}`);
      csvContent.push('ID,Date,Description,Category,Type,Amount');
      
      transactions.forEach(t => {
        csvContent.push(
          `${t.id},${t.date},"${t.description}",${t.category},${t.type},${t.amount}`
        );
      });

      // Add subtotal
      const subtotal = transactions.reduce((sum, t) => 
        sum + (t.type === 'income' ? t.amount : -t.amount), 0
      );
      csvContent.push(`,,,Subtotal:,${subtotal}`);
    });
  } else {
    // Regular data
    const headers = ['ID', 'Date', 'Description', 'Category', 'Type', 'Amount'];
    csvContent.push(headers.join(','));
    
    groupedTransactions.forEach(t => {
      csvContent.push(
        `${t.id},${t.date},"${t.description}",${t.category},${t.type},${t.amount}`
      );
    });
  }

  const dataBlob = new Blob([csvContent.join('\n')], { type: 'text/csv' });
  downloadFile(dataBlob, filename);
};

export const downloadFile = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  
  document.body.appendChild(link);
  link.click();
  
  // Cleanup
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 100);
};

export const getFormattedTimestamp = () => {
  return new Date().toISOString().split('T')[0];
};

export const getExportFilename = (format, prefix = 'transactions') => {
  const timestamp = getFormattedTimestamp();
  return `${prefix}_${timestamp}.${format}`;
};
