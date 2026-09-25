import Papa from 'papaparse';
import type {
  DimDate,
  DimStore,
  DimProduct,
  FactDailySales,
  FactStoreMonthlyProfitability,
  LoadedData,
} from '../types';

export interface LoadingProgress {
  currentFile: string;
  totalFiles: number;
  loadedFiles: number;
  percentage: number;
}

type ProgressCallback = (progress: LoadingProgress) => void;

export async function loadCSV<T>(
  filename: string
): Promise<T[]> {
  return new Promise((resolve, reject) => {
    Papa.parse<T>(`/data/${filename}`, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      download: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          console.warn('CSV parsing warnings:', results.errors);
        }
        resolve(results.data as T[]);
      },
      error: (error) => {
        reject(new Error(`Failed to load ${filename}: ${error.message}`));
      },
    });
  });
}

export async function loadAllData(
  onProgress?: ProgressCallback
): Promise<LoadedData> {
  const files = [
    'dim_date.csv',
    'dim_store.csv',
    'dim_product.csv',
    'fact_daily_sales.csv',
    'fact_store_monthly_profitability.csv',
  ];

  const data: LoadedData = {
    dimDate: [],
    dimStore: [],
    dimProduct: [],
    factDailySales: [],
    factStoreMonthlyProfitability: [],
  };

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    onProgress?.({
      currentFile: file,
      totalFiles: files.length,
      loadedFiles: i,
      percentage: (i / files.length) * 100,
    });

    try {
      switch (file) {
        case 'dim_date.csv':
          data.dimDate = await loadCSV<DimDate>(file);
          break;
        case 'dim_store.csv':
          data.dimStore = await loadCSV<DimStore>(file);
          break;
        case 'dim_product.csv':
          data.dimProduct = await loadCSV<DimProduct>(file);
          break;
        case 'fact_daily_sales.csv':
          data.factDailySales = await loadCSV<FactDailySales>(file);
          break;
        case 'fact_store_monthly_profitability.csv':
          data.factStoreMonthlyProfitability = await loadCSV<FactStoreMonthlyProfitability>(
            file
          );
          break;
      }
    } catch (error) {
      console.error(`Error loading ${file}:`, error);
      throw error;
    }

    onProgress?.({
      currentFile: file,
      totalFiles: files.length,
      loadedFiles: i + 1,
      percentage: ((i + 1) / files.length) * 100,
    });
  }

  return data;
}
