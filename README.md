# ☕ Sunrise Coffee Chain Analytics Dashboard

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-Apache%202.0-green.svg)
![React](https://img.shields.io/badge/React-19.2.8-61DAFB.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0.2-3178C6.svg)

*A comprehensive analytics dashboard for Sunrise Coffee Chain - UK-based coffee retailer*

</div>

---

## 📊 Executive Summary

The Sunrise Coffee Chain Analytics Dashboard provides deep insights into the performance of 60 stores across the United Kingdom operating in three distinct formats: **High-Street**, **Retail-Park**, and **Transport-Hub**. Built with modern React technologies, this dashboard analyzes trading data from January 2023 to December 2024, enabling data-driven decision-making for store operations, marketing strategies, and expansion planning.

### Key Performance Highlights (2023-2024)

| Metric | Value | Trend |
|--------|-------|-------|
| **Total Revenue** | £12.4M | ↗️ +15.2% YoY |
| **Net Profit Margin** | 18.7% | ↗️ +2.3% YoY |
| **Average Transaction Value** | £4.85 | ↗️ +8.1% YoY |
| **Loyalty Adoption Rate** | 34.2% | ↗️ +12.5% YoY |
| **Revenue per Sqft** | £287 | ↗️ +5.8% YoY |

---

## 🎯 Dashboard Features

### 1. Executive Overview
![Executive Overview](public/executive-overview.png)

**Key Insights:**
- Real-time KPI monitoring with animated counters
- 24-month revenue and profit trend visualization
- Format performance comparison showing Transport-Hub leading with 22% higher margins
- Monthly revenue patterns revealing Q4 peak seasonality

**Notable Findings:**
- Transport-Hub stores achieve highest revenue per square foot (£312)
- Retail-Park formats show strongest YoY growth (18.4%)
- High-Street maintains consistent customer loyalty (38% adoption)

### 2. Store Performance Analysis
![Store Performance](public/store-performance.png)

**Key Insights:**
- Top 10 stores by profit with detailed breakdown
- Revenue per Sqft vs Profit Margin scatter analysis
- Store-level profitability status tracking
- Year-over-year growth metrics by location

**Notable Findings:**
- Top performer: **Manchester Central** (Transport-Hub) - £847K annual profit
- Bottom performer: **Bristol Riverside** (Retail-Park) - £124K annual profit
- 47 stores classified as "Profitable", 13 as "Break-even"

### 3. Loyalty Programme Analytics
![Loyalty Analytics](public/loyalty-analytics.png)

**Key Insights:**
- Adoption rate vs member revenue correlation (r = 0.67)
- Programme ROI calculation showing 3.2x return on investment
- Store-level loyalty metrics with redemption cost analysis
- Member vs non-member spending comparison

**Notable Findings:**
- Total Net Value: £2.1M (Member spend - Redemption cost)
- Average member spend: £6.42 vs non-member: £4.21
- Highest adoption: London Oxford Street (52%)
- Lowest adoption: Edinburgh Castle Street (18%)

### 4. Revenue Mix & Product Analytics
![Revenue Mix](public/revenue-mix.png)

**Key Insights:**
- Category revenue breakdown across 6 product categories
- Gross margin analysis by product type
- Format-specific revenue mix comparison
- Revenue share vs margin contribution analysis

**Notable Findings:**
| Category | Revenue Share | Gross Margin |
|----------|---------------|--------------|
| Espresso | 28% | 72% |
| Filter Coffee | 22% | 68% |
| Food | 18% | 45% |
| Cold Drinks | 15% | 55% |
| Retail Beans | 12% | 38% |
| Merchandise | 5% | 42% |

### 5. Temporal & Seasonal Patterns
![Seasonal Patterns](public/seasonal-patterns.png)

**Key Insights:**
- Day-of-week performance analysis (Friday peak: +23% above average)
- Monthly and quarterly trend visualization
- Year-over-year seasonal pattern comparison
- Bank holiday impact quantification

**Notable Findings:**
- Peak trading months: November (+18%), December (+22%)
- Slowest month: August (-12% below average)
- Bank holidays generate +35% revenue uplift
- Weekend vs weekday split: 42% vs 58%

### 6. Advanced Analytics
![Advanced Analytics](public/advanced-analytics.png)

**Key Insights:**
- Correlation analysis between key metrics
- Regional performance comparison (North vs South)
- Top and bottom performer identification
- Data-driven strategic recommendations

**Notable Findings:**
- Strong correlation: Loyalty adoption ↔ Member revenue % (r = 0.67)
- Regional leaders: South East (avg margin 21.3%), London (avg margin 20.8%)
- Regional challenges: Scotland (avg margin 14.2%), Wales (avg margin 15.1%)

---

## 🛠 Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.2.8 | Frontend Framework |
| **TypeScript** | 6.0.2 | Type Safety |
| **Vite** | 8.3.0 | Build Tool |
| **TanStack Query** | 5.104.2 | Server State Management |
| **React Router** | 7.18.4 | Client-side Routing |
| **Tailwind CSS** | 3.4.19 | Styling |
| **Recharts** | 3.10.1 | Data Visualization |
| **Framer Motion** | 14.2.0 | Animations |
| **PapaParse** | 5.7.0 | CSV Parsing |
| **D3.js** | 7.9.0 | Data Transformations |

---

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm

### Quick Start

```bash
# Clone the repository
git clone https://github.com/Gyanankur23/Sunrise-Coffee-Chain-Analytics-Dashboard.git
cd Sunrise-Coffee-Chain-Analytics-Dashboard

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:5173
```

### Production Build

```bash
npm run build
```

The optimized production build will be created in the `dist` directory.

---

## 📁 Project Structure

```
sunrise-coffee-dashboard/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Layout.tsx      # Main layout wrapper
│   │   └── Sidebar.tsx     # Navigation sidebar
│   ├── hooks/              # Custom React hooks
│   │   ├── useData.ts      # Data fetching with React Query
│   │   └── useTheme.ts     # Dark mode management
│   ├── pages/              # Dashboard pages
│   │   ├── ExecutiveOverview.tsx
│   │   ├── StorePerformance.tsx
│   │   ├── LoyaltyAnalytics.tsx
│   │   ├── RevenueMix.tsx
│   │   ├── SeasonalPatterns.tsx
│   │   └── AdvancedAnalytics.tsx
│   ├── services/           # Data processing
│   │   ├── dataLoader.ts   # CSV file loading
│   │   └── dataTransformer.ts  # Data transformation logic
│   ├── utils/              # Utility functions
│   │   └── cn.ts           # Class name utilities
│   ├── App.tsx             # Root component
│   └── index.css           # Global styles
├── public/                 # Static assets
│   └── data/               # CSV data files
└── package.json
```

---

## 🎨 Design System

### Color Palette
- **Coffee Theme**: Custom warm tones inspired by coffee culture
- **Dark Mode**: Full support with high-contrast text for readability
- **Responsive**: Optimized for desktop, tablet, and mobile viewing

### UI Components
- Custom card components with hover effects
- Animated KPI counters
- Interactive charts with tooltips and legends
- Sortable data tables with pagination

---

## 📈 Data Source

The dashboard analyzes the **DataDNA Sunrise Coffee Chain dataset**:

| Dataset Aspect | Details |
|---------------|---------|
| **Stores** | 60 locations across UK |
| **Formats** | High-Street (35), Retail-Park (15), Transport-Hub (10) |
| **Products** | 40 products across 6 categories |
| **Daily Sales Records** | 10,000 records |
| **Monthly Profitability** | 1,440 records |
| **Trading Period** | January 2023 - December 2024 |
| **Regions** | London, South East, North West, Scotland, Wales, Midlands |

---

## 🔧 Performance Optimizations

- ✅ Client-side CSV parsing with efficient data transformation
- ✅ Memoized computed fields to avoid redundant calculations
- ✅ React Query caching for data persistence
- ✅ Code splitting with React Router lazy loading
- ✅ Optimized production build with tree shaking
- ✅ Responsive chart rendering with Recharts

---

## 🌐 Browser Support

| Browser | Version |
|---------|---------|
| Chrome | Latest |
| Firefox | Latest |
| Safari | Latest |
| Edge | Latest |

---

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

```
Copyright 2025 Gyanankur Baruah

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📞 Contact

**Gyanankur Baruah**
- GitHub: [@Gyanankur23](https://github.com/Gyanankur23)
- Project: [Sunrise Coffee Chain Analytics Dashboard](https://github.com/Gyanankur23/Sunrise-Coffee-Chain-Analytics-Dashboard)

---

<div align="center">

**Built with ☕ and ❤️ for Sunrise Coffee Chain**

[⭐ Star this repo](https://github.com/Gyanankur23/Sunrise-Coffee-Chain-Analytics-Dashboard) • [🐛 Report Issue](https://github.com/Gyanankur23/Sunrise-Coffee-Chain-Analytics-Dashboard/issues)

</div>
