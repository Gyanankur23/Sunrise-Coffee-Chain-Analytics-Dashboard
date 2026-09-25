import { useData } from '../hooks/useData';
import { formatCurrency, formatPercentage, formatNumber } from '../utils/cn';
import { motion } from 'framer-motion';

export default function ExecutiveOverview() {
  const { data, isLoading, error } = useData();

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
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

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Executive Overview
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
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
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                {kpi.label}
              </h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {kpi.format === 'currency' && formatCurrency(Number(kpi.value))}
                {kpi.format === 'percentage' && formatPercentage(Number(kpi.value))}
                {kpi.format === 'number' && formatNumber(Number(kpi.value))}
                {!kpi.format && kpi.value}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Format Performance */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Performance by Store Format
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(formatData).map(([format, data]: [string, any]) => (
              <div key={format} className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  {format}
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Stores</span>
                    <span className="font-semibold">{data.storeCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Total Revenue</span>
                    <span className="font-semibold">{formatCurrency(data.totalRevenue)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Total Profit</span>
                    <span className="font-semibold">{formatCurrency(data.totalProfit)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Avg Margin</span>
                    <span className="font-semibold">{formatPercentage(data.avgMargin)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Seasonal Trends */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Monthly Revenue Trends
          </h2>
          <div className="card p-6">
            <div className="h-64 flex items-end gap-2">
              {seasonalPatterns.map((pattern) => (
                <div
                  key={pattern.period}
                  className="flex-1 flex flex-col items-center gap-2"
                >
                  <div
                    className="w-full bg-coffee-500 dark:bg-coffee-600 rounded-t transition-all hover:bg-coffee-600 dark:hover:bg-coffee-500"
                    style={{
                      height: `${(pattern.revenue / Math.max(...seasonalPatterns.map(p => p.revenue))) * 100}%`,
                    }}
                    title={`${formatCurrency(pattern.revenue)}`}
                  />
                  <span className="text-xs text-gray-600 dark:text-gray-400 rotate-45 origin-bottom-left">
                    {pattern.period}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
