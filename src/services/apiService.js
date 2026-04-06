// Mock API Service - simulates async API calls
const API_DELAY = 500; // Simulate network latency

class APIService {
  // Simulate API delay
  async _delay(ms = API_DELAY) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Fetch all transactions
  async getTransactions(filters = {}) {
    await this._delay();
    
    // In a real app, this would call your backend API
    // For now, we'll return what's expected from the caller's logic
    console.log('API: Fetching transactions with filters', filters);
    
    return {
      success: true,
      data: [],
      message: 'Transactions fetched successfully'
    };
  }

  // Fetch single transaction
  async getTransaction(id) {
    await this._delay(300);
    
    console.log('API: Fetching transaction', id);
    
    return {
      success: true,
      data: null,
      message: 'Transaction fetched successfully'
    };
  }

  // Create transaction
  async createTransaction(transactionData) {
    await this._delay(600);
    
    // Simulate occasional API errors
    if (Math.random() < 0.05) {
      throw new Error('API Error: Failed to create transaction');
    }
    
    console.log('API: Creating transaction', transactionData);
    
    return {
      success: true,
      data: { id: Date.now(), ...transactionData },
      message: 'Transaction created successfully'
    };
  }

  // Update transaction
  async updateTransaction(id, transactionData) {
    await this._delay(600);
    
    if (Math.random() < 0.05) {
      throw new Error('API Error: Failed to update transaction');
    }
    
    console.log('API: Updating transaction', id, transactionData);
    
    return {
      success: true,
      data: { id, ...transactionData },
      message: 'Transaction updated successfully'
    };
  }

  // Delete transaction
  async deleteTransaction(id) {
    await this._delay(400);
    
    if (Math.random() < 0.05) {
      throw new Error('API Error: Failed to delete transaction');
    }
    
    console.log('API: Deleting transaction', id);
    
    return {
      success: true,
      data: { id },
      message: 'Transaction deleted successfully'
    };
  }

  // Get summary/analytics
  async getSummary(dateRange = {}) {
    await this._delay(700);
    
    console.log('API: Fetching summary', dateRange);
    
    return {
      success: true,
      data: {
        totalBalance: 10500,
        totalIncome: 9000,
        totalExpenses: -1500,
        transactionCount: 14
      },
      message: 'Summary fetched successfully'
    };
  }

  // Export data
  async exportData(format = 'json', filters = {}) {
    await this._delay(1000);
    
    console.log('API: Exporting data', format, filters);
    
    return {
      success: true,
      data: {
        format,
        url: 'blob:data',
        timestamp: new Date().toISOString()
      },
      message: 'Data exported successfully'
    };
  }
}

// Export singleton instance
export default new APIService();
