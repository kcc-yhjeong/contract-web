import { apiInstance } from '@/shared/api/axios-instance';

export const addAttachedFile = async ({
    contractId,
    signerId,
    fileId,
    file,
}: {
    contractId: string;
    signerId: string;
    fileId: string;
    file: File;
}) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiInstance.post(
        `/contract/attached-file/${contractId}/${signerId}/${fileId}`,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
    );
    return response.data.data;
};
