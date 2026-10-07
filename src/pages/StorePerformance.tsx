import { useData } from '../hooks/useData';
import { formatCurrency, formatPercentage, getColorForProfitability, getBgColorForProfitability } from '../utils/cn';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ZAxis,
} from 'recharts';

export default function StorePerformance() {
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

  const storePerformance = data.transformer.getStorePerformance();

  // Prepare chart data
  const topStores = storePerformance.slice(0, 10);
  const scatterData = storePerformance.map((store) => ({
    x: store.avg_revenue_per_sqft,
    y: store.avg_net_profit_margin,
    z: store.total_revenue,
    name: store.store_name,
  }));

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-200 mb-2">
          Store Performance Analysis
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Detailed performance metrics for all stores
        </p>

        {/* Top 10 Stores Bar Chart */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-200 mb-4">
            Top 10 Stores by Profit
          </h2>
          <div className="card p-6">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={topStores} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e8dcc9" />
                <XAxis type="number" stroke="#ffffff" />
                <YAxis dataKey="store_name" type="category" width={150} stroke="#ffffff" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e8dcc9',
                    borderRadius: '8px',
                  }}
                  formatter={(value: any) => value ? formatCurrency(value) : ''}
                />
                <Legend />
                <Bar dataKey="total_profit" fill="#c48b5c" name="Total Profit" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue vs Margin Scatter Chart */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-200 mb-4">
            Revenue per Sqft vs Profit Margin
          </h2>
          <div className="card p-6">
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke="#e8dcc9" />
                <XAxis
                  dataKey="x"
                  name="Revenue per Sqft"
                  stroke="#ffffff"
                  tickFormatter={(value) => formatCurrency(value)}
                />
                <YAxis
                  dataKey="y"
                  name="Profit Margin"
                  stroke="#ffffff"
                  tickFormatter={(value) => formatPercentage(value)}
                />
                <ZAxis dataKey="z" range={[50, 400]} />
                <Tooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e8dcc9',
                    borderRadius: '8px',
                  }}
                  formatter={(value: any, name: any) => {
                    if (!value) return '';
                    if (name === 'Revenue per Sqft') return formatCurrency(value);
                    if (name === 'Profit Margin') return formatPercentage(value);
                    if (name === 'Revenue') return formatCurrency(value);
                    return value;
                  }}
                />
                <Legend />
                <Scatter data={scatterData} fill="#f97316" name="Stores" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Store Performance Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-coffee-50 dark:bg-coffee-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Store
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Format
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Region
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Total Revenue
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Total Profit
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Avg Margin
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    YoY Growth
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-coffee-900 divide-y divide-coffee-200 dark:divide-coffee-800">
                {storePerformance.map((store, index) => (
                  <motion.tr
                    key={store.store_id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.02 }}
                    className="hover:bg-coffee-50 dark:hover:bg-coffee-800 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">
                      {store.store_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                      {store.format}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                      {store.region}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-gray-200">
                      {formatCurrency(store.total_revenue)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-gray-200">
                      {formatCurrency(store.total_profit)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-gray-200">
                      {formatPercentage(store.avg_net_profit_margin)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getBgColorForProfitability(
                          store.profitability_status
                        )} ${getColorForProfitability(store.profitability_status)}`}
                      >
                        {store.profitability_status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-gray-200">
                      {store.yoy_growth >= 0 ? '+' : ''}
                      {formatPercentage(store.yoy_growth)}
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
