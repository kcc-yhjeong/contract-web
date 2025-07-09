import { ReactNode } from 'react';

import { useLoading } from '@/shared/lib';
import { LoadingSpinner } from '@/shared/ui';

import { QueryProvider } from './providers/query-provider';
import { ThemeProvider } from './providers/theme-provider';
interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
    const { isLoading } = useLoading();
    return (
        // <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            {isLoading && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-30">
                    <LoadingSpinner />
                </div>
            )}
            <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
    );
};
