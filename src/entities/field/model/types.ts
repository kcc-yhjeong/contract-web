export type FieldType = 'text' | 'radio' | 'checkbox' | 'sign';

export interface Field {
    id: string;
    page: number;
    inputName: string;
    type: FieldType;
    apiKey: string;
    signerId: string;
    signerOrder: number;
    label: string;
    x: number;
    y: number;
    width: number;
    height: number;
    required: boolean;
    lineBreak: boolean;
    fontSize: number;
    textAlign: 'left' | 'center' | 'right';
    editable: boolean;
    fontColor: string;
    value: string | null;
    order: number;
    signFileId?: string;
}

export interface FieldStore {
    fields: Field[];
    setFields: (fields: Field[]) => void;
    addField: (field: Field) => void;
    updateField: (fieldId: string, update: Partial<Field>) => void;
    removeField: (fieldId: string) => void;
}
