# 💰 Financial Dashboard v2.0

A modern, responsive financial dashboard built with React, Vite, Tailwind CSS, and Recharts. Track your financial activity, understand spending patterns, gain insights, and enjoy advanced features like dark mode, data persistence, and export functionality.

## 🎉 What's New in v2.0

✨ **Dark Mode** - Toggle between light and dark themes with system preference detection
💾 **Data Persistence** - Transactions automatically saved to localStorage
📤 **Export Features** - Export transactions as CSV or JSON files
🎨 **Animations & Transitions** - Smooth UI interactions and page transitions
🔗 **Mock API Service** - Simulated async API calls for realistic interactions
📊 **Advanced Filtering** - Filter by date range, type, category, and more
👥 **Grouping Options** - Group transactions by date, category, or type

## 🎯 Core Features

### 1. **Dashboard Overview**
- **Summary Cards**: Total Balance, Income, and Expenses with smooth animations
- **Balance Trend Chart**: Monthly income vs. expenses visualization
- **Spending Breakdown**: Pie chart and detailed category breakdown
- **Financial Insights**: Key metrics auto-calculated from your data

### 2. **Transactions Management**
- **Full CRUD Operations**: Add, edit, delete transactions (admin only)
- **Advanced Search**: Find by description or category with real-time filtering
- **Multi-Category Filtering**: Filter by single or multiple criteria
- **Smart Sorting**: Sort by date or amount (ascending/descending)
- **Date Range Selection**: Filter transactions by custom date ranges
- **Type Filtering**: View income, expense, or all transactions
- **Data Grouping**: Organize by date, category, or type with collapsible sections

### 3. **Role-Based UI (RBAC)**

**Viewer Role** 👁️
- View all data and reports
- Read-only access
- Cannot modify transactions

**Admin Role** 🔧
- All viewer permissions plus:
- Add new transactions via form
- Edit transaction details
- Delete transactions with confirmation
- Full data control

Switch roles using toggle buttons in the header.

### 4. **Dark Mode** 🌙
- **Manual Toggle**: Click the theme button to switch modes
- **System Preference**: Auto-detects device theme preference
- **Persistent**: Your preference is saved to localStorage
- **Smooth Transitions**: All colors transition smoothly between modes
- **Comprehensive Theming**: Dark styles applied across all components

### 5. **Data Persistence** 💾
- **Automatic Saving**: Transactions save to browser localStorage
- **Seamless Recovery**: Data persists across browser sessions
- **Real-Time Sync**: Changes reflected immediately
- **Large Dataset Support**: Handles substantial transaction history

### 6. **Export Functionality** 📥
- **JSON Export**: Download transactions as clean JSON format
- **CSV Export**: Export as spreadsheet-compatible CSV
- **Grouped Export**: Export with grouping structure preserved
- **Timestamped Files**: Auto-generated filenames with dates
- **One-Click Download**: Simple export buttons in filter panel

### 7. **Advanced Filtering & Grouping**
- **Date Range Picker**: Select custom start and end dates
- **Multi-Filter Support**: Combine search, category, type, and date filters
- **Clear All Button**: Reset all active filters at once
- **Grouping Views**: 
  - No Grouping (list view)
  - Group by Date (timeline view)
  - Group by Category (categorical view)
  - Group by Type (income/expense view)
- **Smart Subtotals**: Grouped views show subtotals per group

### 8. **Animations & Transitions**
- **Fade-In Effects**: Cards and sections fade in smoothly
- **Slide Animations**: Forms and modals slide in/out
- **Hover Effects**: Interactive elements have scale transforms
- **Button Feedback**: Active scale effect on button clicks
- **Staggered Animations**: Sequential element animations for polish
- **Smooth Theme Transitions**: Color transitions when toggling dark mode

### 9. **State Management**
- **React Context API**: Global state for finance data and theme
- **localStorage Integration**: Automatic data persistence
- **Memoized Functions**: Optimized filtering and calculations
- **Clean Architecture**: Separated concerns and composition

### 10. **Mock API Service**
- **Async Simulation**: Built-in delays to simulate network latency
- **Error Handling**: Occasional simulated errors for robustness
- **Logging**: Console logs for debugging API interactions
- **Ready for Backend**: Swap with real API endpoints easily

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. **Navigate to project directory**
```bash
cd "Financial Dashboard"
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Open in browser**
   - Navigate to `http://localhost:3000`
   - Vite provides hot module replacement (HMR) for instant updates
   - Changes to files reflect immediately in the browser

