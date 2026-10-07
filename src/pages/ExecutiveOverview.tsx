import { useData } from '../hooks/useData';
import { formatCurrency, formatPercentage, formatNumber } from '../utils/cn';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const COLORS = ['#c48b5c', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6'];

export default function ExecutiveOverview() {
  const { data, isLoading, error } = useData();

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-coffee-200 dark:bg-coffee-800 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-coffee-200 dark:bg-coffee-800 rounded"></div>
            ))}
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

  const kpis = data.transformer.getKPIs();
  const seasonalPatterns = data.transformer.getSeasonalPatterns();
  const formatData = data.transformer.getDataByFormat();

  // Prepare chart data
  const formatChartData = Object.entries(formatData).map(([format, data]: [string, any]) => ({
    name: format,
    revenue: data.totalRevenue,
    profit: data.totalProfit,
    margin: data.avgMargin,
    stores: data.storeCount,
  }));

  const seasonalChartData = seasonalPatterns.map((pattern) => ({
    name: pattern.period,
    revenue: pattern.revenue,
    profit: pattern.profit,
  }));

  const pieData = Object.entries(formatData).map(([format, data]: [string, any]) => ({
    name: format,
    value: data.totalRevenue,
  }));

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-200 mb-2">
          Executive Overview
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Key performance indicators and trends for Sunrise Coffee Chain
        </p>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpis.map((kpi, index) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card p-6"
            >
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                {kpi.label}
              </h3>
              <p className="text-3xl font-bold text-coffee-600 dark:text-coffee-400">
                {kpi.format === 'currency' && formatCurrency(Number(kpi.value))}
                {kpi.format === 'percentage' && formatPercentage(Number(kpi.value))}
                {kpi.format === 'number' && formatNumber(Number(kpi.value))}
                {!kpi.format && kpi.value}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Format Performance Bar Chart */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-200 mb-4">
            Performance by Store Format
          </h2>
          <div className="card p-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={formatChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e8dcc9" />
                <XAxis dataKey="name" stroke="#ffffff" />
                <YAxis stroke="#ffffff" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e8dcc9',
                    borderRadius: '8px',
                  }}
                  formatter={(value: any) => value ? formatCurrency(value) : ''}
                />
                <Legend />
                <Bar dataKey="revenue" fill="#c48b5c" name="Revenue" />
                <Bar dataKey="profit" fill="#f97316" name="Profit" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Revenue Line Chart */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-200 mb-4">
            Monthly Revenue Trends
          </h2>
          <div className="card p-6">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={seasonalChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e8dcc9" />
                <XAxis dataKey="name" stroke="#ffffff" />
                <YAxis stroke="#ffffff" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e8dcc9',
                    borderRadius: '8px',
                  }}
                  formatter={(value: any) => value ? formatCurrency(value) : ''}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#c48b5c"
                  strokeWidth={2}
                  name="Revenue"
                />
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke="#f97316"
                  strokeWidth={2}
                  name="Profit"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Distribution Pie Chart */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-200 mb-4">
            Revenue Distribution by Format
          </h2>
          <div className="card p-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : ''}%`}
                  outerRadius={80}
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
                  formatter={(value: any) => value ? formatCurrency(value) : ''}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
