import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
//
import BlogPage from './pages/BlogPage';
import Discovery from './pages/Discovery';
import DetailSong from './pages/DetailSong';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { path: 'dashboard', element: <DashboardAppPage /> },
        { path: '', element: <Discovery />, index: true },
        { path: 'blog', element: <BlogPage /> },
        { path: 'songs/:id', element: <DetailSong /> },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    }
  ]);

  return routes;
}
