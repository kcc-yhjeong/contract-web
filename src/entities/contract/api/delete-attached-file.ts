import { apiInstance } from '@/shared/api/axios-instance';

export const deleteAttachedFile = async ({
    contractId,
    signerId,
    fileId,
}: {
    contractId: string;
    signerId: string;
    fileId: string;
}) => {
    const response = await apiInstance.delete(
        `/contract/attached-file/${contractId}/${signerId}/${fileId}`
    );
    return response.data.data;
};
