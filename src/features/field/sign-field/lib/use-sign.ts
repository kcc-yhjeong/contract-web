import { v4 as uuidv4 } from 'uuid';

import { useFieldStore, useIsImageUsedInSignFields } from '@/entities/field';
import { useSignerStore } from '@/entities/signer';

export const useSign = ({
    signerId,
    fieldId,
    signFileId,
}: {
    signerId: string;
    fieldId: string;
    signFileId: string;
}) => {
    const setSignField = useFieldStore(state => state.setSignField);
    const addSignerImage = useSignerStore(state => state.addSignerImage);
    const deleteSignerImage = useSignerStore(state => state.deleteSignerImage);
    const isImageUsedInSignFields = useIsImageUsedInSignFields({
        fieldId,
        imageId: signFileId,
    });
    const addImage = (data: string) => {
        const imageId = uuidv4();

        addSignerImage({
            signerId,
            imageId,
            data,
        });

        return imageId;
    };

    //서명
    const sign = (data: string) => {
        //1. 참조 객체에 이미지 저장
        const imageId = addImage(data);

        //2. 필드에 이미지 저장
        setSignField({ fieldId, imageId });

        //3. 참조 객체 이미지 삭제
        if (!isImageUsedInSignFields) {
            deleteSignerImage({ signerId, imageId: signFileId });
        }
    };

    //일괄서명
    const bulkSign = (data: string) => {
        //1. 참조 객체에 이미지 저장
        const imageId = addImage(data);

        //2. 모든 필드에 이미지 저장
        setSignField({ signerId, imageId });

        //3. 참조 객체 이미지 삭제
        deleteSignerImage({ signerId, ignoreImageId: imageId });
    };

    return { sign, bulkSign };
};
