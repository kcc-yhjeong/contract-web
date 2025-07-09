import { useState } from 'react';

import { Trash2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

import { useSignerStore } from '@/entities/signer';
import { AttachedFile } from '@/entities/signer';
import { useOverlay } from '@/shared/lib';
import {
    CardContent,
    CardHeader,
    CardTitle,
    Dialog,
    Input,
    Label,
    Switch,
    Textarea,
} from '@/shared/ui';
import { Alert, Button, Card } from '@/shared/ui';

export function RequestAttachedFileDialog({ signerId }: { signerId: string }) {
    const { open: alertOpen, close: closeAlert } = useOverlay();

    const getDefaultAttachedFile = (): AttachedFile => {
        return {
            id: uuidv4(),
            label: '',
            description: '',
            required: false,
        };
    };

    const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>(() => {
        const existingFiles = useSignerStore
            .getState()
            .signers.find(signer => signer.id === signerId)?.attachedFiles;

        return (
            existingFiles?.map(file => ({
                id: file.id,
                label: file.label,
                description: file.description,
                required: file.required,
            })) || [getDefaultAttachedFile()]
        );
    });

    const addNewFile = () => {
        setAttachedFiles(prev => [...prev, getDefaultAttachedFile()]);
    };

    const deleteFile = (id: string) => {
        const newAttachedFiles = attachedFiles.filter(file => file.id !== id);
        if (newAttachedFiles.length === 0) {
            newAttachedFiles.push(getDefaultAttachedFile());
        }
        setAttachedFiles(newAttachedFiles);
    };

    const updateFile = (id: string, field: keyof AttachedFile, value: string | boolean) => {
        setAttachedFiles(prev =>
            prev.map(file => (file.id === id ? { ...file, [field]: value } : file))
        );
    };

    const validate = () => {
        for (const file of attachedFiles) {
            if (!file.label) {
                return '파일 종류를 입력해 주세요.';
            }
            if (file.label.length > 30) {
                return '파일 종류는 30자 이내로 입력해 주세요.';
            }
            if (file.description && file.description.length > 100) {
                return '추가 안내 사항은 100자 이내로 입력해 주세요.';
            }
        }
        return null;
    };

    const handleSave = () => {
        const error = validate();
        if (error) {
            alertOpen(<Alert type="error" title={error} />);
            return;
        }

        const setSigners = useSignerStore.getState().setSigners;
        const currentSigners = useSignerStore.getState().signers;

        const updatedSigners = currentSigners.map(signer =>
            signer.id === signerId
                ? {
                      ...signer,
                      attachedFiles: attachedFiles.map((file, index) => ({
                          ...file,
                          order: index + 1,
                      })),
                  }
                : signer
        );

        setSigners(updatedSigners);
        closeAlert();
    };

    return (
        <Dialog
            title="첨부파일 요청"
            content={
                <div className="flex flex-col gap-4 overflow-y-auto">
                    {attachedFiles.map((file, index) => (
                        <Card key={file.id} className="w-full">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="text-lg font-bold">
                                    파일 요청 {index + 1}
                                </CardTitle>
                                <Trash2
                                    className="cursor-pointer"
                                    size={20}
                                    onClick={() => {
                                        deleteFile(file.id);
                                    }}
                                />
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor={`label-${file.id}`}>파일 종류</Label>
                                        <Input
                                            id={`label-${file.id}`}
                                            value={file.label}
                                            maxLength={30}
                                            onChange={e =>
                                                updateFile(file.id, 'label', e.target.value)
                                            }
                                            placeholder="30자 이내로 입력"
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor={`description-${file.id}`}>
                                                추가 안내 사항
                                            </Label>
                                        </div>
                                        <Textarea
                                            id={`description-${file.id}`}
                                            className="resize-none"
                                            value={file.description}
                                            maxLength={100}
                                            onChange={e =>
                                                updateFile(file.id, 'description', e.target.value)
                                            }
                                            placeholder="100자 이내로 입력"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Label htmlFor={`required-${file.id}`}>필수</Label>
                                        <Switch
                                            checked={file.required}
                                            onCheckedChange={e =>
                                                updateFile(file.id, 'required', e)
                                            }
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    {attachedFiles?.length < 10 && (
                        <Button onClick={addNewFile} className="mx-auto w-[50%]">
                            +
                        </Button>
                    )}
                </div>
            }
            footer={<Button onClick={handleSave}>저장</Button>}
        />
    );
}
