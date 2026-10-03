import { useData } from '../hooks/useData';
import { formatCurrency, formatPercentage } from '../utils/cn';
import { motion } from 'framer-motion';

export default function AdvancedAnalytics() {
  const { data, isLoading, error } = useData();

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-800 dark:text-red-200">
            Error loading data: {error.message}
          </p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const storePerformance = data.transformer.getStorePerformance();
  const loyaltyMetrics = data.transformer.getLoyaltyMetrics();
  const regionalData = data.transformer.getDataByRegion();

  // Calculate correlations
  const adoptionRates = loyaltyMetrics.map(m => m.adoption_rate);
  const memberRevenuePct = loyaltyMetrics.map(m => m.member_revenue_pct);
  const avgTransactionValues = loyaltyMetrics.map(m => m.avg_transaction_value);

  const correlationCoefficient = (x: number[], y: number[]) => {
    const n = x.length;
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
    const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0);
    const sumY2 = y.reduce((sum, yi) => sum + yi * yi, 0);

    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));

    return denominator === 0 ? 0 : numerator / denominator;
  };

  const adoptionRevenueCorr = correlationCoefficient(adoptionRates, memberRevenuePct);
  const adoptionTransactionCorr = correlationCoefficient(adoptionRates, avgTransactionValues);

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-200 mb-2">
          Advanced Analytics
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Deep-dive analysis and correlations
        </p>

        {/* Correlation Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="card p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-200 mb-4">
              Correlation Analysis
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  Adoption Rate vs Member Revenue %
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-200">
                  {adoptionRevenueCorr.toFixed(3)}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-300 mt-1">
                  {adoptionRevenueCorr > 0.5 ? 'Strong positive correlation' :
                   adoptionRevenueCorr > 0.3 ? 'Moderate positive correlation' :
                   adoptionRevenueCorr > -0.3 ? 'Weak correlation' :
                   adoptionRevenueCorr > -0.5 ? 'Moderate negative correlation' :
                   'Strong negative correlation'}
                </p>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  Adoption Rate vs Avg Transaction Value
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-200">
                  {adoptionTransactionCorr.toFixed(3)}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-300 mt-1">
                  {adoptionTransactionCorr > 0.5 ? 'Strong positive correlation' :
                   adoptionTransactionCorr > 0.3 ? 'Moderate positive correlation' :
                   adoptionTransactionCorr > -0.3 ? 'Weak correlation' :
                   adoptionTransactionCorr > -0.5 ? 'Moderate negative correlation' :
                   'Strong negative correlation'}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-200 mb-4">
              Regional Performance
            </h2>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {Object.entries(regionalData)
                .sort(([, a], [, b]) => b.totalProfit - a.totalProfit)
                .map(([region, data]: [string, any], index) => (
                  <motion.div
                    key={region}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-200">
                        {region}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-300">
                        {data.storeCount} stores
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900 dark:text-gray-200">
                        {formatCurrency(data.totalProfit)}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-300">
                        {formatPercentage(data.avgMargin)}
                      </p>
                    </div>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        </div>

        {/* Top/Bottom Performers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="card p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-200 mb-4">
              Top 5 Performing Stores
            </h2>
            <div className="space-y-3">
              {storePerformance.slice(0, 5).map((store, index) => (
                <div
                  key={store.store_id}
                  className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-200">
                      {index + 1}. {store.store_name}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      {store.format}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 dark:text-gray-200">
                      {formatCurrency(store.total_profit)}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      {formatPercentage(store.avg_net_profit_margin)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="card p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-200 mb-4">
              Bottom 5 Performing Stores
            </h2>
            <div className="space-y-3">
              {storePerformance.slice(-5).reverse().map((store, index) => (
                <div
                  key={store.store_id}
                  className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-200">
                      {index + 1}. {store.store_name}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      {store.format}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 dark:text-gray-200">
                      {formatCurrency(store.total_profit)}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      {formatPercentage(store.avg_net_profit_margin)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
