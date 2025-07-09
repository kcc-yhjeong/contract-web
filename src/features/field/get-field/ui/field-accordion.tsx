import { memo, useState } from 'react';

import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';

import { FIELD_META, useFieldsBySigner } from '@/entities/field';
import { FieldType } from '@/entities/field/model/types';

function FieldAccordion({
    signerId,
    type,
    onHeaderClick,
    onFieldClick,
}: {
    signerId: string;
    type: FieldType;
    onHeaderClick?: ({
        signerId,
        type,
        e,
    }: {
        signerId: string;
        type: FieldType;
        e: React.MouseEvent<HTMLDivElement>;
    }) => void;
    onFieldClick?: ({
        fieldId,
        e,
    }: {
        fieldId: string;
        e: React.MouseEvent<HTMLDivElement>;
    }) => void;
}) {
    const [open, setOpen] = useState(false);

    const fields = useFieldsBySigner(signerId, type);

    const Icon = FIELD_META[type].icon;
    const label = FIELD_META[type].label;
    
    const handleToggle = (e: React.MouseEvent<HTMLDivElement>) => {
        if (fields.length === 0) return;
        e.stopPropagation();
        setOpen(prev => !prev);
    };
    return (
        <div className="rounded border bg-white">
            <div
                className={clsx(
                    'flex items-center pl-3  cursor-pointer select-none justify-between',
                    open ? 'bg-gray-100' : 'hover:bg-gray-50'
                )}
                onClick={e => onHeaderClick?.({ signerId, type, e })}
            >
                <div className="flex items-center py-2">
                    <button className="mr-2" type="button">
                        <Icon size={20} />
                    </button>
                    <span className="flex-1 text-sm">
                        {label} ({fields.length})
                    </span>
                </div>
                <div className="p-3" onClick={handleToggle}>
                    <ChevronDown
                        size={18}
                        className={
                            'transition-transform duration-200 ' + (open ? 'rotate-180' : '')
                        }
                    />
                </div>
            </div>
            {open && (
                <div className="bg-gray-50 text-sm cursor-pointer">
                    {fields.map(field => (
                        <div
                            className="border-b p-3 truncate"
                            key={field.id}
                            onClick={e => {
                                onFieldClick?.({ fieldId: field.id, e });
                            }}
                        >
                            [{field.page}페이지] {field.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default memo(FieldAccordion);
