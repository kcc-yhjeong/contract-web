import { Template } from '@/entities/template/model/types';
import { apiInstance } from '@/shared/api/axios-instance';

export const updateTemplate = async (template: Template, file?: File) => {
    const formData = new FormData();
    formData.append('template', new Blob([JSON.stringify(template)], { type: 'application/json' }));

    if (file) {
        formData.append('file', file);
    }

    const response = await apiInstance.put('/template', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data.data;
};