### Build for Production
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## 📁 Project Structure

```
Financial Dashboard/
├── src/
│   ├── components/
│   │   ├── SummaryCards.jsx          # Balance overview cards
│   │   ├── BalanceTrendChart.jsx     # Income vs expense chart
│   │   ├── SpendingBreakdownChart.jsx# Category breakdown
│   │   ├── TransactionsList.jsx      # Main transactions UI
│   │   ├── InsightsSection.jsx       # Analytics cards
│   │   ├── RoleSelector.jsx          # Role switcher
│   │   ├── ThemeToggle.jsx           # Dark mode button
│   │   └── ExportButton.jsx          # Export controls
│   ├── context/
│   │   ├── FinanceContext.jsx        # State & logic
│   │   └── ThemeContext.jsx          # Theme management
│   ├── services/
│   │   └── apiService.js             # Mock API
│   ├── utils/
│   │   └── exportUtils.js            # Export helpers
│   ├── data/
│   │   └── mockData.js               # Mock transactions
│   ├── App.jsx                       # Main component
│   ├── main.jsx                      # Entry point
│   └── index.css                     # Styles & animations
├── index.html                        # HTML template
├── vite.config.js                    # Build config
├── tailwind.config.js                # Tailwind & animations
├── postcss.config.js                 # CSS processing
├── package.json                      # Dependencies
└── README.md                         # This file
```

## 🎨 Design System

### Color Palette
- **Primary Blue**: #3b82f6 - Main actions
- **Success Green**: #10b981 - Income & positive metrics
- **Danger Red**: #ef4444 - Expenses & negative metrics
- **Warning Amber**: #f59e0b - Additional highlights
- **Dark BG**: #111827 - Dark mode background
- **Dark Text**: #f3f4f6 - Dark mode text

### Responsive Breakpoints
- **Mobile**: Single column, full width
- **Tablet (md)**: 2-column grids
- **Desktop (lg)**: 3+ column layouts

### Animation System
- **Fade-In**: 0.3s ease-in-out
- **Slide-Up**: 0.3s ease-out
- **Slide-Down**: 0.3s ease-out
- **Slide-In-Right**: 0.3s ease-out
- **Pulse-Glow**: 2s infinite

## 💡 Feature Deep Dives

### Dark Mode Implementation
```javascript
// Auto-detects system preference on first load
// Saves preference to localStorage
// All components have dark: variants
// Toggle button in header (☀️ 🌙)
```

### Data Persistence
```javascript
// Automatically saves to localStorage on change
// Loads on app startup
// Falls back to mock data if not found
// Survives browser refresh and closure
```

### Export Functionality
```javascript
// JSON: Full transaction objects with metadata
// CSV: Spreadsheet-ready format
// Grouped: Maintains grouping structure
// Timestamped: Unique filename each export
```

### Advanced Grouping
The grouping feature allows organizing transactions:
- **No Grouping**: Standard list view
- **By Date**: Timeline showing transactions per day
- **By Category**: Organized spending view
- **By Type**: Income and expense separated

Each group shows:
- Group header with emoji and count
- All transactions in that group
- Subtotal for quick reference

### Mock API Service
Simulates real API behavior:
```javascript
// ~500ms delay per request
// 5% random failure rate
// Console logging for debugging
// Swappable with real API
```

## 🔧 Technical Highlights

### State Management Architecture
```
FinanceContext
├── transactions (array)
├── role (viewer/admin)
├── filters
│   ├── searchTerm
│   ├── filterCategory
│   ├── typeFilter
│   ├── dateRange
│   └── sortBy
├── groupBy
└── Actions
    ├── addTransaction()
    ├── updateTransaction()
    ├── deleteTransaction()
    ├── resetFilters()
    └── getFilteredTransactions()
```

### Theme Context
```
ThemeContext
├── isDarkMode (boolean)
├── toggleDarkMode()
└── Auto-saves to localStorage
```

### Performance Optimizations
- useCallback for memoized functions
- Efficient filtering/sorting logic
- Lazy component rendering
- Optimized chart re-renders

