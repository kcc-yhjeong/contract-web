import { PlusIcon } from 'lucide-react';

import { CreateTemplateDialog } from '@/features/template/create-template';
import { TemplateList } from '@/features/template/template-list';
import { useOverlay } from '@/shared/lib';
import { Button } from '@/shared/ui';

export function TemplateManagement() {
    const { open } = useOverlay();
    return (
        <>
            <div className="px-4 lg:px-6 space-y-4">
                <div className="flex justify-end">
                    <Button
                        size="sm"
                        onClick={() => {
                            open(<CreateTemplateDialog />);
                        }}
                    >
                        <PlusIcon />
                        <span>템플릿 생성</span>
                    </Button>
                </div>
                <TemplateList />
            </div>
        </>
    );
}
