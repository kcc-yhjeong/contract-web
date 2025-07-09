import { Check } from 'lucide-react';

import { Field, Mode, useFieldStore } from '@/entities/field';

interface Props {
    className: string;
    field: Field;
    mode: Mode;
    scale: number;
}

export function RndCheckboxField({ className, field, mode, scale }: Props) {
    const isSigner = mode === 'sign';
    const isTemplate = mode === 'template';
    const updateField = useFieldStore(state => state.updateField);
    return (
        <div
            className={`${className} cursor-pointer `}
            style={{
                cursor: isSigner || isTemplate ? 'pointer' : 'default',
                borderWidth: `${2 * scale}px`,
            }}
            onClick={() => isSigner && updateField(field.id, { ...field, value: !field.value })}
        >
            {field.value && <Check className="w-full h-full" />}
        </div>
    );
}
