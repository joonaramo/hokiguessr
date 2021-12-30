import { Landing } from '../pages/Landing';
import { useRoutes, Navigate, Outlet } from 'react-router-dom';
import { Login } from '../pages/auth/Login';
import { useAuth } from '../lib/auth';
import { Layout } from '../components/Layout/Layout';
import { Dashboard } from '../pages/Dashboard';
import { Games } from '../pages/Games';

const App = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export const AppRoutes = () => {
  const { user } = useAuth();
  const routes = [
    {
      path: '/',
      element: <Landing />,
    },
    {
      path: '/login',
      element: !user ? <Login /> : <Navigate to='/app' />,
    },
    {
      path: '/app',
      element: user ? <App /> : <Navigate to='/login' />,
      children: [
        {
          path: '',
          element: <Dashboard />,
        },
        {
          path: 'games',
          element: <Games />,
        },
      ],
    },
  ];
  const element = useRoutes(routes);
  return <>{element}</>;
};
