import { Mode, TextField, useFieldStore } from '@/entities/field';

interface Props {
    field: TextField;
    className: string;
    scale: number;
    mode: Mode;
}

export function RndTextField({ field, className, scale, mode }: Props) {
    const isSigner = mode === 'sign';
    const isTemplate = mode === 'template';
    const updateField = useFieldStore(state => state.updateField);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!isSigner || !field.editable) return;
        updateField(field.id, { ...field, value: e.target.value });
    };
    const props = {
        className: `${className}  [&::-webkit-scrollbar]:hidden resize-none`,
        readOnly: !field.editable || !isSigner,
        placeholder: isSigner || isTemplate ? field.label : '',
        style: {
            fontSize: `${field.fontSize * scale}px`,
            borderWidth: `${2 * scale}px`,
            textAlign: field.textAlign,
            color: field.fontColor,
            padding: '3px',
            cursor: isTemplate ? 'pointer' : 'auto',
        },
        defaultValue: field.value as string,
        onChange: handleChange,
    };

    return (
        <div>{field.lineBreak ? <textarea {...props} /> : <input type="text" {...props} />}</div>
    );
}
