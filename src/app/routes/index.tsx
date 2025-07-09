import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';

import { Contract } from '@/pages/contract/sign-contract';
import { Home } from '@/pages/home';
import { EditTemplate } from '@/pages/template/edit-template';
import { TemplateManagement } from '@/pages/template/template-management';
import { DashboardLayout } from '@/widgets/dashboard-layout';

import { OverlayProvider } from '../providers';

export const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <OverlayProvider>
                <Outlet />
            </OverlayProvider>
        ),
        children: [
            {
                element: (
                    <DashboardLayout>
                        <Outlet />
                    </DashboardLayout>
                ),
                children: [
                    {
                        index: true,
                        element: <Navigate to="dashboard" replace />,
                    },
                    {
                        path: 'dashboard',
                        element: <Home />,
                    },
                    {
                        path: 'template',
                        element: <TemplateManagement />,
                    },
                    {
                        path: 'contract',
                        element: <Home />,
                    },
                ],
            },
            {
                path: 'template/edit/:id',
                element: <EditTemplate />,
            },
            {
                path: 'contract/:id',
                element: <Contract />,
            },
            {
                path: 'contract/:id/:signerId',
                element: <Contract />,
            },
        ],
    },
]);
