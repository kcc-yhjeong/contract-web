import { create } from 'zustand';
import { useShallow } from 'zustand/shallow';

import { Field, FieldStore } from './types';

export const useFieldStore = create<FieldStore>(set => ({
    fields: [],
    setFields: fields => set({ fields }),
    addField: field => set(state => ({ fields: [...state.fields, field] })),
    updateField: (fieldId, update) =>
        set(state => ({
            fields: state.fields.map(f => (f.id === fieldId ? { ...f, ...update } : f)),
        })),
    removeField: fieldId =>
        set(state => ({
            fields: state.fields.filter(f => f.id !== fieldId),
        })),
}));

export function useFieldsBySigner(signerId: string): Field[] {
    return useFieldStore(
        useShallow(state =>
            state.fields.filter(f => f.signerId === signerId).sort((a, b) => a.order - b.order)
        )
    );
}
