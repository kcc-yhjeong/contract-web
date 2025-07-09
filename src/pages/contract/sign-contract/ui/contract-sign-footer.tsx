import { useCallback, useEffect, useState } from 'react';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { useSignContract } from '@/entities/contract';
import { Field, SignField, useFieldsBySigner } from '@/entities/field';
import { Signer, useSignerStore } from '@/entities/signer';
import { useActiveFieldStore } from '@/features/field/rnd-field';
import { UploadAttachedFileDialog } from '@/features/signer/attached-file';
import { useOverlay } from '@/shared/lib';
import { Alert, Button } from '@/shared/ui';
import { Confirm } from '@/shared/ui';

function ContractSignFooter({ contractId, signerId }: { contractId: string; signerId: string }) {
    const navigate = useNavigate();

    const { open, close } = useOverlay();
    const { setActiveFieldId } = useActiveFieldStore();

    const fields = useFieldsBySigner(signerId ?? '');
    const signer = useSignerStore(state => state.signers.find(s => s.id === signerId));
    const signContract = useSignContract();

    const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
    const [remainingFieldCount, setRemainingFieldCount] = useState(0);
    const [requiredFieldsCount, setRequiredFieldsCount] = useState(0);
    const [requiredAndNotNullFieldsCount, setRequiredAndNotNullFieldsCount] = useState(0);
    const [remainingRequiredAttachedFileCount, setRemainingRequiredAttachedFileCount] = useState(0);

    const handleNextField = useCallback(() => {
        setCurrentFieldIndex(prev => (prev >= fields.length - 1 ? 0 : prev + 1));
    }, [fields.length]);

    const handlePrevField = useCallback(() => {
        setCurrentFieldIndex(prev => (prev <= 0 ? fields.length - 1 : prev - 1));
    }, [fields.length]);

    useEffect(() => {
        if (fields?.length > 0) {
            const activeField = fields[currentFieldIndex];
            setActiveFieldId(activeField.id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentFieldIndex]);

    useEffect(() => {
        const requiredFields = fields.filter(field => field.required) as Field[];
        const count = requiredFields.length;
        setRequiredFieldsCount(count);

        const filledCount = requiredFields.filter(field => {
            if (field.type === 'sign') {
                return (field as SignField).signFileId || (field as SignField).imageId;
            }
            if (field.type === 'text') {
                return field.value !== null && field.value !== '';
            }
            if (field.type === 'checkbox') {
                return field.value === true;
            }
            if (field.type === 'radio') {
                return requiredFields.some(
                    otherField =>
                        otherField.type === 'radio' &&
                        otherField.inputName === field.inputName &&
                        otherField.value === true
                );
            }
            return false;
        }).length;

        setRequiredAndNotNullFieldsCount(filledCount);
        setRemainingFieldCount(count - filledCount);
    }, [fields]);

    useEffect(() => {
        if (signer?.attachedFiles) {
            const remainingCount = signer.attachedFiles.filter(
                field => field.required && !field.fileId
            ).length;
            setRemainingRequiredAttachedFileCount(remainingCount);
        }
    }, [signer?.attachedFiles]);

    function handleSubmitWithFileCheck() {
        if (remainingRequiredAttachedFileCount > 0) {
            openMissingFileAlert();
            return;
        }
        submitContract();
    }

    function openMissingFileAlert() {
        open(
            <Alert
                type="error"
                title="필수 첨부파일을 첨부해 주세요."
                onAction={openUploadDialog}
            />
        );
    }

    function openUploadDialog() {
        open(
            <UploadAttachedFileDialog
                contarctId={contractId}
                signerId={signerId}
                footer={
                    <div className="w-full flex items-center justify-end gap-3">
                        <Button
                            className="w-full"
                            onClick={() => {
                                close();
                                submitContract();
                            }}
                        >
                            다음
                        </Button>
                    </div>
                }
            />
        );
    }

    function submitContract() {
        open(
            <Confirm
                title="계약서 제출"
                description="해당 계약서를 제출하시겠습니까?"
                onAction={() => {
                    signContract.mutate(
                        { contractId, signer: { ...signer, fields: fields } as Signer },
                        {
                            onSuccess: () => {
                                navigate(`/contract/${contractId}`);
                            },
                        }
                    );
                }}
            />
        );
    }

    return (
        <div className="p-3">
            <div className="pb-3 text-center text-white text-sm">
                {remainingFieldCount !== 0
                    ? `완성해야 할 필수 입력란이 ${remainingFieldCount}개 남았습니다. (${requiredAndNotNullFieldsCount}/${requiredFieldsCount})`
                    : `필수 입력을 모두 완료했습니다. (${requiredAndNotNullFieldsCount}/${requiredFieldsCount})`}
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-1">
                <div className="flex w-full sm:w-auto items-center justify-between sm:justify-start gap-3">
                    <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 sm:flex-none"
                        onClick={handlePrevField}
                    >
                        <ChevronLeft className="size-4" />
                        <span className="hidden sm:inline">이전 항목</span>
                    </Button>
                    <Button
                        size="lg"
                        className="w-full sm:w-auto"
                        onClick={handleSubmitWithFileCheck}
                        disabled={remainingFieldCount !== 0}
                    >
                        서명 완료
                    </Button>
                    <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 sm:flex-none"
                        onClick={handleNextField}
                    >
                        <span className="hidden sm:inline">다음 항목</span>
                        <ChevronRight className="size-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export { ContractSignFooter };
