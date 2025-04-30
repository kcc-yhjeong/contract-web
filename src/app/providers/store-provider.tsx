import { ReactNode } from 'react';

import { create } from 'zustand';

interface StoreState {
    count: number;
    increment: () => void;
}

export const useStore = create<StoreState>(set => ({
    count: 0,
    increment: () => set(state => ({ count: state.count + 1 })),
}));

export const StoreProvider = ({ children }: { children: ReactNode }) => {
    return <>{children}</>;
};
