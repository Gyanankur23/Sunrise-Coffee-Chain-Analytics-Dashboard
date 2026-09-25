import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ExecutiveOverview from './pages/ExecutiveOverview';
import StorePerformance from './pages/StorePerformance';
import LoyaltyAnalytics from './pages/LoyaltyAnalytics';
import RevenueMix from './pages/RevenueMix';
import SeasonalPatterns from './pages/SeasonalPatterns';
import AdvancedAnalytics from './pages/AdvancedAnalytics';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<ExecutiveOverview />} />
            <Route path="/store-performance" element={<StorePerformance />} />
            <Route path="/loyalty" element={<LoyaltyAnalytics />} />
            <Route path="/revenue-mix" element={<RevenueMix />} />
            <Route path="/seasonal" element={<SeasonalPatterns />} />
            <Route path="/advanced" element={<AdvancedAnalytics />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
