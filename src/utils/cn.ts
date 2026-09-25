import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPercentage(value: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value / 100);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-GB').format(value);
}

export function calculateTrend(current: number, previous: number): number {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}

export function getTrendDirection(trend: number): 'up' | 'down' | 'neutral' {
  if (trend > 0) return 'up';
  if (trend < 0) return 'down';
  return 'neutral';
}

export function getColorForProfitability(status: string): string {
  const colors: Record<string, string> = {
    'Highly-Profitable': 'text-green-600',
    'Profitable': 'text-green-500',
    'Break-Even': 'text-yellow-500',
    'Loss-Making': 'text-orange-500',
    'Structural-Loss': 'text-red-600',
  };
  return colors[status] || 'text-gray-500';
}

export function getBgColorForProfitability(status: string): string {
  const colors: Record<string, string> = {
    'Highly-Profitable': 'bg-green-100 dark:bg-green-900',
    'Profitable': 'bg-green-50 dark:bg-green-800',
    'Break-Even': 'bg-yellow-100 dark:bg-yellow-900',
    'Loss-Making': 'bg-orange-100 dark:bg-orange-900',
    'Structural-Loss': 'bg-red-100 dark:bg-red-900',
  };
  return colors[status] || 'bg-gray-100 dark:bg-gray-800';
}
