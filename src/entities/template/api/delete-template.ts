import { apiInstance } from '@/shared/api/axios-instance';

export const trashTemplate = async (id: string) => {
    const response = await apiInstance.patch(`/template/trash/${id}`);
    return response.data.data;
};
