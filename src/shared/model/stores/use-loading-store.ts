import { create } from 'zustand';

interface LoadingState {
    loading: boolean;
    setLoading: (value: boolean) => void;
    start: () => void;
    stop: () => void;
}

export const useLoadingStore = create<LoadingState>(set => ({
    loading: false,
    setLoading: value => set({ loading: value }),
    start: () => set({ loading: true }),
    stop: () => set({ loading: false }),
}));
