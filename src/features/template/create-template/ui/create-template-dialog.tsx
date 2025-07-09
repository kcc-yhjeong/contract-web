import { useState } from 'react';
import { useRef } from 'react';

import { useNavigate } from 'react-router-dom';

import { useCreateTemplate } from '@/entities/template/model/queries';
import { useOverlay } from '@/shared/lib';
import { Button, Dialog, InputDndFile, type InputDndFileProps } from '@/shared/ui';

function CreateTemplateDialogContent({ ref, onFileDelete, onFileSelect }: InputDndFileProps) {
    return <InputDndFile ref={ref} onFileSelect={onFileSelect} onFileDelete={onFileDelete} />;
}

function CreateTemplateDialogFooter({
    ref,
    disabled = true,
}: {
    ref: React.RefObject<HTMLInputElement>;
    disabled?: boolean;
}) {
    const navigate = useNavigate();
    const { close } = useOverlay();
    const { mutate: createTemplate } = useCreateTemplate();

    const handleNavigate = () => {
        const file = ref.current?.files?.[0];

        if (file) {
            createTemplate(
                {
                    template: {
                        name: file.name.replace(/\.[^/.]+$/, ''), //확장자 제거
                    },
                    file,
                },
                {
                    onSuccess: response => {
                        navigate(`/template/edit/${response.id}`);
                        close();
                    },
                }
            );
        }
    };

    return (
        <Button onClick={handleNavigate} disabled={disabled}>
            생성
        </Button>
    );
}

function CreateTemplateDialog() {
    const fileRef = useRef<HTMLInputElement>({} as HTMLInputElement);
    const [disabled, setDisabled] = useState(true);

    return (
        <Dialog
            title="템플릿 생성"
            content={
                <CreateTemplateDialogContent
                    ref={fileRef}
                    onFileSelect={() => setDisabled(false)}
                    onFileDelete={() => setDisabled(true)}
                />
            }
            footer={<CreateTemplateDialogFooter ref={fileRef} disabled={disabled} />}
        />
    );
}

export { CreateTemplateDialog };
