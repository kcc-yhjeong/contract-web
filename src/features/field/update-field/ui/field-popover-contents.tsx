import { AlignCenter, AlignLeft, AlignRight } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';

import { Field, FieldType } from '@/entities/field';
import { Label } from '@/shared/ui';
import {
    Input,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Switch,
    ToggleGroup,
    ToggleGroupItem,
} from '@/shared/ui';

const wrapperClassName =
    'grid grid-cols-[45px_1fr_45px_1fr] gap-y-4 gap-x-3 w-full border-b border-t pt-6 pb-6 pl-3 pr-3';

interface ColumnProps {
    label: string;
    type?: string;
    inputColSpan?: number;
    children?: React.ReactNode;
    name?: string;
}

function Column({ label, type = 'text', inputColSpan, children, name }: ColumnProps) {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <>
            <Label htmlFor={label} className="flex items-center text-xs">
                {label}
            </Label>
            <div className={`flex items-center col-span-${inputColSpan ?? 1}`}>
                {children ? (
                    children
                ) : (
                    <div className="w-full">
                        <Input
                            id={label}
                            type={type}
                            maxLength={20}
                            className={`h-[30px] w-full text-xs ${errors[name!] ? 'border-red-500' : ''}`}
                            {...(name
                                ? register(name, {
                                      setValueAs: value =>
                                          type === 'number' ? Number(value) : value,
                                  })
                                : {})}
                        />
                        {errors[name!] && (
                            <span className="text-xs text-red-500 mt-1">
                                {errors[name!]?.message as string}
                            </span>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}

function FontColumn() {
    const { control, register } = useFormContext();
    return (
        <div className="flex gap-1">
            <Controller
                name="fontSize"
                control={control}
                render={({ field }) => (
                    <Select
                        onValueChange={value => field.onChange(Number(value))}
                        value={field.value?.toString()}
                    >
                        <SelectTrigger className="h-[30px] w-[80px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {Array.from({ length: 10 }, (_, i) => (
                                <SelectItem key={i} value={`${5 + i}`}>
                                    {5 + i}px
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
            />
            <Input
                type="color"
                className="w-[20px] h-[30px] border-none p-0 cursor-pointer"
                {...register('fontColor')}
            />
        </div>
    );
}

function AlignColumn() {
    const { watch, setValue } = useFormContext();
    const textAlign = watch('textAlign');
    return (
        <div className="flex">
            <ToggleGroup
                type="single"
                className="border rounded-md p-0"
                value={textAlign}
                onValueChange={value => setValue('textAlign', value as 'left' | 'center' | 'right')}
            >
                <ToggleGroupItem value="left" className="h-[30px] p-0 min-w-[30px]">
                    <AlignLeft />
                </ToggleGroupItem>
                <ToggleGroupItem value="center" className="h-[30px] p-0 min-w-[30px]">
                    <AlignCenter />
                </ToggleGroupItem>
                <ToggleGroupItem value="right" className="h-[30px] p-0 min-w-[30px]">
                    <AlignRight />
                </ToggleGroupItem>
            </ToggleGroup>
        </div>
    );
}

function SwitchColumn({ name }: { name: string }) {
    const { control } = useFormContext();
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <Switch checked={field.value} onCheckedChange={field.onChange} />
            )}
        />
    );
}

const COLUMNS = {
    x: {
        label: 'x좌표',
        type: 'number',
        name: 'x',
    },
    y: {
        label: 'y좌표',
        type: 'number',
        name: 'y',
    },
    width: {
        label: '너비',
        type: 'number',
        name: 'width',
    },
    height: {
        label: '높이',
        type: 'number',
        name: 'height',
    },
    label: {
        label: '라벨명',
        type: 'text',
        inputColSpan: 3,
        name: 'label',
    },
    apiKey: {
        label: 'API ID',
        type: 'text',
        inputColSpan: 3,
        name: 'apiKey',
    },
    font: {
        label: '폰트',
        children: <FontColumn />,
    },
    align: {
        label: '정렬',
        children: <AlignColumn />,
    },
    required: {
        label: '필수여부',
        children: <SwitchColumn name="required" />,
    },
    editable: {
        label: '입력허용',
        children: <SwitchColumn name="editable" />,
    },
    lineBreak: {
        label: '줄바꿈',
        children: <SwitchColumn name="lineBreak" />,
    },
} as const;

const FIELD_TYPE_COLUMNS: Record<FieldType, ColumnProps[]> = {
    text: [COLUMNS.label, COLUMNS.apiKey, COLUMNS.font, COLUMNS.align],
    sign: [COLUMNS.label, COLUMNS.apiKey],
    checkbox: [COLUMNS.label, COLUMNS.apiKey],
    radio: [COLUMNS.label, COLUMNS.apiKey],
};

function FieldInfoContent({ field }: { field: Field }) {
    const columns = FIELD_TYPE_COLUMNS[field.type];

    return (
        <div className={wrapperClassName}>
            {columns.map((column, index) => (
                <Column key={index} {...column} />
            ))}
            {field.type === 'text' && (
                <div className="col-span-4 flex gap-2 justify-between">
                    <Column label="필수여부" children={<SwitchColumn name="required" />} />
                    <Column label="입력허용" children={<SwitchColumn name="editable" />} />
                    <Column label="줄바꿈" children={<SwitchColumn name="lineBreak" />} />
                </div>
            )}
        </div>
    );
}

function FieldStyleContent() {
    return (
        <div className={wrapperClassName}>
            <Column label="x좌표" type="number" name="x" />
            <Column label="y좌표" type="number" name="y" />
            <Column label="너비" type="number" name="width" />
            <Column label="높이" type="number" name="height" />
        </div>
    );
}

export { FieldInfoContent, FieldStyleContent };
