import { baseInstance } from '@/shared/api/axios-instance';

export const getFile = async (id: string) => {
    const response = await baseInstance.get(`/file/${id}`, { responseType: 'blob' });
    return response.data;
};

export const getFileBase64 = async (id: string): Promise<string> => {
    const response = await baseInstance.get(`/file/${id}`, { responseType: 'arraybuffer' });
    const buffer = response.data;
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return `data:image/png;base64,${btoa(binary)}`;
};
