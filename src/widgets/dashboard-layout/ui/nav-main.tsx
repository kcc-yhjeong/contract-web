import { useEffect } from 'react';

import { type LucideIcon, PlusCircleIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/shared/ui';
import { useMenuStore } from '@/widgets/dashboard-layout/model/menu-store';

export function NavMain({
    items,
}: {
    items: {
        title: string;
        url: string;
        icon?: LucideIcon;
    }[];
}) {
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
        <SidebarGroup>
            <SidebarGroupContent className="flex flex-col gap-2">
                <SidebarMenu>
                    <SidebarMenuItem className="flex items-center gap-2">
                        <SidebarMenuButton
                            tooltip="전자계약 생성"
                            className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
                        >
                            <PlusCircleIcon />
                            <span>전자계약 생성</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
                <SidebarMenu>
                    {items.map(item => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                tooltip={item.title}
                                isActive={activeMenu.url === item.url}
                                onClick={() => {
                                    navigate(item.url);
                                    setActiveMenu({ url: item.url, name: item.title });
                                }}
                            >
                                <div className="flex items-center gap-2 cursor-pointer">
                                    {item.icon && <item.icon />}
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
