import { create } from 'zustand';

interface MenuState {
    activeMenu: {
        url: string;
        name: string;
    };
    setActiveMenu: (menu: { url: string; name: string }) => void;
}

export const useMenuStore = create<MenuState>(set => ({
    activeMenu: {
        url: window.location.pathname,
        name: '',
    },
    setActiveMenu: menu => set({ activeMenu: menu }),
}));
