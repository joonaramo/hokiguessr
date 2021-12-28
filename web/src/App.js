import { AppRoutes } from './routes';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './lib/auth';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
