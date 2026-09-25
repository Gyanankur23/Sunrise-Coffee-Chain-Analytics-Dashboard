import { useData } from '../hooks/useData';
import { formatCurrency, formatPercentage } from '../utils/cn';
import { motion } from 'framer-motion';

export default function LoyaltyAnalytics() {
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

  const loyaltyMetrics = data.transformer.getLoyaltyMetrics();
  const totalNetValue = loyaltyMetrics.reduce((sum, m) => sum + m.loyalty_net_value, 0);
  const totalRedemptionCost = loyaltyMetrics.reduce((sum, m) => sum + m.redemption_cost, 0);
  const totalMemberSpend = loyaltyMetrics.reduce((sum, m) => sum + m.member_spend, 0);

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Loyalty Programme Analytics
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Analysis of loyalty programme effectiveness and ROI
        </p>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="card p-6"
          >
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              Total Net Value
            </h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {formatCurrency(totalNetValue)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Member spend - Redemption cost
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card p-6"
          >
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              Total Member Spend
            </h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {formatCurrency(totalMemberSpend)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Revenue from loyalty members
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="card p-6"
          >
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              Total Redemption Cost
            </h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {formatCurrency(totalRedemptionCost)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Cost of loyalty rewards
            </p>
          </motion.div>
        </div>

        {/* Store-Level Metrics */}
        <div className="card overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Store-Level Loyalty Metrics
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Store
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Adoption Rate
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Member Revenue %
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Avg Transaction
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Net Value
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {loyaltyMetrics.map((metrics, index) => (
                  <motion.tr
                    key={metrics.store_id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.02 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                      {metrics.store_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-gray-100">
                      {formatPercentage(metrics.adoption_rate * 100)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-gray-100">
                      {formatPercentage(metrics.member_revenue_pct * 100)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-gray-100">
                      {formatCurrency(metrics.avg_transaction_value)}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm text-right font-semibold ${
                      metrics.loyalty_net_value >= 0
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {formatCurrency(metrics.loyalty_net_value)}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
