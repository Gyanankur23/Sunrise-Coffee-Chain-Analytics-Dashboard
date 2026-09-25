import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Store,
  CreditCard,
  PieChart,
  Calendar,
  BarChart3,
  Moon,
  Sun,
} from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const navItems = [
  { path: '/', label: 'Executive Overview', icon: LayoutDashboard },
  { path: '/store-performance', label: 'Store Performance', icon: Store },
  { path: '/loyalty', label: 'Loyalty Analytics', icon: CreditCard },
  { path: '/revenue-mix', label: 'Revenue Mix', icon: PieChart },
  { path: '/seasonal', label: 'Seasonal Patterns', icon: Calendar },
  { path: '/advanced', label: 'Advanced Analytics', icon: BarChart3 },
];

export default function Sidebar() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-bold text-coffee-800 dark:text-coffee-200">
          Sunrise Coffee
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Analytics Dashboard
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-coffee-100 dark:bg-coffee-900 text-coffee-800 dark:text-coffee-200'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
          <span className="font-medium">
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </span>
        </button>
      </div>
    </aside>
  );
}
