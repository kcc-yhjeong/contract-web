import { memo, useEffect, useRef, useState } from 'react';

import { Move } from 'lucide-react';
import { Rnd } from 'react-rnd';
import { useLocation } from 'react-router-dom';

import { Mode, useFieldStore } from '@/entities/field';
import { useSignerOrder } from '@/entities/signer';
import { FieldPopover } from '@/features/field/update-field';
import { useScaleStore, Z_INDEX_CLASS } from '@/shared/model';

import { FieldTooltip } from '../../get-field/ui/field-tooltip';
import { RESIZE_HANDLE_STYLE } from '../model/resize-handle-style';
import { useActiveFieldStore } from '../model/use-active-field-store';
import { RndFieldRenderer } from './rnd-field-renderer';

function DragHandle() {
    return (
        <div className="w-[15px] h-[15px] absolute top-[-22px] right-[-22px] flex items-center justify-center drag-handle border-[1px] border-dotted border-black cursor-pointer">
            <Move className="w-[15px] h-[15px] " />
        </div>
    );
}

function RndField({ id }: { id: string }) {
    const location = useLocation();
    const scale = useScaleStore(state => state.scale);
    const field = useFieldStore(state => state.fields.find(f => f.id === id));
    const signerOrder = useSignerOrder(field?.signerId ?? '');
    const activeFieldId = useActiveFieldStore(state => state.activeFieldId);
    const setActiveFieldId = useActiveFieldStore(state => state.setActiveFieldId);
    const updateField = useFieldStore(state => state.updateField);

    const [mode, setMode] = useState<Mode>('template');

    const isActive = activeFieldId === id;

    const rndRef = useRef<HTMLDivElement | null>(null);
    const fieldPopoverTriggerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const pathname = location.pathname;

        if (pathname.startsWith('/template/')) {
            setMode('template');
        } else if (pathname.startsWith('/contract/')) {
            const pathParts = pathname.split('/').filter(Boolean);
            const signerId = pathParts[2];

            if (signerId && field?.signerId === signerId) {
                setMode('sign');
            } else {
                setMode('view');
            }
        } else {
            setMode('view');
        }
    }, [location.pathname, field?.signerId]);

    useEffect(() => {
        if (isActive) {
            fieldPopoverTriggerRef.current?.focus();
        }
    }, [isActive]);

    useEffect(() => {
        if (mode === 'template') return;

        const handleClickOutside = (event: MouseEvent) => {
            if (
                isActive &&
                fieldPopoverTriggerRef.current &&
                !fieldPopoverTriggerRef.current.contains(event.target as Node)
            ) {
                setActiveFieldId(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isActive, setActiveFieldId, mode]);

    const fieldClassName = {
        template: `w-full h-full absolute border-[2px] border-signer-${signerOrder} bg-signer-${signerOrder} bg-opacity-50`,
        sign: `w-full h-full absolute border-[2px] ${
            field?.required ? 'border-signer-required' : 'border-signer-normal'
        } bg-signer-normal bg-opacity-50`,
        view: `w-full h-full absolute border-none bg-transparent`,
    };

    const multiple = (number: number) => {
        return Math.round(number * scale);
    };

    const divide = (number: number) => {
        return Math.round(number / scale);
    };

    if (!field) return null;

    const openFieldPopover = () => {
        if (mode === 'template') {
            setActiveFieldId(field.id);
        }
    };

    return (
        <Rnd
            className={`${Z_INDEX_CLASS.NORMAL}`}
            dragHandleClassName="drag-handle"
            resizeHandleStyles={RESIZE_HANDLE_STYLE}
            enableResizing={mode === 'template' && activeFieldId === field.id}
            position={{
                x: multiple(field.x),
                y: multiple(field.y),
            }}
            size={{
                width: multiple(field.width),
                height: multiple(field.height),
            }}
            onDragStop={(e, data) => {
                updateField(field.id, {
                    ...field,
                    x: divide(data.x),
                    y: divide(data.y),
                });
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
                updateField(field.id, {
                    ...field,
                    width: divide(Number(ref.style.width.replace('px', ''))),
                    height: divide(Number(ref.style.height.replace('px', ''))),
                    x: divide(position.x),
                    y: divide(position.y),
                });
            }}
        >
            <div tabIndex={-1} ref={fieldPopoverTriggerRef} onClick={openFieldPopover}>
                <RndFieldRenderer
                    className={fieldClassName[mode]}
                    field={field}
                    scale={scale}
                    mode={mode}
                />
            </div>
            {mode === 'template' && (
                <>
                    <DragHandle />
                    <FieldPopover field={field} anchorRef={rndRef} isActive={isActive} />
                </>
            )}
            {mode === 'sign' && (
                <FieldTooltip field={field} anchorRef={rndRef} isActive={isActive} />
            )}
        </Rnd>
    );
}

export default memo(RndField);
