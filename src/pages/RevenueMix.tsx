import { useData } from '../hooks/useData';
import { formatCurrency, formatPercentage } from '../utils/cn';
import { motion } from 'framer-motion';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const COLORS = ['#c48b5c', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6'];

export default function RevenueMix() {
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

  const revenueMix = data.transformer.getRevenueMix();

  // Prepare chart data
  const pieData = revenueMix.map((item) => ({
    name: item.category,
    value: item.revenue,
    margin: item.gross_margin_pct,
  }));

  const barData = revenueMix.map((item) => ({
    name: item.category,
    revenue: item.revenue,
    margin: item.gross_margin_pct,
  }));

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-200 mb-2">
          Revenue Mix and Product Analytics
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Analysis of revenue distribution across product categories
        </p>

        {/* Revenue Mix Pie Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="card p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-200 mb-6">
              Revenue Distribution by Category
            </h2>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : ''}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e8dcc9',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number | undefined) => value ? formatCurrency(value) : ''}
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-200 mb-6">
              Category Summary
            </h2>
            <div className="space-y-4">
              {revenueMix.map((item, index) => (
                <motion.div
                  key={item.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-coffee-50 dark:bg-coffee-800 rounded-lg"
                >
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-gray-200">
                      {item.category}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {formatCurrency(item.revenue)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 dark:text-gray-200">
                      {formatPercentage(item.percentage)}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Margin: {formatPercentage(item.gross_margin_pct)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Revenue and Margin Bar Chart */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-200 mb-4">
            Revenue and Margin by Category
          </h2>
          <div className="card p-6">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e8dcc9" />
                <XAxis dataKey="name" stroke="#ffffff" />
                <YAxis yAxisId="left" stroke="#ffffff" tickFormatter={(value) => formatCurrency(value)} />
                <YAxis yAxisId="right" orientation="right" stroke="#ffffff" tickFormatter={(value) => formatPercentage(value)} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e8dcc9',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number | undefined, name: string) => {
                    if (!value) return '';
                    if (name === 'Revenue') return formatCurrency(value);
                    if (name === 'Margin') return formatPercentage(value);
                    return value;
                  }}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="revenue" fill="#c48b5c" name="Revenue" />
                <Bar yAxisId="right" dataKey="margin" fill="#f97316" name="Margin %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Product Margin Analysis Table */}
        <div className="card p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Product Margin Analysis
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-coffee-50 dark:bg-coffee-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    % of Total
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Gross Margin
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-coffee-900 divide-y divide-coffee-200 dark:divide-coffee-800">
                {revenueMix.map((item, index) => (
                  <motion.tr
                    key={item.category}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="hover:bg-coffee-50 dark:hover:bg-coffee-800 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">
                      {item.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-gray-200">
                      {formatCurrency(item.revenue)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-gray-200">
                      {formatPercentage(item.percentage)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-gray-200">
                      {formatPercentage(item.gross_margin_pct)}
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
