# Sunrise Coffee Chain Analytics Dashboard

A comprehensive, production-grade analytics dashboard for Sunrise Coffee Chain, a UK-based coffee retailer operating 60 stores across High-Street, Retail-Park, and Transport-Hub formats. This dashboard provides deep insights into store profitability, loyalty programme effectiveness, revenue mix trends, and seasonal trading patterns across the 2023-2024 trading period.

## Features

### Executive Overview
- Key performance indicators with animated counters
- 24-month trend lines for revenue, profit, and margin
- Performance breakdown by store format
- Monthly revenue visualization

### Store Performance Analysis
- Detailed store-level performance metrics
- Format comparison (High-Street, Retail-Park, Transport-Hub)
- Profitability status tracking
- Year-over-year growth analysis
- Sortable and filterable data tables

### Loyalty Programme Analytics
- Adoption rate vs revenue correlation analysis
- Programme ROI calculation
- Member vs non-member spending comparison
- Store-level loyalty metrics
- Redemption cost impact analysis

### Revenue Mix and Product Analytics
- Category revenue breakdown (Espresso, Filter, Food, Retail Beans, Cold Drinks, Merchandise)
- Gross margin analysis by product category
- Format-specific revenue mix comparison
- Revenue share vs margin contribution

### Temporal and Seasonal Patterns
- Day-of-week performance analysis
- Monthly and quarterly trends
- Year-over-year seasonal patterns
- Bank holiday impact analysis
- Peak trading period identification

### Advanced Analytics
- Correlation analysis between key metrics
- Regional performance comparison
- Top and bottom performer identification
- Data-driven insights and recommendations

## Technology Stack

- **Frontend Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **State Management**: React Query (TanStack Query) for server state
- **Routing**: React Router v6+
- **Styling**: Tailwind CSS v3+ with custom coffee-themed color palette
- **Data Visualization**: Custom responsive charts
- **Data Processing**: PapaParse for CSV parsing
- **UI Components**: Lucide React for icons
- **Animations**: Framer Motion for smooth transitions
- **Dark Mode**: Full support with seamless theme switching

## Installation

### Prerequisites
- Node.js 18+ and npm

### Setup

1. Clone the repository:
```bash
git clone https://github.com/Gyanankur23/Sunrise-Coffee-Chain-Analytics-Dashboard.git
cd Sunrise-Coffee-Chain-Analytics-Dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Building for Production

```bash
npm run build
```

The optimized production build will be created in the `dist` directory.

## Data Source

The dashboard analyzes the DataDNA Sunrise Coffee Chain dataset covering:
- 60 stores across 3 formats
- 40 products across 6 categories
- 10,000 daily sales records
- 1,440 monthly profitability records
- Trading period: January 2023 to December 2024

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── Layout.tsx
│   └── Sidebar.tsx
├── hooks/            # Custom React hooks
│   ├── useData.ts
│   └── useTheme.ts
├── pages/            # Page components
│   ├── ExecutiveOverview.tsx
│   ├── StorePerformance.tsx
│   ├── LoyaltyAnalytics.tsx
│   ├── RevenueMix.tsx
│   ├── SeasonalPatterns.tsx
│   └── AdvancedAnalytics.tsx
├── services/         # Data loading and transformation
│   ├── dataLoader.ts
│   └── dataTransformer.ts
├── types/            # TypeScript type definitions
│   └── index.ts
├── utils/            # Utility functions
│   └── cn.ts
├── App.tsx           # Main application component
└── index.css         # Global styles
```

## Key Metrics Analyzed

- **Net Profit Margin**: Monthly net profit as percentage of revenue
- **Revenue per Square Foot**: Monthly revenue efficiency metric
- **Loyalty Adoption Rate**: Fraction of customers using loyalty app
- **Loyalty Member Revenue Percentage**: Revenue from loyalty members
- **Average Transaction Value**: Average customer spend per transaction
- **Year-over-Year Growth**: Revenue growth comparison between 2023 and 2024

## Performance Optimizations

- Client-side CSV parsing with efficient data transformation
- Memoized computed fields to avoid redundant calculations
- React Query caching for data persistence
- Code splitting with React Router lazy loading
- Optimized production build with tree shaking

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome. Please feel free to submit a Pull Request.

## Contact

For questions or support, please open an issue on GitHub.
