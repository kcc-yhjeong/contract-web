import { useRef } from 'react';

import { TemplateSearchParams } from '@/entities/template';
import { Button, Input } from '@/shared/ui';

export function TemplateListCondition({
    search,
}: {
    search: (filters: Partial<TemplateSearchParams>) => void;
}) {
    const nameRef = useRef<HTMLInputElement>(null);

    const handleSearch = () => {
        search({ name: nameRef.current?.value ?? '' });
    };

    return (
        <div className="flex items-center gap-2">
            <Input
                ref={nameRef}
                type="text"
                placeholder="템플릿명"
                className="h-9 w-[200px]"
                onEnter={handleSearch}
            />
            <Button onClick={handleSearch}>검색</Button>
        </div>
    );
}
