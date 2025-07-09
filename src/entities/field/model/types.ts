export type FieldType = 'text' | 'sign' | 'checkbox' | 'radio';
export type TextAlign = 'left' | 'center' | 'right';
export type Mode = 'template' | 'sign' | 'view';

export interface Field {
    id: string;
    page: number;
    inputName: string;
    type: FieldType;
    apiKey: string;
    signerId: string;
    label: string;
    x: number;
    y: number;
    width: number;
    height: number;
    required: boolean;
    value: string | boolean | null;
    order: number;
}

export interface TextField extends Field {
    fontSize: number;
    textAlign: TextAlign;
    fontColor: string;
    editable: boolean;
    lineBreak: boolean;
}

export interface SignField extends Field {
    signFileId?: string;
    imageId?: string;
}
export interface FieldStore {
    fields: Field[];
    setFields: (fields: Field[]) => void;
    addField: (field: Pick<Field, 'type' | 'signerId' | 'page' | 'x' | 'y'>) => void;
    updateField: (fieldId: string, update: Partial<Field>) => void;
    setSignField: ({
        signerId,
        fieldId,
        imageId,
    }: {
        signerId?: string;
        fieldId?: string;
        imageId: string;
    }) => void;
    copyField: (fieldId: string) => void;
    deleteField: (fieldId: string) => void;
    deleteFieldsBySigner: (signerId: string) => void;
    checkRadioField: (id: string, inputName: string) => void;
}

export interface FollowinguseFieldStore {
    type: FieldType | null;
    signerId: string | null;
    setFollowingField: (type: FieldType | null, signerId: string | null) => void;
    clearFollowingField: () => void;
}
