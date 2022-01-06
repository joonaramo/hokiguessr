import { Landing } from '../pages/Landing';
import { useRoutes, Navigate, Outlet } from 'react-router-dom';
import { Login } from '../pages/Auth/Login';
import { useAuth } from '../lib/auth';
import { Layout } from '../components/Layout/Layout';
import { Dashboard } from '../pages/Dashboard';
import { Games } from '../pages/Games';
import { Signup } from '../pages/Auth/Signup';
import { Predictions } from '../pages/Predictions';
import { Admin, AdminDashboard } from '../pages/Admin';
import { AdminLayout } from '../components/Layout/AdminLayout';
import { Players } from '../pages/Admin/Players';

const App = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

const AdminApp = () => {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
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
      path: '/signup',
      element: !user ? <Signup /> : <Navigate to='/app' />,
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
        {
          path: 'predictions',
          element: <Predictions />,
        },
      ],
    },
    {
      path: '/app/admin',
      element: user && user.is_admin ? <AdminApp /> : <Navigate to='/app' />,
      children: [
        {
          path: '',
          element: <AdminDashboard />,
        },
        {
          path: 'players',
          element: <Players />,
        },
      ],
    },
  ];
  const element = useRoutes(routes);
  return <>{element}</>;
};
