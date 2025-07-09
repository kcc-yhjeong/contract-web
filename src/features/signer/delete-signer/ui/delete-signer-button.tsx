import { memo } from 'react';

import { Trash2 } from 'lucide-react';

import { useSignerStore } from '@/entities/signer';
import { useOverlay } from '@/shared/lib';
import { Confirm } from '@/shared/ui';

function DeleteSignerButton({ signerId }: { signerId: string }) {
    const deleteSigner = useSignerStore(state => state.deleteSigner);
    const { open } = useOverlay();
    return (
        <Trash2
            className="cursor-pointer"
            size={20}
            onClick={() => {
                open(
                    <Confirm
                        title="서명자 삭제"
                        description="해당 서명자의 모든 입력 항목이 같이 삭제됩니다."
                        onAction={() => {
                            deleteSigner(signerId);
                        }}
                    />
                );
            }}
        />
    );
}

export default memo(DeleteSignerButton);
