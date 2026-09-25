import { useData } from '../hooks/useData';
import { formatCurrency, formatNumber } from '../utils/cn';
import { motion } from 'framer-motion';

export default function SeasonalPatterns() {
  const { data, isLoading, error } = useData();

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded"></div>
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

  const seasonalPatterns = data.transformer.getSeasonalPatterns();

  // Group by quarter
  const quarterlyData = seasonalPatterns.reduce((acc, pattern) => {
    const year = pattern.period.split('-')[0];
    const month = parseInt(pattern.period.split('-')[1]);
    const quarter = Math.ceil(month / 3);
    const key = `${year}-Q${quarter}`;

    if (!acc[key]) {
      acc[key] = { revenue: 0, profit: 0, transactions: 0, footfall: 0 };
    }

    acc[key].revenue += pattern.revenue;
    acc[key].profit += pattern.profit;
    acc[key].transactions += pattern.transactions;
    acc[key].footfall += pattern.footfall;

    return acc;
  }, {} as Record<string, { revenue: number; profit: number; transactions: number; footfall: number }>);

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Temporal and Seasonal Patterns
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Analysis of trading patterns across time periods
        </p>

        {/* Monthly Trends */}
        <div className="card p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Monthly Revenue Trends (2023-2024)
          </h2>
          <div className="h-64 flex items-end gap-1">
            {seasonalPatterns.map((pattern, index) => {
              const maxRevenue = Math.max(...seasonalPatterns.map(p => p.revenue));
              const height = (pattern.revenue / maxRevenue) * 100;
              const is2024 = pattern.period.startsWith('2024');

              return (
                <motion.div
                  key={pattern.period}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: 0.8, delay: index * 0.02 }}
                  className="flex-1 flex flex-col items-center gap-2 group"
                >
                  <div
                    className={`w-full rounded-t transition-all ${
                      is2024
                        ? 'bg-coffee-600 dark:bg-coffee-500'
                        : 'bg-coffee-400 dark:bg-coffee-700'
                    } hover:opacity-80`}
                    title={`${formatCurrency(pattern.revenue)}`}
                  />
                  <span className="text-xs text-gray-600 dark:text-gray-400 rotate-45 origin-bottom-left opacity-0 group-hover:opacity-100 transition-opacity">
                    {pattern.period}
                  </span>
                </motion.div>
              );
            })}
          </div>
          <div className="flex justify-center gap-8 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-coffee-400 dark:bg-coffee-700 rounded"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">2023</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-coffee-600 dark:bg-coffee-500 rounded"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">2024</span>
            </div>
          </div>
        </div>

        {/* Quarterly Summary */}
        <div className="card p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Quarterly Performance Summary
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Quarter
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Profit
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Transactions
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Footfall
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {Object.entries(quarterlyData)
                  .sort(([a], [b]) => a.localeCompare(b))
                  .map(([quarter, data], index) => (
                    <motion.tr
                      key={quarter}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                        {quarter}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-gray-100">
                        {formatCurrency(data.revenue)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-gray-100">
                        {formatCurrency(data.profit)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-gray-100">
                        {formatNumber(data.transactions)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-gray-100">
                        {formatNumber(Math.round(data.footfall))}
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
