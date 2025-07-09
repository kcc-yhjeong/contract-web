import { useEffect } from 'react';

import type { LucideIcon } from 'lucide-react';
import type * as React from 'react';
import { useNavigate } from 'react-router-dom';

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/shared/ui';
import { useMenuStore } from '@/widgets/dashboard-layout/model/menu-store';

export function NavSecondary({
    items,
    ...props
}: {
    items: {
        title: string;
        url: string;
        icon: LucideIcon;
    }[];
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
    const navigate = useNavigate();
    const activeMenu = useMenuStore(state => state.activeMenu);
    const setActiveMenu = useMenuStore(state => state.setActiveMenu);

    useEffect(() => {
        const currentPath = window.location.pathname;
        const matchingItem = items.find(item => item.url === currentPath);
        if (matchingItem) {
            setActiveMenu({ url: matchingItem.url, name: matchingItem.title });
        }
    }, [items, setActiveMenu]);

    return (
        <SidebarGroup {...props}>
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map(item => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                isActive={activeMenu.url === item.url}
                                onClick={() => {
                                    navigate(item.url);
                                    setActiveMenu({ url: item.url, name: item.title });
                                }}
                            >
                                <div className="flex items-center gap-2 cursor-pointer">
                                    <item.icon />
                                    <span>{item.title}</span>
                                </div>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
