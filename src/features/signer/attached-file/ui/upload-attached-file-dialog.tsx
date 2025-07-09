import { Paperclip } from 'lucide-react';

import { useAddAttachedFile, useDeleteAttachedFile } from '@/entities/contract';
import { useSignerStore } from '@/entities/signer/model/stores';
import { useOverlay } from '@/shared/lib';
import { Button, Confirm, Dialog, Input, Label } from '@/shared/ui';

function UploadAttachedFileDialog({
    contarctId,
    signerId,
    footer,
}: {
    contarctId: string;
    signerId: string;
    footer?: React.ReactNode;
}) {
    const files = useSignerStore(
        state => state.signers.find(s => s.id === signerId)?.attachedFiles
    );
    const addAttachment = useAddAttachedFile();
    const deleteAttachment = useDeleteAttachedFile();
    const { open } = useOverlay();
    const handleAddAttachment = ({
        e,
        id,
    }: {
        e: React.ChangeEvent<HTMLInputElement>;
        id: string;
    }) => {
        const file = e.target.files?.[0];
        if (!file) return;

        addAttachment.mutate(
            {
                contractId: contarctId,
                signerId,
                fileId: id,
                file,
            },
            {
                onSuccess: data => {
                    const updateAttachment = useSignerStore.getState().updateAttachment;
                    updateAttachment({
                        signerId,
                        attachmentId: id,
                        fileId: data,
                        name: file.name,
                    });
                },
            }
        );
    };

    const handleDeleteAttachment = ({ id }: { id: string }) => {
        open(
            <Confirm
                title="첨부파일 삭제"
                description="첨부파일을 삭제하시겠습니까?"
                onAction={() => {
                    deleteAttachment.mutate(
                        {
                            contractId: contarctId,
                            signerId,
                            fileId: id,
                        },
                        {
                            onSuccess: () => {
                                const updateAttachment = useSignerStore.getState().updateAttachment;
                                updateAttachment({
                                    signerId,
                                    attachmentId: id,
                                    fileId: undefined,
                                    name: undefined,
                                });
                            },
                        }
                    );
                }}
            />
        );
    };

    return (
        <Dialog
            title="파일 첨부"
            footer={footer}
            content={
                <>
                    {files &&
                        files.map(file => (
                            <div
                                key={file.id}
                                className="border rounded-lg p-4 flex flex-col md:flex-row justify-between bg-[#f8f8f8] gap-3"
                            >
                                <div className="flex flex-col gap-3 flex-1 min-w-0 md:border-b-0 md:border-r md:pr-2">
                                    <div className="flex items-center gap-2">
                                        <Paperclip className="w-5 h-5 text-gray-500" />
                                        <div className="font-semibold text-lg">{file.label}</div>
                                        {file.required && (
                                            <div className="bg-red-200 font-bold text-xs px-2 py-0.5 rounded-full">
                                                필수
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-xs text-gray-500 ">{file.description}</div>
                                </div>
                                <div className="flex flex-col md:flex-col items-center gap-2 w-full md:w-auto justify-center">
                                    {file.fileId && (
                                        <>
                                            <span className="text-xs break-all w-full md:w-auto md:truncate md:max-w-[100px]">
                                                {file.name}
                                            </span>
                                            <Button
                                                className="text-xs px-4 py-0 rounded w-full md:w-auto h-[30px]"
                                                onClick={() =>
                                                    handleDeleteAttachment({ id: file.id })
                                                }
                                            >
                                                취소
                                            </Button>
                                        </>
                                    )}
                                    {!file.fileId && (
                                        <>
                                            <Button className="p-0 h-[30px] rounded w-full md:w-auto">
                                                <Label
                                                    className="px-4 py-2 w-full h-full text-xs cursor-pointer"
                                                    htmlFor={`file-${file.id}`}
                                                >
                                                    첨부하기
                                                </Label>
                                                <Input
                                                    className="hidden"
                                                    type="file"
                                                    id={`file-${file.id}`}
                                                    onChange={e =>
                                                        handleAddAttachment({ e, id: file.id })
                                                    }
                                                />
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                </>
            }
        />
    );
}

export { UploadAttachedFileDialog };
