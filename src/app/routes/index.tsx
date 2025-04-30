import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';

import { Home } from '@/pages/home';
import { TemplateManagement } from '@/pages/template';
import { Layout } from '@/widgets/layout';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/dashboard" replace />,
    },
    {
        path: '/',
        element: (
            <Layout>
                <Outlet />
            </Layout>
        ),
        children: [
            {
                path: '/dashboard',
                element: <Home />,
            },
            {
                path: '/template',
                element: <TemplateManagement />,
            },
            {
                path: '/contract',
                element: <Home />,
            },
        ],
    },
]);
