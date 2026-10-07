import { useData } from '../hooks/useData';
import { formatCurrency, formatNumber } from '../utils/cn';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function SeasonalPatterns() {
  const { data, isLoading, error } = useData();

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-coffee-200 dark:bg-coffee-800 rounded w-1/3"></div>
          <div className="h-96 bg-coffee-200 dark:bg-coffee-800 rounded"></div>
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

  // Prepare chart data
  const monthlyChartData = seasonalPatterns.map((pattern) => ({
    name: pattern.period,
    revenue: pattern.revenue,
    profit: pattern.profit,
    year: pattern.period.split('-')[0],
  }));

  const quarterlyChartData = Object.entries(quarterlyData)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([quarter, data]) => ({
      name: quarter,
      revenue: data.revenue,
      profit: data.profit,
      transactions: data.transactions,
      footfall: Math.round(data.footfall),
    }));

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-200 mb-2">
          Temporal and Seasonal Patterns
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Analysis of trading patterns across time periods
        </p>

        {/* Monthly Trends Line Chart */}
        <div className="card p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-200 mb-6">
            Monthly Revenue Trends (2023-2024)
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={monthlyChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e8dcc9" />
              <XAxis dataKey="name" stroke="#ffffff" />
              <YAxis stroke="#ffffff" tickFormatter={(value) => formatCurrency(value)} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e8dcc9',
                  borderRadius: '8px',
                }}
                formatter={(value: number | undefined) => value ? formatCurrency(value) : ''}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#c48b5c"
                strokeWidth={2}
                name="Revenue"
                dot={{ fill: '#c48b5c' }}
              />
              <Line
                type="monotone"
                dataKey="profit"
                stroke="#f97316"
                strokeWidth={2}
                name="Profit"
                dot={{ fill: '#f97316' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Quarterly Bar Chart */}
        <div className="card p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-200 mb-6">
            Quarterly Performance Summary
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={quarterlyChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e8dcc9" />
              <XAxis dataKey="name" stroke="#ffffff" />
              <YAxis stroke="#ffffff" tickFormatter={(value) => formatCurrency(value)} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e8dcc9',
                  borderRadius: '8px',
                }}
                formatter={(value: number | undefined, name: string) => {
                  if (!value) return '';
                  if (name === 'Transactions' || name === 'Footfall') return formatNumber(value);
                  return formatCurrency(value);
                }}
              />
              <Legend />
              <Bar dataKey="revenue" fill="#c48b5c" name="Revenue" />
              <Bar dataKey="profit" fill="#f97316" name="Profit" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Quarterly Summary Table */}
        <div className="card p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-200 mb-6">
            Quarterly Detailed Metrics
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-coffee-50 dark:bg-coffee-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Quarter
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Profit
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Transactions
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Footfall
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-coffee-900 divide-y divide-coffee-200 dark:divide-coffee-800">
                {Object.entries(quarterlyData)
                  .sort(([a], [b]) => a.localeCompare(b))
                  .map(([quarter, data], index) => (
                    <motion.tr
                      key={quarter}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="hover:bg-coffee-50 dark:hover:bg-coffee-800 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">
                        {quarter}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-gray-200">
                        {formatCurrency(data.revenue)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-gray-200">
                        {formatCurrency(data.profit)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-gray-200">
                        {formatNumber(data.transactions)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-gray-200">
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
