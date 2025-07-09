import { apiInstance } from '@/shared/api/axios-instance';

export const getTemplateList = async ({ page, name }: { page?: number; name?: string } = {}) => {
    const response = await apiInstance.get('/template', {
        params: {
            ...(page !== undefined && { page }),
            ...(name !== undefined && { name }),
        },
    });
    return response.data.data;
};
