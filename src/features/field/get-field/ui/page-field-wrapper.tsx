import { memo } from 'react';

import { useFieldIdsByPage } from '@/entities/field';
import { RndField } from '@/features/field/rnd-field';

function PageFieldWrapper({ page }: { page: number }) {
    const fieldIds = useFieldIdsByPage(page);

    return (
        <div className="absolute ">
            {fieldIds.map(fieldId => (
                <RndField key={fieldId} id={fieldId} />
            ))}
        </div>
    );
}

export default memo(PageFieldWrapper, (prev, next) => prev.page === next.page);
