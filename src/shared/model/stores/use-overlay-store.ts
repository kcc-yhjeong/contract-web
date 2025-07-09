import { ReactNode } from 'react';

import { create } from 'zustand';

interface OverlayState {
    components: ReactNode[];
    open: (component: ReactNode) => void;
    close: () => void;
}

export const useOverlayStore = create<OverlayState>(set => ({
    components: [],
    open: component =>
        set(state => ({
            components: [...state.components, component],
        })),
    close: () =>
        set(state => ({
            components: state.components.slice(0, -1),
        })),
}));
