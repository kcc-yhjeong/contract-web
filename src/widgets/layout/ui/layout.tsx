import { SidebarInset, SidebarProvider } from '@/shared/ui/navigation/sidebar';
import { AppSidebar } from '@/widgets/layout/ui/app-sidebar';
import { SiteHeader } from '@/widgets/layout/ui/site-header';

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">{children}</div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
