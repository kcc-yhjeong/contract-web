import { create } from 'zustand';

interface ActiveFieldState {
    activeFieldId: string | null;
    setActiveFieldId: (id: string | null) => void;
}

export const useActiveFieldStore = create<ActiveFieldState>(set => ({
    activeFieldId: null,
    setActiveFieldId: id => set({ activeFieldId: id }),
}));
