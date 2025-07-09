import { Circle } from 'lucide-react';

import { Field, Mode, useFieldStore } from '@/entities/field';

interface Props {
    className: string;
    field: Field;
    mode: Mode;
    scale: number;
}

export function RndRadioField({ className, field, mode, scale }: Props) {
    const isSigner = mode === 'sign';
    const isTemplate = mode === 'template';
    const checkRadioField = useFieldStore(state => state.checkRadioField);

    return (
        <div
            className={`${className} cursor-pointer rounded-full`}
            style={{
                cursor: isSigner || isTemplate ? 'pointer' : 'default',
                borderWidth: `${2 * scale}px`,
            }}
            onClick={() => isSigner && checkRadioField(field.id, field.inputName)}
        >
            {field.value && <Circle fill="black" className="w-full h-full" />}
        </div>
    );
}
