import { Paperclip } from 'lucide-react';

import { FIELD_TYPE } from '@/entities/field';
import { useSignerStore } from '@/entities/signer';
import { useTemplateStore } from '@/entities/template';
import { useFollowingField } from '@/features/field/add-field';
import { FieldAccordion } from '@/features/field/get-field';
import { useActiveFieldStore } from '@/features/field/rnd-field';
import { RequestAttachedFileDialog } from '@/features/signer/attached-file';
import { DeleteSignerButton } from '@/features/signer/delete-signer';
import { SignerInfoCard } from '@/features/signer/get-signer';
import { useOverlay } from '@/shared/lib';
import { Button, Input } from '@/shared/ui';
export function TemplateSidebar() {
    const { open } = useOverlay();

    const template = useTemplateStore(state => state.template);
    const signers = useSignerStore(state => state.signers);

    const setTemplate = useTemplateStore(state => state.setTemplate);
    const addSigner = useSignerStore(state => state.addSigner);
    const follow = useFollowingField();

    const setActiveFieldId = useActiveFieldStore(state => state.setActiveFieldId);
    const handleFieldClick = ({
        fieldId,
    }: {
        fieldId: string;
        e: React.MouseEvent<HTMLDivElement>;
    }) => {
        setActiveFieldId(fieldId);
    };

    return (
        <>
            <div className="rounded-lg border bg-white p-4 shadow-md w-[100%]">
                <div className="flex items-center justify-between border-b pb-1 mb-2">
                    <span className="font-medium">템플릿 정보</span>
                </div>
                <Input
                    type="text"
                    maxLength={50}
                    value={template?.name ?? ''}
                    onChange={e => setTemplate(prev => ({ ...prev, name: e.target.value }))}
                />
            </div>
            <div className="flex flex-col gap-2">
                {signers.map((signer, index) => (
                    <SignerInfoCard
                        signerId={signer.id}
                        key={signer.id}
                        index={index + 1}
                        action={<DeleteSignerButton signerId={signer.id} />}
                    >
                        {Object.values(FIELD_TYPE).map(type => (
                            <FieldAccordion
                                key={type}
                                signerId={signer.id}
                                type={type}
                                onHeaderClick={follow}
                                onFieldClick={handleFieldClick}
                            />
                        ))}
                        <div
                            className="rounded border bg-white"
                            onClick={() => open(<RequestAttachedFileDialog signerId={signer.id} />)}
                        >
                            <div
                                className={
                                    'flex items-center pl-3  cursor-pointer select-none justify-between'
                                }
                            >
                                <div className="flex items-center py-2 h-[42px]">
                                    <button className="mr-2" type="button">
                                        <Paperclip size={20} />
                                    </button>
                                    <span className="flex-1 text-sm">첨부파일 요청</span>
                                </div>
                            </div>
                        </div>
                    </SignerInfoCard>
                ))}
                {signers.length < 10 && <Button onClick={addSigner}>+</Button>}
            </div>
        </>
    );
}
