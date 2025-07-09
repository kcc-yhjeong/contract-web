import { apiInstance } from '@/shared/api/axios-instance';

export const getTemplate = async (id: string) => {
    const response = await apiInstance.get(`/template/${id}`);
    return response.data.data;
};
