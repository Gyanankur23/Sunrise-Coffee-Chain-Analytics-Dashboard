// Dimension: Date
export interface DimDate {
  date_id: number;
  full_date: string;
  year: number;
  month_number: number;
  month_name: string;
  day_of_week: string;
  is_weekend: boolean;
  is_uk_bank_holiday: boolean;
  quarter: number;
  week_number: number;
  uk_trading_calendar: string;
  month_id: string;
}

// Dimension: Store
export interface DimStore {
  store_id: number;
  store_name: string;
  store_format: 'High-Street' | 'Retail-Park' | 'Transport-Hub';
  location_type: string;
  city: string;
  region: string;
  store_status: string;
  monthly_rent_gbp: number;
  staff_headcount: number;
  monthly_staffing_cost_gbp: number;
  loyalty_adoption_rate: number;
  seating_capacity: number | null;
  opening_year: number;
}

// Dimension: Product
export interface DimProduct {
  product_id: number;
  product_name: string;
  product_category: 'Espresso-Drinks' | 'Filter-Coffee' | 'Food' | 'Retail-Beans' | 'Cold-Drinks' | 'Merchandise';
  unit_price_gbp: number;
  unit_cost_gbp: number;
  gross_margin_pct: number;
  is_loyalty_eligible: boolean;
  product_status: string;
  launch_date: string;
}

// Fact: Daily Sales
export interface FactDailySales {
  daily_sale_id: number;
  store_id: number;
  date_id: number;
  product_id: number;
  total_revenue_gbp: number;
  total_transactions: number;
  avg_transaction_value_gbp: number;
  loyalty_transactions: number;
  loyalty_redemption_cost_gbp: number;
  footfall: number;
  espresso_revenue_gbp: number;
  filter_revenue_gbp: number;
  food_revenue_gbp: number;
  retail_beans_revenue_gbp: number;
  daily_gross_profit_gbp: number;
  shift_pattern: string;
  staff_count: number;
  total_staff_hours: number;
}

// Fact: Monthly Profitability
export interface FactStoreMonthlyProfitability {
  monthly_profit_id: number;
  store_id: number;
  date_id: number;
  month_id: string;
  total_monthly_revenue_gbp: number;
  total_monthly_cogs_gbp: number;
  monthly_rent_gbp: number;
  monthly_staffing_cost_gbp: number;
  loyalty_redemption_cost_gbp: number;
  net_profit_gbp: number;
  net_profit_margin_pct: number;
  avg_dwell_time_minutes: number;
  loyalty_member_spend_gbp: number;
  non_member_spend_gbp: number;
  loyalty_member_revenue_pct: number | null;
  avg_daily_footfall: number | null;
  revenue_per_sqft_gbp: number;
  peak_hour_transactions: number;
  dead_hour_transactions: number;
  rent_band: string;
  profitability_status: 'Highly-Profitable' | 'Profitable' | 'Break-Even' | 'Loss-Making' | 'Structural-Loss';
}

// Joined Types
export interface StoreWithMetrics extends DimStore {
  monthlyProfitability?: FactStoreMonthlyProfitability[];
  dailySales?: FactDailySales[];
}

export interface DailySalesWithDimensions extends FactDailySales {
  store?: DimStore;
  date?: DimDate;
  product?: DimProduct;
}

export interface MonthlyProfitabilityWithDimensions extends FactStoreMonthlyProfitability {
  store?: DimStore;
  date?: DimDate;
}

// Computed Types
export interface KPI {
  label: string;
  value: number | string;
  format?: 'currency' | 'percentage' | 'number';
  trend?: number;
  trendDirection?: 'up' | 'down';
}

export interface LoadedData {
  dimDate: DimDate[];
  dimStore: DimStore[];
  dimProduct: DimProduct[];
  factDailySales: FactDailySales[];
  factStoreMonthlyProfitability: FactStoreMonthlyProfitability[];
}

export interface StorePerformance {
  store_id: number;
  store_name: string;
  format: string;
  region: string;
  avg_net_profit_margin: number;
  total_revenue: number;
  total_profit: number;
  avg_revenue_per_sqft: number;
  avg_daily_footfall: number;
  profitability_status: string;
  yoy_growth: number;
}

export interface LoyaltyMetrics {
  store_id: number;
  store_name: string;
  adoption_rate: number;
  member_revenue_pct: number;
  avg_transaction_value: number;
  loyalty_net_value: number;
  redemption_cost: number;
  member_spend: number;
}

export interface RevenueMix {
  category: string;
  revenue: number;
  percentage: number;
  gross_margin_pct: number;
}

export interface SeasonalPattern {
  period: string;
  revenue: number;
  profit: number;
  transactions: number;
  footfall: number;
}

// UI Types
export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: any;
}

export interface FilterState {
  format?: string;
  region?: string;
  dateRange?: [string, string];
  profitabilityStatus?: string;
}
