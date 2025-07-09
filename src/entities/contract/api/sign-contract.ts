import { Signer } from '@/entities/signer';
import { apiInstance } from '@/shared/api/axios-instance';

export const signContract = async ({
    contractId,
    signer,
}: {
    contractId: string;
    signer: Signer;
}) => {
    const response = await apiInstance.post(`/contract/sign/${contractId}`, signer);
    return response.data.data;
};
