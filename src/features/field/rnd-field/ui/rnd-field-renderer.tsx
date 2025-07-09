// components/field/render-field-by-type.tsx

import { Field, FIELD_TYPE, Mode, TextField } from '@/entities/field';

import { RndCheckboxField } from './rnd-checkbox-field';
import { RndRadioField } from './rnd-radio-field';
import { RndSignField } from './rnd-sign-field';
import { RndTextField } from './rnd-text-field';

type Props = {
    field: Field;
    className: string;
    scale: number;
    mode: Mode;
};

export function RndFieldRenderer({ field, className, scale, mode }: Props) {
    switch (field.type) {
        case FIELD_TYPE.TEXT: {
            return (
                <RndTextField
                    className={className}
                    field={field as TextField}
                    scale={scale}
                    mode={mode}
                />
            );
        }
        case FIELD_TYPE.RADIO: {
            return <RndRadioField className={className} field={field} mode={mode} scale={scale} />;
        }
        case FIELD_TYPE.CHECKBOX: {
            return (
                <RndCheckboxField className={className} field={field} mode={mode} scale={scale} />
            );
        }
        case FIELD_TYPE.SIGN: {
            return <RndSignField className={className} field={field} mode={mode} scale={scale} />;
        }
        default:
            return null;
    }
}
