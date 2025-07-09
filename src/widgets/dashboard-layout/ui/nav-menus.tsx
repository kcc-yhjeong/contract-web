import { useEffect } from 'react';

import { type LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/shared/ui';
import { useMenuStore } from '@/widgets/dashboard-layout/model/menu-store';

export function NavMenus({
    items,
}: {
    items: {
        name: string;
        url: string;
        icon: LucideIcon;
    }[];
}) {
    const navigate = useNavigate();
    const activeMenu = useMenuStore(state => state.activeMenu);
    const setActiveMenu = useMenuStore(state => state.setActiveMenu);

    useEffect(() => {
        const currentPath = window.location.pathname;
        const matchingItem = items.find(item => item.url === currentPath);
        if (matchingItem) {
            setActiveMenu({ url: matchingItem.url, name: matchingItem.name });
        }
    }, [items, setActiveMenu]);

    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>문서</SidebarGroupLabel>
            <SidebarMenu>
                {items.map(item => (
                    <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton
                            asChild
                            isActive={activeMenu.url === item.url}
                            onClick={() => {
                                navigate(item.url);
                                setActiveMenu({ url: item.url, name: item.name });
                            }}
                        >
                            <div className="flex items-center gap-2 cursor-pointer">
                                <item.icon />
                                <span>{item.name}</span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
