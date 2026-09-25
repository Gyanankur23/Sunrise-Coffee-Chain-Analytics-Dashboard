import type {
  LoadedData,
  StorePerformance,
  LoyaltyMetrics,
  RevenueMix,
  SeasonalPattern,
  DailySalesWithDimensions,
  MonthlyProfitabilityWithDimensions,
  KPI,
  FactStoreMonthlyProfitability,
} from '../types';

export class DataTransformer {
  private data: LoadedData;

  constructor(data: LoadedData) {
    this.data = data;
  }

  // Get store lookup map
  private getStoreMap() {
    return new Map(this.data.dimStore.map((s: any) => [s.store_id, s]));
  }

  // Get date lookup map
  private getDateMap() {
    return new Map(this.data.dimDate.map((d: any) => [d.date_id, d]));
  }

  // Get product lookup map
  private getProductMap() {
    return new Map(this.data.dimProduct.map((p: any) => [p.product_id, p]));
  }

  // Join daily sales with dimensions
  getDailySalesWithDimensions(): DailySalesWithDimensions[] {
    const storeMap = this.getStoreMap();
    const dateMap = this.getDateMap();
    const productMap = this.getProductMap();

    return this.data.factDailySales.map((sale: any) => ({
      ...sale,
      store: storeMap.get(sale.store_id),
      date: dateMap.get(sale.date_id),
      product: productMap.get(sale.product_id),
    }));
  }

  // Join monthly profitability with dimensions
  getMonthlyProfitabilityWithDimensions(): MonthlyProfitabilityWithDimensions[] {
    const storeMap = this.getStoreMap();
    const dateMap = this.getDateMap();

    return this.data.factStoreMonthlyProfitability.map((profit: any) => ({
      ...profit,
      store: storeMap.get(profit.store_id),
      date: dateMap.get(profit.date_id),
    }));
  }

  // Calculate KPIs for executive overview
  getKPIs(): KPI[] {
    const monthlyData = this.data.factStoreMonthlyProfitability;
    const totalRevenue = monthlyData.reduce(
      (sum: number, m: any) => sum + m.total_monthly_revenue_gbp,
      0
    );
    const avgMargin =
      monthlyData.reduce((sum: number, m: any) => sum + m.net_profit_margin_pct, 0) /
      monthlyData.length;

    const totalAdoption = this.data.dimStore.reduce(
      (sum: number, s: any) => sum + s.loyalty_adoption_rate,
      0
    );
    const avgAdoption = totalAdoption / this.data.dimStore.length;

    return [
      {
        label: 'Total Revenue (2023-2024)',
        value: totalRevenue,
        format: 'currency',
      },
      {
        label: 'Average Net Profit Margin',
        value: avgMargin,
        format: 'percentage',
      },
      {
        label: 'Total Stores',
        value: this.data.dimStore.length,
        format: 'number',
      },
      {
        label: 'Loyalty Adoption Rate',
        value: avgAdoption * 100,
        format: 'percentage',
      },
    ];
  }

