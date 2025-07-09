import { useEffect, useMemo, useRef } from 'react';

import { Move, Settings } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';

import { Field, TextField, useFieldStore } from '@/entities/field';
import { INDEX_TO_KR, useSignerOrder } from '@/entities/signer';
import { useActiveFieldStore } from '@/features/field/rnd-field';
import { isInRange, isNumber, useOverlay } from '@/shared/lib';
import {
    Alert,
    Button,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/shared/ui';

import { FieldInfoContent, FieldStyleContent } from './field-popover-contents';

interface ValidationError {
    title: string;
    description: string;
}

const validateFieldForm = (data: Field): ValidationError | null => {
    if (data.label.length > 20 || data.apiKey.length > 20) {
        return {
            title: '라벨명과 API ID는 20자 이하만 입력이 가능합니다.',
            description: '라벨명 또는 API ID를 확인해 주세요',
        };
    }

    const styles = [
        { value: data.x, name: 'x 좌표' },
        { value: data.y, name: 'y 좌표' },
        { value: data.width, name: '너비' },
        { value: data.height, name: '높이' },
    ];

    for (const { value, name } of styles) {
        if (!isNumber(value) || !isInRange(value, 0, 2000)) {
            return {
                title: `${name}는 0 ~ 2000 사이의 숫자만 입력이 가능합니다.`,
                description: `${name}를 확인해 주세요.`,
            };
        }
    }

    return null;
};

export function FieldPopover({
    anchorRef,
    field,
    isActive,
}: {
    anchorRef: React.RefObject<HTMLDivElement | null>;
    field: Field;
    isActive: boolean;
}) {
    const { open: alertOpen, isOpen } = useOverlay();
    const signerOrder = useSignerOrder(field.signerId);
    const setActiveFieldId = useActiveFieldStore(state => state.setActiveFieldId);
    const updateField = useFieldStore(state => state.updateField);
    const deleteField = useFieldStore(state => state.deleteField);
    const copyField = useFieldStore(state => state.copyField);

    const popoverContentRef = useRef<HTMLDivElement | null>(null);

    const defaultValues = useMemo(() => {
        return {
            label: field.label,
            apiKey: field.apiKey,
            required: field.required,
            x: field.x,
            y: field.y,
            width: field.width,
            height: field.height,
            editable: (field as TextField).editable,
            fontSize: (field as TextField).fontSize,
            fontColor: (field as TextField).fontColor,
            textAlign: (field as TextField).textAlign,
            lineBreak: (field as TextField).lineBreak,
        };
    }, [field]);

    const methods = useForm<Field>({
        defaultValues: defaultValues,
    });

    useEffect(() => {
        if (isActive) {
            methods.reset(defaultValues);
        }
    }, [isActive, defaultValues, methods]);

    useEffect(() => {
        if (!isActive) return;
        function handleDocumentClick(e: MouseEvent) {
            if (
                (anchorRef.current && anchorRef.current.contains(e.target as Node)) ||
                (popoverContentRef.current &&
                    popoverContentRef.current.contains(e.target as Node)) ||
                isOpen
            ) {
                return;
            }
            setActiveFieldId(null);
        }
        document.addEventListener('mousedown', handleDocumentClick);
        return () => document.removeEventListener('mousedown', handleDocumentClick);
    }, [isActive, anchorRef, setActiveFieldId, isOpen]);

    const onSave = (data: Field) => {
        const error = validateFieldForm(data);
        if (error) {
            alertOpen(<Alert type="error" title={error.title} description={error.description} />);
            return;
        }

        updateField(field.id, {
            ...field,
            ...data,
        });
        setActiveFieldId(null);
    };

    const onDelete = () => {
        deleteField(field.id);
        setActiveFieldId(null);
    };

    const onCopy = () => {
        copyField(field.id);
        setActiveFieldId(null);
    };

    return (
        <Popover open={isActive}>
            <PopoverTrigger asChild>
                <div ref={anchorRef} className="w-full h-full" data-popover-field-id={field.id} />
            </PopoverTrigger>
            <PopoverContent
                ref={popoverContentRef}
                className={`mt-3 rounded-lg border bg-white p-4 shadow-md w-full border-t-[3px] border-t-signer-${signerOrder}`}
            >
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSave)}>
                        <Tabs defaultValue="info">
                            <div className="w-[350px]">
                                <header className="pb-2 mt-1 h-[30px] flex justify-between items-center">
                                    <h4 className="font-medium leading-none">
                                        {INDEX_TO_KR[signerOrder as keyof typeof INDEX_TO_KR]}{' '}
                                        서명자
                                    </h4>
                                    <TabsList className="bg-none h-[30px]">
                                        <TabsTrigger value="info" className="h-[25px]">
                                            <Settings width={15} height={15} />
                                        </TabsTrigger>
                                        <TabsTrigger value="style">
                                            <Move width={15} height={15} />
                                        </TabsTrigger>
                                    </TabsList>
                                </header>
                                <TabsContent value="style">
                                    <FieldStyleContent />
                                </TabsContent>
                                <TabsContent value="info">
                                    <FieldInfoContent field={field} />
                                </TabsContent>
                            </div>
                            <footer className="mt-3 flex justify-between">
                                <Button type="button" variant={'outline'} onClick={onDelete}>
                                    삭제
                                </Button>
                                <Button type="button" variant={'outline'} onClick={onCopy}>
                                    복제
                                </Button>
                                <Button type="submit">저장</Button>
                            </footer>
                        </Tabs>
                    </form>
                </FormProvider>
            </PopoverContent>
        </Popover>
    );
}
