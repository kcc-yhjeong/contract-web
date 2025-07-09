import { v4 as uuidv4 } from 'uuid';

import { Template } from '@/entities/template/model/types';
import { apiInstance } from '@/shared/api/axios-instance';

export const createTemplate = async (template: Template, file: File) => {
    const templateWithDefaultSigner = {
        ...template,
        signer:
            !template?.signer || template?.signer?.length === 0
                ? [{ id: uuidv4(), order: 1, fields: [] }]
                : template.signer,
    };

    const formData = new FormData();
    formData.append(
        'template',
        new Blob([JSON.stringify(templateWithDefaultSigner)], { type: 'application/json' })
    );
    formData.append('file', file);

    const response = await apiInstance.post('/template', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data.data;
};
