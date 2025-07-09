import { Baseline, CircleCheck, Signature, SquareCheck } from 'lucide-react';

import { FieldType } from './types';

export const FIELD_TYPE: Record<Uppercase<FieldType>, FieldType> = {
    SIGN: 'sign',
    TEXT: 'text',
    CHECKBOX: 'checkbox',
    RADIO: 'radio',
};

export const FIELD_META = {
    [FIELD_TYPE.TEXT]: {
        icon: Baseline,
        label: '텍스트',
        defaultValue: {
            value: '',
            label: '텍스트',
            textAlign: 'center',
            fontColor: '#000000',
            fontSize: 8,
            editable: true,
            lineBreak: false,
            required: false,
            width: 100,
            height: 20,
        },
    },
    [FIELD_TYPE.SIGN]: {
        icon: Signature,
        label: '서명',
        defaultValue: {
            value: null,
            label: '서명',
            required: true,
            width: 150,
            height: 40,
        },
    },
    [FIELD_TYPE.CHECKBOX]: {
        icon: SquareCheck,
        label: '체크박스',
        defaultValue: {
            value: false,
            label: '체크박스',
            required: false,
            width: 15,
            height: 15,
        },
    },
    [FIELD_TYPE.RADIO]: {
        icon: CircleCheck,
        label: '라디오박스',
        defaultValue: {
            value: false,
            label: '라디오박스',
            required: true,
            width: 15,
            height: 15,
        },
    },
};
