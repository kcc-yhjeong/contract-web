import { create } from 'zustand';

interface ScaleState {
    scale: number;
    setScale: (scale: number | ((prevScale: number) => number)) => void;
}

export const useScaleStore = create<ScaleState>(set => ({
    scale: 1,
    setScale: scale =>
        set(state => ({ scale: typeof scale === 'function' ? scale(state.scale) : scale })),
}));
