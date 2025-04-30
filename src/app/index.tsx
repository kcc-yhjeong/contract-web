import { ReactNode } from 'react';

import { ThemeProvider } from '../shared/ui/theme/theme-provider';
import { QueryProvider } from './providers/query-provider';
import { RouterProvider } from './providers/router-provider';
import { StoreProvider } from './providers/store-provider';

interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
    return (
        // <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <QueryProvider>
                <StoreProvider>
                    <RouterProvider>{children}</RouterProvider>
                </StoreProvider>
            </QueryProvider>
        </ThemeProvider>
    );
};
