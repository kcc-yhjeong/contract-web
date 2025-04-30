import {
    FileIcon,
    HelpCircleIcon,
    LayoutDashboardIcon,
    LayoutTemplateIcon,
    SettingsIcon,
} from 'lucide-react';
import type * as React from 'react';

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/shared/ui/navigation/sidebar';

import { NavMain } from './nav-main';
import { NavMenus } from './nav-menus';
import { NavSecondary } from './nav-secondary';
import { NavUser } from './nav-user';

const data = {
    user: {
        name: 'shadcn',
        email: 'm@example.com',
        avatar: '/avatars/shadcn.jpg',
    },
    navMain: [
        {
            title: 'Dashboard',
            url: '/dashboard',
            icon: LayoutDashboardIcon,
        },
    ],
    navSecondary: [
        {
            title: 'Settings',
            url: '#',
            icon: SettingsIcon,
        },
        {
            title: 'Get Help',
            url: '#',
            icon: HelpCircleIcon,
        },
    ],
    documents: [
        {
            name: '템플릿 관리',
            url: '/template',
            icon: LayoutTemplateIcon,
        },
        {
            name: '계약서 관리',
            url: '/contract',
            icon: FileIcon,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:!p-1.5"
                        >
                            <a href="#">
                                <span className="text-base font-semibold">KCC 정보통신</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavMenus items={data.documents} />
                <NavSecondary items={data.navSecondary} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    );
}
