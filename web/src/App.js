import { AppRoutes } from './routes';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './lib/auth';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Notifications } from './components/Notifications';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Notifications />
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
