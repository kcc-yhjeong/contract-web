import { Field } from '@/entities/field';
import { useActiveFieldStore } from '@/features/field/rnd-field';
import { useScaleStore } from '@/shared/model';

export function FieldTooltip({
    anchorRef,
    field,
    isActive,
}: {
    anchorRef: React.RefObject<HTMLDivElement | null>;
    field: Field;
    isActive: boolean;
}) {
    const setActiveFieldId = useActiveFieldStore(state => state.setActiveFieldId);
    const scale = useScaleStore(state => state.scale);
    const label = `[${field?.required ? '필수' : '선택'}] ${field?.label}`;

    const handleMouseLeave = () => {
        setActiveFieldId(null);
    };

    return (
        <div>
            <div ref={anchorRef} onMouseLeave={handleMouseLeave} />
            {isActive && (
                <div
                    className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50"
                    style={{
                        transform: `translateX(-50%) scale(${scale})`,
                        transformOrigin: 'bottom center',
                    }}
                >
                    <div className="bg-white border border-gray-300 shadow-lg rounded px-3 py-2 text-sm text-black whitespace-nowrap">
                        {label}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                    </div>
                </div>
            )}
        </div>
    );
}
