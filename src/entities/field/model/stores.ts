import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';
import { useShallow } from 'zustand/shallow';

import { FIELD_META } from './constants';
import { Field, FieldStore, FollowinguseFieldStore, SignField } from './types';

export const useFieldStore = create<FieldStore>(set => ({
    fields: [],
    setFields: fields => set({ fields }),
    addField: ({
        type,
        signerId,
        page,
        x,
        y,
    }: Pick<Field, 'type' | 'signerId' | 'page' | 'x' | 'y'>) =>
        set(state => {
            const id = uuidv4();

            const field: Field = {
                id,
                type,
                signerId,
                page,
                x,
                y,
                order: state.fields.length + 1,
                apiKey: '',
                inputName: id,
                ...FIELD_META[type].defaultValue,
            };

            return {
                fields: [...state.fields, field],
            };
        }),
    updateField: (fieldId, update) =>
        set(state => ({
            fields: state.fields.map(f => (f.id === fieldId ? { ...f, ...update } : f)),
        })),
    copyField: fieldId =>
        set(state => {
            const fieldToCopy = state.fields.find(f => f.id === fieldId);
            if (!fieldToCopy) return state;

            const newField = {
                ...fieldToCopy,
                id: uuidv4(),
                value: FIELD_META[fieldToCopy.type].defaultValue.value,
                x: fieldToCopy.x + 15,
                y: fieldToCopy.y + 15,
                ...(fieldToCopy.type === 'radio' && {
                    inputName: fieldToCopy.inputName,
                }),
            };

            return {
                fields: [...state.fields, newField],
            };
        }),
    setSignField: ({
        signerId,
        fieldId,
        imageId,
    }: {
        signerId?: string;
        fieldId?: string;
        imageId: string;
    }) =>
        set(state => ({
            fields: state.fields.map(f =>
                (!fieldId || f.id === fieldId) &&
                (!signerId || f.signerId === signerId) &&
                f.type === 'sign'
                    ? { ...f, imageId: imageId }
                    : f
            ),
        })),
    deleteField: fieldId =>
        set(state => ({
            fields: state.fields.filter(f => f.id !== fieldId),
        })),
    deleteFieldsBySigner: (signerId: string) =>
        set(state => ({
            fields: state.fields.filter(f => f.signerId !== signerId),
        })),
    checkRadioField: (id, inputName) =>
        set(state => ({
            fields: state.fields.map(f =>
                f.inputName === inputName ? { ...f, value: id === f.id } : f
            ),
        })),
}));

export const useFollowinguseFieldStore = create<FollowinguseFieldStore>(set => ({
    type: null,
    signerId: null,
    setFollowingField: (type, signerId) => set({ type, signerId }),
    clearFollowingField: () => set({ type: null, signerId: null }),
}));

export const useFieldsBySigner = (signerId: string, type?: string) => {
    return useFieldStore(
        useShallow(state =>
            state.fields
                .filter(f => f.signerId === signerId && (type ? f.type === type : true))
                .sort((a, b) => (a.order || 0) - (b.order || 0))
        )
    );
};

export const useFieldIdsByPage = (page: number) => {
    return useFieldStore(
        useShallow(state => state.fields.filter(f => f.page === page).map(f => f.id))
    );
};

export const useIsImageUsedInSignFields = ({
    fieldId,
    imageId,
}: {
    fieldId: string;
    imageId: string;
}) => {
    return useFieldStore(
        useShallow(state =>
            state.fields.some(
                f =>
                    f.type === 'sign' && f.id !== fieldId && (f as SignField).signFileId === imageId
            )
        )
    );
};
