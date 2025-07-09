import { useNavigate } from 'react-router-dom';

import { useUpdateTemplate } from '@/entities/template';
import { useOverlay } from '@/shared/lib';
import { Button } from '@/shared/ui';
import { Confirm } from '@/shared/ui';
import { getMergedEditor } from '@/widgets/editor-layout';

export function TemplateFooter() {
    const navigate = useNavigate();
    const updateTemplate = useUpdateTemplate();
    const { open } = useOverlay();

    const save = () => {
        const { template } = getMergedEditor();
        updateTemplate.mutate(
            { template },
            {
                onSuccess: () => {
                    navigate('/template');
                },
            }
        );
    };

    const back = () => {
        navigate('/template');
    };

    return (
        <div className="flex gap-2">
            <Button variant={'outline'} size={'lg'} onClick={back}>
                취소
            </Button>
            <Button
                size={'lg'}
                onClick={() => {
                    open(
                        <Confirm
                            title="템플릿 저장"
                            description="저장하시겠습니까?"
                            onAction={save}
                        />
                    );
                }}
            >
                저장
            </Button>
        </div>
    );
}