  // Calculate store performance metrics
  getStorePerformance(): StorePerformance[] {
    const storeMap = this.getStoreMap();
    const monthlyByStore = new Map<number, FactStoreMonthlyProfitability[]>();

    // Group monthly data by store
    this.data.factStoreMonthlyProfitability.forEach((m: any) => {
      if (!monthlyByStore.has(m.store_id)) {
        monthlyByStore.set(m.store_id, []);
      }
      monthlyByStore.get(m.store_id)!.push(m);
    });

    const performances: StorePerformance[] = [];

    monthlyByStore.forEach((monthly: any, storeId: number) => {
      const store = storeMap.get(storeId);
      if (!store) return;

      const totalRevenue = monthly.reduce(
        (sum: number, m: any) => sum + m.total_monthly_revenue_gbp,
        0
      );
      const totalProfit = monthly.reduce(
        (sum: number, m: any) => sum + m.net_profit_gbp,
        0
      );
      const avgMargin =
        monthly.reduce((sum: number, m: any) => sum + m.net_profit_margin_pct, 0) /
        monthly.length;
      const avgRevenuePerSqft =
        monthly.reduce((sum: number, m: any) => sum + m.revenue_per_sqft_gbp, 0) /
        monthly.length;
      const avgFootfall =
        monthly
          .filter((m: any) => m.avg_daily_footfall !== null)
          .reduce((sum: number, m: any) => sum + (m.avg_daily_footfall || 0), 0) /
        monthly.filter((m: any) => m.avg_daily_footfall !== null).length;

      // Calculate YoY growth (2023 vs 2024)
      const monthly2023 = monthly.filter((m: any) => m.month_id.startsWith('2023'));
      const monthly2024 = monthly.filter((m: any) => m.month_id.startsWith('2024'));
      const revenue2023 = monthly2023.reduce(
        (sum: number, m: any) => sum + m.total_monthly_revenue_gbp,
        0
      );
      const revenue2024 = monthly2024.reduce(
        (sum: number, m: any) => sum + m.total_monthly_revenue_gbp,
        0
      );
      const yoyGrowth = revenue2023 > 0 ? ((revenue2024 - revenue2023) / revenue2023) * 100 : 0;

      // Get most recent profitability status
      const latestStatus = monthly[monthly.length - 1].profitability_status;

      performances.push({
        store_id: storeId,
        store_name: store.store_name,
        format: store.store_format,
        region: store.region,
        avg_net_profit_margin: avgMargin,
        total_revenue: totalRevenue,
        total_profit: totalProfit,
        avg_revenue_per_sqft: avgRevenuePerSqft,
        avg_daily_footfall: avgFootfall,
        profitability_status: latestStatus,
        yoy_growth: yoyGrowth,
      });
    });

    return performances.sort((a, b) => b.total_profit - a.total_profit);
  }

  // Calculate loyalty metrics
  getLoyaltyMetrics(): LoyaltyMetrics[] {
    const storeMap = this.getStoreMap();
    const monthlyByStore = new Map<number, FactStoreMonthlyProfitability[]>();

    this.data.factStoreMonthlyProfitability.forEach((m: any) => {
      if (!monthlyByStore.has(m.store_id)) {
        monthlyByStore.set(m.store_id, []);
      }
      monthlyByStore.get(m.store_id)!.push(m);
    });

    const metrics: LoyaltyMetrics[] = [];

    monthlyByStore.forEach((monthly: any, storeId: number) => {
      const store = storeMap.get(storeId);
      if (!store) return;

      const memberSpend = monthly.reduce(
        (sum: number, m: any) => sum + m.loyalty_member_spend_gbp,
        0
      );
      const redemptionCost = monthly.reduce(
        (sum: number, m: any) => sum + m.loyalty_redemption_cost_gbp,
        0
      );
      const loyaltyNetValue = memberSpend - redemptionCost;

      const avgMemberRevenuePct =
        monthly
          .filter((m: any) => m.loyalty_member_revenue_pct !== null)
          .reduce((sum: number, m: any) => sum + (m.loyalty_member_revenue_pct || 0), 0) /
        monthly.filter((m: any) => m.loyalty_member_revenue_pct !== null).length;

      const dailySalesForStore = this.data.factDailySales.filter(
        (d: any) => d.store_id === storeId
      );
      const avgTransactionValue =
        dailySalesForStore.reduce(
          (sum: number, d: any) => sum + d.avg_transaction_value_gbp,
          0
        ) / dailySalesForStore.length;

      metrics.push({
        store_id: storeId,
        store_name: store.store_name,
        adoption_rate: store.loyalty_adoption_rate,
        member_revenue_pct: avgMemberRevenuePct || 0,
        avg_transaction_value: avgTransactionValue,
        loyalty_net_value: loyaltyNetValue,
        redemption_cost: redemptionCost,
        member_spend: memberSpend,
      });
    });

    return metrics;
  }

