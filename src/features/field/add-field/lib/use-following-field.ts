import { useCallback } from 'react';

import { FieldType } from '@/entities/field';
import { useFollowinguseFieldStore } from '@/entities/field';

export const useFollowingField = () => {
    const setFollowingField = useFollowinguseFieldStore(state => state.setFollowingField);

    const follow = useCallback(
        ({
            type,
            signerId,
            e,
        }: {
            type: FieldType;
            signerId: string;
            e: React.MouseEvent<HTMLDivElement>;
        }) => {
            setFollowingField(type, signerId);
        },
        [setFollowingField]
    );

    return follow;
};