## 📊 Mock Data Included

14 sample transactions spanning March-April 2026:
- Multiple transaction types (income/expense)
- Various categories (salary, groceries, rent, etc.)
- Realistic amounts and descriptions
- Date range for trend analysis

## 🎓 Key Technologies

| Technology | Purpose |
|-----------|---------|
| **React 18** | UI library with hooks |
| **Vite** | Lightning-fast build tool |
| **Tailwind CSS** | Utility-first styling |
| **Recharts** | Data visualizations |
| **Context API** | State management |
| **localStorage** | Data persistence |

## ⚙️ Configuration Files

### tailwind.config.js
- Dark mode class-based toggling
- Custom animations and keyframes
- Extended color palette
- Custom theme configuration

### vite.config.js
- React plugin enabled
- Port 3000 configured
- HMR enabled for hot updates

### postcss.config.js
- Tailwind CSS processing
- Autoprefixer for compatibility

## 🚀 Usage Examples

### Add a Transaction (Admin)
1. Switch to Admin role
2. Click "+ Add Transaction"
3. Fill in the form
4. Click "Add"

### Export Data
1. Set desired filters/grouping
2. Click "📥 JSON" or "📊 CSV"
3. File downloads automatically

### Use Dark Mode
1. Click the theme toggle (☀️ 🌙) in header
2. Theme applies instantly
3. Preference saves automatically

### Filter by Date Range
1. Enter start date in "Start Date" field
2. Enter end date in "End Date" field
3. List updates automatically

### Group Transactions
1. Select grouping option from dropdown
2. Transactions reorganize into groups
3. Click group headers to collapse/expand

## 🔮 Future Enhancements

Potential improvements:
- Real backend API integration
- User authentication & authorization
- Database storage (MongoDB, PostgreSQL)
- Recurring transactions
- Budget goals & alerts
- Multiple accounts
- PDF export
- Advanced analytics dashboard
- Custom date formats
- Notification system
- Import from CSV
- Tax reports
- Mobile app version

## 🐛 Troubleshooting

### App won't start
```bash
# Clear and reinstall dependencies
rm -r node_modules package-lock.json
npm install
npm run dev
```

### Port 3000 already in use
Edit `vite.config.js`:
```javascript
server: {
  port: 3001  // Change to available port
}
```

### Changes not reflecting
- Vite includes HMR, so changes auto-update
- Check browser console for errors
- Hard refresh browser (Ctrl+Shift+R)
- Check file permissions

### Dark mode not persisting
- Check browser localStorage enabled
- Clear site data and reload
- Check for JavaScript errors in console

### Export not working
- Allow pop-ups in browser
- Check browser storage permissions
- Verify data exists before exporting
- Try different export format

## 📝 Code Quality

- Clean, modular component structure
- Separation of concerns
- Reusable utility functions
- Dark mode support throughout
- Accessibility considerations
- Responsive design patterns
- Error handling
- Loading states
- Animations for UX

## 🤝 Contributing

To enhance the dashboard:
1. Create feature branch
2. Make changes and test
3. Ensure dark mode support
4. Test on multiple screen sizes
5. Update this README
6. Submit for review

## 📄 License

This project is created for educational purposes.

## 👨‍💻 Technical Notes

**Design Philosophy:**
- Mobile-first responsive approach
- Accessible color contrasts in both themes
- Smooth animations for better UX
- Intuitive navigation
- Performance-optimized

**Code Standards:**
- ES6+ features
- React Hooks
- Functional components
- Clean naming conventions
- Comments where necessary

**Browser Support:**
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

---

## 📱 v2.0 Features Checklist

- ✅ Dark Mode with theme persistence
- ✅ localStorage Data Persistence
- ✅ Mock API Service with async simulation
- ✅ Smooth Animations & Transitions
- ✅ CSV/JSON Export functionality
- ✅ Advanced Filtering (date range, type, category)
- ✅ Grouping by date/category/type
- ✅ Role-based UI components
- ✅ Financial calculations & insights
- ✅ Fully responsive design
- ✅ Clean, maintainable codebase
- ✅ Comprehensive documentation

**Built with ❤️ using React and Vite**

For questions or improvements, feel free to enhance the dashboard further!