  // Calculate revenue mix by category
  getRevenueMix(): RevenueMix[] {
    const dailySales = this.data.factDailySales;
    const productMap = this.getProductMap();

    const categoryRevenue = new Map<string, { revenue: number; margin: number; count: number }>();

    dailySales.forEach((sale: any) => {
      const product = productMap.get(sale.product_id);
      if (!product) return;

      const category = product.product_category;
      if (!categoryRevenue.has(category)) {
        categoryRevenue.set(category, { revenue: 0, margin: 0, count: 0 });
      }

      const data = categoryRevenue.get(category)!;
      data.revenue += sale.total_revenue_gbp;
      data.margin += product.gross_margin_pct;
      data.count += 1;
    });

    const totalRevenue = Array.from(categoryRevenue.values()).reduce(
      (sum: number, d: any) => sum + d.revenue,
      0
    );

    return Array.from(categoryRevenue.entries()).map(([category, data]: [string, any]) => ({
      category,
      revenue: data.revenue,
      percentage: (data.revenue / totalRevenue) * 100,
      gross_margin_pct: data.margin / data.count,
    })).sort((a, b) => b.revenue - a.revenue);
  }

  // Calculate seasonal patterns
  getSeasonalPatterns(): SeasonalPattern[] {
    const monthlyData = this.data.factStoreMonthlyProfitability;
    const dateMap = this.getDateMap();

    const byMonth = new Map<string, {
      revenue: number;
      profit: number;
      transactions: number;
      footfall: number;
    }>();

    monthlyData.forEach((m: any) => {
      const date = dateMap.get(m.date_id);
      if (!date) return;

      const monthKey = `${date.year}-${String(date.month_number).padStart(2, '0')}`;
      if (!byMonth.has(monthKey)) {
        byMonth.set(monthKey, { revenue: 0, profit: 0, transactions: 0, footfall: 0 });
      }

      const data = byMonth.get(monthKey)!;
      data.revenue += m.total_monthly_revenue_gbp;
      data.profit += m.net_profit_gbp;
      data.transactions += m.peak_hour_transactions;
      data.footfall += m.avg_daily_footfall || 0;
    });

    return Array.from(byMonth.entries())
      .map(([period, data]: [string, any]) => ({
        period,
        revenue: data.revenue,
        profit: data.profit,
        transactions: data.transactions,
        footfall: data.footfall,
      }))
      .sort((a, b) => a.period.localeCompare(b.period));
  }

  // Get data by format
  getDataByFormat() {
    const formats = ['High-Street', 'Retail-Park', 'Transport-Hub'];
    const formatData: Record<string, any> = {};

    formats.forEach((format) => {
      const stores = this.data.dimStore.filter((s: any) => s.store_format === format);
      const storeIds = new Set(stores.map((s: any) => s.store_id));

      const monthlyData = this.data.factStoreMonthlyProfitability.filter((m: any) =>
        storeIds.has(m.store_id)
      );

      const totalRevenue = monthlyData.reduce(
        (sum: number, m: any) => sum + m.total_monthly_revenue_gbp,
        0
      );
      const totalProfit = monthlyData.reduce(
        (sum: number, m: any) => sum + m.net_profit_gbp,
        0
      );
      const avgMargin =
        monthlyData.reduce((sum: number, m: any) => sum + m.net_profit_margin_pct, 0) /
        monthlyData.length;

      formatData[format] = {
        storeCount: stores.length,
        totalRevenue,
        totalProfit,
        avgMargin,
      };
    });

    return formatData;
  }

  // Get data by region
  getDataByRegion() {
    const regions = [
      'London',
      'South-East',
      'South-West',
      'East-of-England',
      'East-Midlands',
      'West-Midlands',
      'Yorkshire-and-Humber',
      'North-West',
      'North-East',
      'Scotland',
      'Wales',
      'Northern-Ireland',
    ];

    const regionData: Record<string, any> = {};

    regions.forEach((region) => {
      const stores = this.data.dimStore.filter((s: any) => s.region === region);
      const storeIds = new Set(stores.map((s: any) => s.store_id));

      const monthlyData = this.data.factStoreMonthlyProfitability.filter((m: any) =>
        storeIds.has(m.store_id)
      );

      const totalRevenue = monthlyData.reduce(
        (sum: number, m: any) => sum + m.total_monthly_revenue_gbp,
        0
      );
      const totalProfit = monthlyData.reduce(
        (sum: number, m: any) => sum + m.net_profit_gbp,
        0
      );
      const avgMargin =
        monthlyData.reduce((sum: number, m: any) => sum + m.net_profit_margin_pct, 0) /
        monthlyData.length;

      regionData[region] = {
        storeCount: stores.length,
        totalRevenue,
        totalProfit,
        avgMargin,
      };
    });

    return regionData;
  }
}
