import { apiInstance } from '@/shared/api/axios-instance';

export const getContract = async (id: string) => {
    const response = await apiInstance.get(`/contract/${id}`);
    return response.data.data;
};
